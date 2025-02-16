import { Team } from "../../models/team.js";
import { generateError } from "../../utils/generateError.js";

export const createTeam = async (data) => {
  try {
    const existTeam = await getTeamByName(data.name);

    if (existTeam) generateError("This teams name just already exists");

    const lastTeam = await Team.findOne({
      order: [["team_id", "DESC"]],
    });

    data.team_id = lastTeam
      ? `t-${parseInt(lastTeam.team_id.split("-")[1]) + 1}`
      : "t-1";

    const team = await Team.create(data);

    if (!team) generateError("Error creating new team", 500);

    const newTeam = await getTeamById(team.team_id);

    return newTeam;
  } catch (error) {
    generateError(error.message, error.status);
  }
};

export const getTeams = async () => {
  try {
    const teams = await Team.findAll();

    return teams;
  } catch (error) {
    generateError(error.message, error.status);
  }
};

export const getTeamById = async (teamId) => {
  try {
    const team = await Team.findOne({
      where: {
        team_id: teamId,
      },
    });

    if (!team) generateError("Team with this id,it doent exist", 404);

    return team;
  } catch (error) {
    console.log("error mas dentro", error);
    generateError(error.message, error.status);
  }
};

export const getTeamByName = async (teamName) => {
  try {
    const team = await Team.findOne({
      where: {
        name: teamName,
      },
    });

    return team ? team : null;
  } catch (error) {
    generateError(error.message, error.status);
  }
};

export const updateTeam = async (teamId, data) => {
  try {
    const teamExists = await getTeamById(teamId);

    if (!teamExists) generateError("Team with this id,it doent exist", 404);

    const team = await Team.update(data, {
      where: {
        team_id: teamId,
      },
    });

    if (!team) generateError("Team cannot be updated", 500);

    const teamUpdate = await getTeamById(teamId);

    return teamUpdate;
  } catch (error) {
    generateError(error.message, error.status);
  }
};

export const deleteTeam = async (teamId) => {
  try {
    const teamExists = await getTeamById(teamId);

    if (!teamExists) generateError("Team with this id doesn't exist", 404);

    const team = await Team.destroy({
      where: {
        team_id: teamId,
      },
    });

    console.log("ELIMINADO", team);

    if (!team) generateError("Team cannot be deleted", 500);

    return team;
  } catch (error) {
    console.log("dentro", error);
    generateError(error.message, error.status);
  }
};
