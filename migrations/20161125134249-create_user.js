'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('User', {

      id: {
        allowNull: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },

      email: {
        type: Sequelize.STRING(255),
      },

      emailConfirmed: {
        type: Sequelize.BOOLEAN,
      },

    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('User');
  }
};
