'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('UserLogin', {
      name: {
        type: Sequelize.STRING(50),
        primaryKey: true,
      },

      key: {
        type: Sequelize.STRING(100),
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID,
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('UserLogin');
  }
};
