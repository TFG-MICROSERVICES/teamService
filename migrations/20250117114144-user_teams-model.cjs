'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserTeams', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            user_email: {
                type: Sequelize.STRING,
                max: 255,
                primaryKey: true,
            },
            team_id: {
                type: Sequelize.STRING,
                primaryKey: true,
                references: {
                    model: 'Teams',
                    key: 'team_id',
                },
                onDelete: 'CASCADE',
            },
            status: {
                type: Sequelize.ENUM('0', '1'),
                allowNull: false,
                defaultValue: '1',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('UserTeams');
    },
};
