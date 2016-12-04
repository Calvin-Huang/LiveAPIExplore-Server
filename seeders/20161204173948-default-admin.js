'use strict';

var passwordHash = require('password-hash');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.create('Admin', { username: process.env.SEED_ADMIN_USERNAME, passwordHash.generate(process.env.SEED_ADMIN_PASSWORD) });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.destroy({ where: { username: process.env.SEED_ADMIN_USERNAME } });
  }
};
