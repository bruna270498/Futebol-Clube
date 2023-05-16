'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'username',
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'role',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'email',
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'password',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
