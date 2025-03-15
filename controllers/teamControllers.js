import { createTeam, getTeams, getTeamById, updateTeam, deleteTeam } from '../db/services/teamServices.js';
import { createUserTeam } from '../db/services/userTeamsServices.js';
import { teamSchema, updateSchema } from '../schemas/teamSchema.js';
import { getRequestTeamById } from '../db/services/requestsTeamServices.js';
import { updateStatusByUserAndTeam } from '../db/services/requestsTeamServices.js';
import { updateUserTeamsSchema } from '../schemas/userTeamSchema.js';
import { generateError } from '../utils/generateError.js';

export const createTeamController = async (req, res, next) => {
    try {
        const { user } = req.body;
        const validate = await teamSchema.validateAsync(req.body, {
            stripUnknown: true,
        });

        const team = await createTeam(validate);

        const getTeam = await getTeamById(team.id);

        await createUserTeam({
            user_email: user.email,
            team_id: getTeam.id,
            sport_id: getTeam.sport_id,
            is_captain: true,
        });

        res.status(201).json({
            message: 'Equipo creado correctamente',
            team,
        });
    } catch (error) {
        next(error);
    }
};

export const getTeamsController = async (req, res, next) => {
    try {
        const { search, sport_id } = req.query;
        const teams = await getTeams(search, sport_id);

        res.status(200).json({
            message: 'Equipos encontrados',
            data: {
                count: teams.length,
                teams,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getTeamByIdController = async (req, res, next) => {
    try {
        const { team_id } = req.params;

        if (!team_id) generateError('El ID del equipo es necesario');

        const team = await getTeamById(team_id);

        res.status(200).json({
            message: 'Equipo encontrado',
            team,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTeamController = async (req, res, next) => {
    try {
        const { team_id } = req.params;

        if (!team_id) generateError('El ID del equipo es necesario para actualizar');

        const validate = await updateSchema.validateAsync(req.body, {
            stripUnknown: true,
        });

        const team = await updateTeam(team_id, validate);

        if (validate.public) {
            const request = await getRequestTeamById(team_id);

            if (request) {
                request.map(async (request) => {
                    const validate = await updateUserTeamsSchema.validateAsync(
                        { status: '1' },
                        {
                            stripUnknown: true,
                        }
                    );
                    await updateStatusByUserAndTeam(request.dataValues.user_email, team_id, validate);
                    await createUserTeam({
                        user_email: request.dataValues.user_email,
                        team_id: team_id,
                        sport_id: team.sport_id,
                    });
                });
            }
        }

        res.status(200).json({
            message: 'Equipo actualizado correctamente',
            team,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTeamController = async (req, res, next) => {
    try {
        const { team_id } = req.params;

        await deleteTeam(team_id);

        res.status(200).json({
            message: 'Equipo eliminado correctamente',
        });
    } catch (error) {
        next(error);
    }
};
