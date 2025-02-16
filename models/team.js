import { DataTypes } from "sequelize";
import database from "../db/database.js";

export const Team = database.define(
  "team",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    team_id: {
      type: DataTypes.STRING,
      max: 255,
      unique: true,
      allowNull: false,
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
    tableName: "Teams",
  }
);
