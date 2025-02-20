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
            unique: true,
            allowNull: false,
            primaryKey: true,
        },
        team_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Teams',
                key: 'team_id',
            },
            onDelete: 'CASCADE',
        },
        status: {
            type: DataTypes.ENUM('0', '1', '2'),
            allowNull: false,
            defaultValue: '1',
        },
    },
    {
        tableName: 'UserTeams',
    }
);
