import { RequestTeams } from '../../models/requestTeams.js';
import { generateError } from '../../utils/generateError.js';

export const createRequestTeam = async (data) => {
    try {
        const requestTeam = await RequestTeams.create(data);

        if (!requestTeam) generateError('Error al crear la solicitud', 500);

        const newRequestTeam = await getRequestTeamById(requestTeam.id);

        return newRequestTeam;
    } catch (error) {
        throw error;
    }
};

export const getRequestTeamById = async (teamId) => {
    try {
        const requestTeam = await RequestTeams.findOne({
            where: {
                team_id: teamId,
            },
        });

        return requestTeam;
    } catch (error) {
        throw error;
    }
};

export const updateRequestById = async (id, data) => {
    try {
        const requestTeam = await RequestTeams.update(data, {
            where: { id: id },
        });

        if (!requestTeam) generateError('Error al actualizar la solicitud', 500);

        return true;
    } catch (error) {
        throw error;
    }
};

export const deleteRequestById = async (id) => {
    try {
        const requestTeam = await RequestTeams.destroy({
            where: { id: id },
        });

        if (!requestTeam) generateError('Error al eliminar la solicitud', 500);

        return requestTeam;
    } catch (error) {
        throw error;
    }
};
