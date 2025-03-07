import { Team } from '../../models/team.js';
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

export const getTeams = async (search) => {
    try {
        const teams = await Team.findAll({
            where: search
                ? {
                      [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
                  }
                : {},
        });

        console.log('teams', teams);

        return teams;
    } catch (error) {
        generateError(error.message, error.status);
    }
};

export const getTeamById = async (teamId) => {
    try {
        const team = await Team.findByPk(teamId);

        if (!team) generateError('Team with this id,it doent exist', 404);

        return team;
    } catch (error) {
        console.log('error mas dentro', error);
        generateError(error.message, error.status);
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
        generateError(error.message, error.status);
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

        console.log('ELIMINADO', team);

        if (!team) generateError('El equipo no se puede eliminar', 500);

        return team;
    } catch (error) {
        console.log('dentro', error);
        generateError(error.message, error.status);
    }
};
