'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Product', 'liveId', { type: Sequelize.STRING, allowNull: true });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Product', 'liveId');
  }
};
