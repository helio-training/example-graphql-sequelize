'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      queryInterface.createTable('users', {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        createdAt: Sequelize.DATE,
        email: {
          allowNull: false,
          type: Sequelize.STRING
        },
        hashedPassword: {
          allowNull: false,
          type: Sequelize.STRING
        },
        updatedAt: Sequelize.DATE
      }).then(() => {
        queryInterface.addIndex('users', ['email'], {
          indexName: 'by_email',
          indicesType: 'UNIQUE'
        })

        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      queryInterface.dropTable('users')
      resolve()
    })
  }
}
