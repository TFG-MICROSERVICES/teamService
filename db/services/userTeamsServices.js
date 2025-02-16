import { UserTeams } from "../../models/userTeams.js";
import { generateError } from "../../utils/generateError.js";

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

export const getUserTeamById = async (teamId) => {
  try {
    const userTeam = await UserTeams.findOne({
      where: {
        team_id: teamId,
      },
    });

    return userTeam;
  } catch (error) {
    generateError(error.message, error.status);
  }
};

export const getUserByEmail = async (userEmail, teamId) => {
  try {
    const user = await UserTeams.findOne({
      where: {
        user_email: userEmail,
        team_id: teamId,
      },
    });

    if (!user) generateError("User not found for this team");

    return user;
  } catch (error) {
    console.log(error);
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

export const updateStatusByUserAndTeam = async (userEmail, teamId, data) => {
  try {
    console.log(userEmail);
    const { status } = data;
    const newStatus = await UserTeams.update(
      { status },
      {
        where: {
          team_id: teamId,
          user_email: userEmail,
        },
      }
    );

    const user = await getUserByEmail(userEmail, teamId);

    return user;
  } catch (error) {
    generateError(error.message, error.status);
  }
};
