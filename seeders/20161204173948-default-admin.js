'use strict';

var passwordHash = require('password-hash');
var moment = require('moment');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var date = moment().format('YYYY-MM-DD HH:mm:ss');

    queryInterface.bulkDelete('Admin', [{ username: process.env.SEED_ADMIN_USERNAME }]);

    return queryInterface.bulkInsert('Admin', [{ username: process.env.SEED_ADMIN_USERNAME, password: passwordHash.generate(process.env.SEED_ADMIN_PASSWORD), createdAt: date, updatedAt: date }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.destroy({ where: { username: process.env.SEED_ADMIN_USERNAME } });
  }
};
