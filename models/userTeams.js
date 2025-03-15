import { DataTypes } from 'sequelize';
import database from '../db/database.js';

export const UserTeams = database.define(
    'user_team',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        user_email: {
            type: DataTypes.STRING,
            max: 255,
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
        status: {
            type: DataTypes.ENUM('0', '1'),
            allowNull: false,
            defaultValue: '1',
        },
        is_captain: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: 'UserTeams',
        indexes: [
            {
                unique: true,
                fields: ['user_email', 'team_id', 'sport_id'],
            },
        ],
    }
);
