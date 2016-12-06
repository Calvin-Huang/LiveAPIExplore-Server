'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('UserProfile', 'phone', { type: Sequelize.STRING, allowNull: true });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('UserProfile', 'phone');
  }
};
