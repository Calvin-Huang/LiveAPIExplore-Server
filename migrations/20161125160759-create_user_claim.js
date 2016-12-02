'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('UserClaim', {

      type: {
        type: Sequelize.STRING,
      },

      value: {
        type: Sequelize.STRING,
      },

    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('UserClaim');
  }
};
