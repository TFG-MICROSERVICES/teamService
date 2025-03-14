import { requestTeamSchema, updateRequestTeamSchema } from '../schemas/requestTeam.js';
import { createRequestTeam, updateRequestById, deleteRequestById } from '../db/services/requestsTeamServices.js';
import { getRequestTeamById } from '../db/services/requestsTeamServices.js';
import { generateError } from '../utils/generateError.js';

export const createRequestTeamController = async (req, res, next) => {
    try {
        const validate = await requestTeamSchema.validateAsync(req.body);

        const requestTeam = await createRequestTeam(validate);

        res.status(201).json({
            status: 201,
            message: 'Solicitud de equipo creada correctamente',
            data: requestTeam,
        });
    } catch (error) {
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

        res.status(200).json({
            status: 200,
            message: 'Solicitud de equipo actualizada correctamente',
        });
    } catch (error) {
        next(error);
    }
};
