import { createTeam, getTeams, getTeamById, updateTeam, deleteTeam } from '../db/services/teamServices.js';
import { teamSchema, updateSchema } from '../schemas/teamSchema.js';
import { generateError } from '../utils/generateError.js';

export const createTeamController = async (req, res, next) => {
    try {
        const validate = await teamSchema.validateAsync(req.body, {
            stripUnknown: true,
        });

        const team = await createTeam(validate);

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
        const { search } = req.query;
        const teams = await getTeams(search);

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

        console.log('team_id', team_id);

        await deleteTeam(team_id);

        res.status(200).json({
            message: 'Equipo eliminado correctamente',
        });
    } catch (error) {
        next(error);
    }
};
