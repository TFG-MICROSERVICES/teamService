import { SportTeams } from "../../models/sportTeams";
import { generateError } from "../../utils/generateError";

export const createSportTeams = async (data) => {
  try {
    console.log(data);
    const sportTeam = await SportTeams.create(data);

    console.log(sportTeam);

    if (!sportTeam) generateError("Error creating new sport_teams", 500);

    const newSportTeam = await getSportByTeamId(sportTeam.id);

    return newSportTeam;
  } catch (error) {
    console.log(error);
    generateError(error.message, error.status);
  }
};

export const getSportsTeams = async () => {
  try {
    const sportTeams = await SportTeams.findAll();

    return sportTeams;
  } catch (error) {
    console.log(error);
    generateError(error.message, error.status);
  }
};

export const getTeamsBySportId = async (sportId) => {
  try {
    const sportTeams = await SportTeams.find({
      where: {
        sport_id: sportId,
      },
    });

    if (!sportTeams) generateError("Sport dont exists to this sport", 404);

    return sportTeams;
  } catch (error) {
    console.log(error);
    generateError(error.message, error.status);
  }
};

export const getSportByTeamId = async (teamId) => {
  try {
    const sportTeams = await SportTeams.find({
      where: {
        team_id: teamId,
      },
    });

    if (!sportTeams) generateError("Sport dont exists to this team", 404);

    return sportTeams;
  } catch (error) {
    console.log(error);
    generateError(error.message, error.status);
  }
};

export const deleteTeam = async (teamId) => {
  try {
    const deleteTeam = await SportTeams.drop({
      where: {
        team_id: teamId,
      },
    });

    if (!deleteTeam)
      generateError("Team could not be deleted from this sport", 500);

    return deleteTeam;
  } catch (error) {
    console.log(error);
    generateError(error.message, error.status);
  }
};
