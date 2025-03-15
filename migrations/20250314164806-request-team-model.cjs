'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.createTable('RequestTeams', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            team_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Teams',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            user_email: {
                type: Sequelize.STRING,
                max: 255,
                primaryKey: true,
            },
            sport_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('0', '1'),
                allowNull: false,
                defaultValue: '0',
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        queryInterface.dropTable('RequestTeams');
    },
};
