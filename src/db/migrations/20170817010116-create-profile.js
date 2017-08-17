'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      queryInterface.createTable('profiles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        fullName: {
          allowNull: false,
          type: Sequelize.STRING
        },
        phoneNumber: {
          type: Sequelize.STRING
        },
        fullAddress: {
          type: Sequelize.STRING
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }).then(() => {
        queryInterface.addIndex('profiles', ['userId'], {
          indexName: 'by_user',
          indicesType: 'INDEX'
        })

        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('profiles')
  }
}
