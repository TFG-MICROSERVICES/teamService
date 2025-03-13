import { DataTypes } from 'sequelize';
import database from '../db/database.js';

export const UserTeams = database.define(
    'user_team',
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
