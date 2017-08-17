import Profile from '../db/models/profile'
import User from '../db/models/user'
import logger from '../logger'

export default {
  Query: {
    async allProfiles (_doc, _args, _context, _info) {
      try {
        const profiles = await Profile.findAll()
        return (profiles) ? profiles.map((profile) => profile.get({ plain: true })) : []
      } catch (err) {
        logger.error(err)
        throw err
      }
    },

    async Profile (_doc, args, _context, _info) {
      try {
        // Sequelize has a couple helper methods for finding records
        // .findById just takes one argument - the id of the record
        // .find allows you to specify other fields of a user that you want to lookup by
        const profile = await Profile.findById(args.id)
        return (profile) ? profile.get({ plain: true }) : null
      } catch (err) {
        logger.error(err)
        throw err
      }
    }
  },

  Mutation: {
    async createProfile (_doc, args, _context, _info) {
      try {
        const profile = await Profile.create(args)
        return (profile) ? profile.get({ plain: true }) : null
      } catch (err) {
        logger.error(err)
        throw err
      }
    }
  },

  Profile: {
    async user (profile) {
      try {
        let user = await User.findById(profile.userId)
        return (user) ? user.get({ plain: true }) : null
      } catch (err) {
        logger.error(err)
        throw err
      }
    }
  }
}
