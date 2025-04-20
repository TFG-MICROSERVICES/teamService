import { Team } from '../../models/team.js';
import { UserTeams } from '../../models/userTeams.js';
import { generateError } from '../../utils/generateError.js';

export const createUserTeam = async (data) => {
    try {
        const userTeam = await UserTeams.create(data);

        if (!userTeam) generateError('Error al unirte a este equipo', 500);

        const newUserTeam = await getUserTeamById(userTeam.id);

        return newUserTeam;
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            generateError('Ya tienes un equipo en este deporte', 400);
        } else {
            throw error;
        }
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

        return user;
    } catch (error) {
        console.log(error);
        generateError(error.message, error.status);
    }
};

export const getTeamByUserService = async (userEmail, sport_id) => {
    try {
        let team = null;
        if (!sport_id) {
            team = await UserTeams.findOne({
                include: { model: Team, where: { sport_id: sport_id } },
                where: {
                    user_email: userEmail,
                },
            });
        } else {
            team = await UserTeams.findOne({
                include: { model: Team, where: { sport_id: sport_id } },
                where: {
                    user_email: userEmail,
                },
            });
        }

        let data = null;
        if (team) {
            data = await team.toJSON();
        }

        return data;
    } catch (error) {
        throw error;
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
        const { status } = data;
        console.log('userEmail', userEmail);
        console.log('teamId', teamId);
        console.log('data', data);
        const getUserTeam = await UserTeams.findOne({
            where: {
                user_email: userEmail,
            },
        });

        console.log('getUserTeam', getUserTeam);

        const userTeam = await UserTeams.update(
            { status },
            {
                where: {
                    team_id: teamId,
                    user_email: userEmail,
                },
                logging: console.log,
            }
        );

        const user = await getUserByEmail(userEmail, teamId);

        return user;
    } catch (error) {
        generateError(error.message, error.status);
    }
};
