'use strict';

var passwordHash = require('password-hash');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Admins', [{ username: process.env.SEED_ADMIN_USERNAME, password: passwordHash.generate(process.env.SEED_ADMIN_PASSWORD), createdAt: Date(), updatedAt: Date() }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.destroy({ where: { username: process.env.SEED_ADMIN_USERNAME } });
  }
};
