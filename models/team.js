import { DataTypes } from 'sequelize';
import database from '../db/database.js';
import { UserTeams } from './userTeams.js';
export const Team = database.define(
    'team',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sport_id: {
            type: DataTypes.STRING,
            max: 255,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            max: 255,
            allowNull: false,
            unique: true,
        },
        public: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: 'Teams',
    }
);

Team.hasMany(UserTeams, { foreignKey: 'team_id', sourceKey: 'id' });
UserTeams.belongsTo(Team, { foreignKey: 'team_id', targetKey: 'id' });
