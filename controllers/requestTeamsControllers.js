import { requestTeamSchema, updateRequestTeamSchema } from '../schemas/requestTeam.js';
import { createRequestTeam, updateRequestById, deleteRequestById, getRequestTeamById, getRequestById } from '../db/services/requestsTeamServices.js';
import { createUserTeam, getTeamByUserService } from '../db/services/userTeamsServices.js';
import { generateError } from '../utils/generateError.js';

export const createRequestTeamController = async (req, res, next) => {
    try {
        const team = await getTeamByUserService(req.body.user_email,String(req.body.sport_id));
        if(team.length > 0){
            generateError('No se pudo hacer la solicitud porque ya tiene sun equipo en este deporte', 400);
        }
        const validate = await requestTeamSchema.validateAsync(req.body);

        const requestTeam = await createRequestTeam(validate);

        res.status(201).json({
            status: 201,
            message: 'Solicitud de equipo creada correctamente',
            data: requestTeam,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getRequestTeamByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) generateError('El ID de la solicitud de equipo es necesario');

        const requestTeam = await getRequestTeamById(id);

        res.status(200).json({
            status: 200,
            message: 'Solicitud de equipo encontrada correctamente',
            data: requestTeam,
        });
    } catch (error) {
        next(error);
    }
};

export const updateRequestTeamController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const validate = await updateRequestTeamSchema.validateAsync(req.body);

        if (!id) generateError('El ID de la solicitud de equipo es necesario');

        await updateRequestById(id, validate);

        const requestTeam = await getRequestById(id);

        if (requestTeam.status === '1') {
            await createUserTeam({
                user_email: requestTeam.user_email,
                team_id: requestTeam.team_id,
                sport_id: requestTeam.sport_id,
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Solicitud de equipo actualizada correctamente',
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
