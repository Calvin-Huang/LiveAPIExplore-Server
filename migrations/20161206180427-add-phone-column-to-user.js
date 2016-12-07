'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserProfile', 'phone', { type: Sequelize.STRING, allowNull: true });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('UserProfile', 'phone');
  }
};
