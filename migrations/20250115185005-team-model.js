'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Teams',{
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      team_id:{
        type: Sequelize.STRING,
        max: 255,
        unique: true,
        allowNull: false
      },
      name:{
        type: Sequelize.STRING,
        max: 255,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Teams');
  }
};
