'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'team_name',
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('teams');
  }
};
