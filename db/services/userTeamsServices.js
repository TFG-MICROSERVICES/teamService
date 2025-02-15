import { UserTeams } from "../../models/userTeams";
import { generateError } from "../../utils/generateError";

export const createUserTeam = async (data) => {
  try {
    const userTeam = await UserTeams.create(data);

    if (!userTeam) generateError("Error to add a new user for this team", 500);

    const newUserTeam = await getUserTeamById(userTeam.id);

    return newUserTeam;
  } catch (error) {
    generateError(error.message, error.status);
  }
};

export const getAllUserTeams = async () => {
  try {
    const userTeams = await UserTeams.findAll();

    return userTeams;
  } catch (error) {
    generateError(error.message, error.status);
  }
};

export const getUserTeamById = async (id) => {
  try {
    const userTeam = await UserTeams.findOne({
      where: {
        id: id,
      },
    });

    return userTeam;
  } catch (error) {
    generateError(error.message, error.status);
  }
};

export const getUsersByTeamId = async (teamId) => {
  try {
    const users = await UserTeams.findOne({
      where: {
        team_id: teamId,
      },
    });

    return users;
  } catch (error) {
    generateError(error.message, error.status);
  }
};

export const updateStatusByUserAndTeam = async (userEmail, teamId, status) => {
  try {
    const newStatus = await UserTeams.update(
      { status },
      {
        where: {
          team_id: teamId,
          user_email: userEmail,
        },
      }
    );

    return newStatus;
  } catch (error) {
    generateError(error.message, error.status);
  }
};
