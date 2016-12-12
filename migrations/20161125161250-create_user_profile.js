'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('UserProfile', {
      userId: {
        type: Sequelize.UUID,
        primaryKey: true,
      },

      displayName: {
        type: Sequelize.STRING(100),
      },

      picture: {
        type: Sequelize.STRING(255),
      },

      gender: {
        type: Sequelize.STRING(50),
      },

      location: {
        type: Sequelize.STRING(100),
      },

      website: {
        type: Sequelize.STRING(255),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('UserProfile');
  }
};
