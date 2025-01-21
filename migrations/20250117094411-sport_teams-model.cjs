'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('SportTeams', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      sport_id: {
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
    await queryInterface.dropTable('SportTeams');
  }
};
