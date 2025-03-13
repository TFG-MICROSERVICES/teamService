import { createUserTeam, updateStatusByUserAndTeam, getAllUserTeams, getUsersByTeamId, getUserTeamById } from '../db/services/userTeamsServices.js';
import { updateUserTeamsSchema, userTeamsSchema } from '../schemas/userTeamSchema.js';

export const createUserTeamController = async (req, res, next) => {
    try {
        const validate = await userTeamsSchema.validateAsync(req.body, {
            stripUnknown: true,
        });

        const newUserTeam = await createUserTeam(validate);

        res.status(201).json({
            status: 201,
            message: 'Usuario añadido al equipo correctamente',
            newUserTeam,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAllUserTeamsController = async (req, res, next) => {
    try {
        const usersTeams = await getAllUserTeams();

        res.status(200).json({
            sttus: 200,
            message: 'Usuarios encontrados correctamente',
            usersTeams,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getUsersByTeamIdController = async (req, res, next) => {
    try {
        const { team_id } = req.params;

        const usersTeam = await getUserTeamById(team_id);

        res.status(200).json({
            status: 200,
            message: 'Usuario encontrado para este equipo',
            usersTeam,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateStatusByUserAndTeamController = async (req, res, next) => {
    try {
        const { user_email, team_id } = req.params;

        const validate = await updateUserTeamsSchema.validateAsync(req.body, {
            stripUnknown: true,
        });

        const newStatus = await updateStatusByUserAndTeam(user_email, team_id, validate);

        res.status(200).json({
            status: 200,
            message: 'Estado actualizado correctamente',
            newStatus,
        });
    } catch (error) {
        next(error);
    }
};
