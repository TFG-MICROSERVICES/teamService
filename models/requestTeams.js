import { DataTypes } from 'sequelize';
import database from '../db/database.js';

export const RequestTeams = database.define(
    'request_team',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        team_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Teams',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        sport_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('0', '1', '2'),
            allowNull: false,
            defaultValue: '0',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'RequestTeams',
    }
);
