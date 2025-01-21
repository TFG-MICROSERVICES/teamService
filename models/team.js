import { DataTypes } from 'sequelize';
import database from '../db/database.js';

export const Team = database.define('team', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    team_id:{
        type: DataTypes.STRING,
        max: 255,
        unique: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        max: 255,
        allowNull: false,
        unique: true
    },
},{
    tableName: 'Teams'
});
