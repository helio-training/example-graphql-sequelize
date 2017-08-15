// We're in standard node land in these files since they run through
// sequelize-cli. We need to make sure we play by those rules and not
// babels
'use strict'

const hash = require('password-hash')

module.exports = {
  up: function (queryInterface, Sequelize) {
    const hashedPassword = hash.generate('ab123', {
      algorithm: 'sha224',
      iterations: 10
    })

    return queryInterface.bulkInsert('users', [
      {
        email: 'test@test.com',
        createdAt: new Date(),
        hashedPassword,
        updatedAt: new Date()
      },

      {
        email: 'another.test@test.com',
        createdAt: new Date(),
        hashedPassword,
        updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
}
