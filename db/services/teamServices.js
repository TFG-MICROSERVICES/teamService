import { Team } from '../../models/team.js';
import { UserTeams } from '../../models/userTeams.js';
import { RequestTeams } from '../../models/requestTeams.js';
import { generateError } from '../../utils/generateError.js';
import { Op } from 'sequelize';

export const createTeam = async (data) => {
    try {
        const existTeam = await getTeamByName(data.name);

        if (existTeam) generateError('Este nombre de equipo ya existe');

        const team = await Team.create(data);

        if (!team) generateError('Error al crear el equipo', 500);

        const newTeam = await getTeamById(team.id);

        return newTeam;
    } catch (error) {
        generateError(error.message, error.status);
    }
};

export const getTeams = async (search, sport_id) => {
    try {
        const teams = await Team.findAll({
            include: [
                {
                    model: UserTeams,
                    attributes: ['user_email', 'status', 'id', 'is_captain'],
                },
                {
                    model: RequestTeams,
                    attributes: ['user_email', 'status', 'id', 'description'],
                    where: {
                        status: '0',
                    },
                    order: [['createdAt', 'DESC']],
                    required: false,
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: {
                ...((search || sport_id) && {
                    [Op.and]: [
                        ...(sport_id ? [{ sport_id }] : []),
                        ...(search
                            ? [
                                  {
                                      name: {
                                          [Op.iLike]: `%${search}%`,
                                      },
                                  },
                              ]
                            : []),
                    ],
                }),
            },
            order: [['createdAt', 'DESC']],
        });

        return teams;
    } catch (error) {
        generateError(error.message, error.status);
    }
};

export const getTeamById = async (teamId) => {
    try {
        const team = await Team.findByPk(teamId, {
            include: [
                {
                    model: UserTeams,
                    attributes: ['user_email', 'status', 'id', 'is_captain'],
                    where: {
                        status: '1',
                    },
                    order: [['createdAt', 'DESC']],
                    required: false,
                },
                {
                    model: RequestTeams,
                    attributes: ['user_email', 'status', 'id', 'description'],
                    where: {
                        status: '0',
                    },
                    order: [['createdAt', 'DESC']],
                    required: false,
                },
            ],
        });

        if (!team) generateError('Team with this id,it doent exist', 404);

        return team;
    } catch (error) {
        console.log('error', error);
        throw error;
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
        console.log('error', error);
        throw error;
    }
};

export const getTeamByArrayService = async (teams) => {
    try {
        const teamsInfo = await Team.findAll({
            where: {
                id: {
                    [Op.in]: teams,
                },
            },
            include: [
                {
                    model: UserTeams,
                    attributes: ['user_email', 'status', 'id', 'is_captain'],
                    where: {
                        status: '1',
                    },
                    order: [['createdAt', 'DESC']],
                    required: false,
                },
            ],
        });

        return teamsInfo;
    } catch (error) {
        throw error;
    }
};

export const updateTeam = async (teamId, data) => {
    try {
        const teamExists = await getTeamById(teamId);

        if (!teamExists) generateError('El equipo no existe', 404);

        const team = await Team.update(data, {
            where: {
                id: teamId,
            },
        });

        if (!team) generateError('El equipo no se puede actualizar', 500);

        const teamUpdate = await getTeamById(teamId);

        return teamUpdate;
    } catch (error) {
        console.log('error', error);
        generateError(error.message, error.status);
    }
};

export const deleteTeam = async (teamId) => {
    try {
        const teamExists = await getTeamById(teamId);

        if (!teamExists) generateError('El equipo no se puede eliminar porque no existe', 404);

        const team = await Team.destroy({
            where: {
                id: teamId,
            },
        });

        if (!team) generateError('El equipo no se puede eliminar', 500);

        return team;
    } catch (error) {
        console.log('dentro', error);
        throw error;
    }
};
