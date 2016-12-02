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

    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('UserLogin');
  }
};
