'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserTeams', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      user_email: {
        type: Sequelize.STRING,
        max: 255,
        allowNull: false,
        primaryKey: true,
      },
      team_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Teams',
          key: 'team_id'
        },
        onDelete: 'CASCADE',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserTeams');
  }
};
