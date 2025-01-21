import { DataTypes } from 'sequelize';
import database from '../db/database.js';

export const SportTeams = database.define('sport_team', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    sport_id: {
        type: DataTypes.STRING,
        max: 255,
        allowNull: false,
        primaryKey: true,
    },
    team_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Teams',
            key: 'team_id'
        },
        onDelete: 'CASCADE',
    },
},{
    tableName: 'SportTeams'
});