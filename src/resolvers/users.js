import User from '../db/models/user'
import Profile from '../db/models/profile'
import logger from '../logger'

/*
  The biggest thing to remember when utilizing sequelize is to get the PLAIN js object out
  of the fancy model class wrapper. This way graphql knows what to do with it.
 */

export default {
  Query: {
    async allUsers (_doc, _args, _context, _info) {
      try {
        const users = await User.findAll()
        return (users) ? users.map((user) => user.get({ plain: true })) : []
      } catch (err) {
        logger.error(err)
        throw err
      }
    },

    async User (_doc, args, _context, _info) {
      try {
        // Sequelize has a couple helper methods for finding records
        // .findById just takes one argument - the id of the record
        // .find allows you to specify other fields of a user that you want to lookup by
        const user = await User.findById(args.id)
        return (user) ? user.get({ plain: true }) : null
      } catch (err) {
        logger.error(err)
        throw err
      }
    }
  },

  Mutation: {
    createUser: async (_doc, args, _context, _info) => {
      try {
        const user = await User.create({
          email: args.user.email,
          password: args.user.password
        })

        return (user) ? user.get({ plain: true }) : null
      } catch (err) {
        logger.error(err)
        throw err
      }
    },

    async updateUser (_doc, args, _context, _info) {
      try {
        let user = await User.findById(args.id)
        user = await user.update(args)

        return (user) ? user.get({ plain: true }) : null
      } catch (err) {
        logger.error(err)
        throw err
      }
    }
  },

  User: {
    async profile (user) {
      try {
        let profile = await Profile.findOne({ where: { userId: user.id } })
        return (profile) ? profile.get({ plain: true }) : null
      } catch (err) {
        logger.error(err)
        throw err
      }
    }
  }
}
