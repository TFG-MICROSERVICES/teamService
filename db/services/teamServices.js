import { Team } from '../../models/team.js';
import { generateError } from '../../utils/generateError.js';

export const createTeam = async (data) => {
    try{
        console.log(data);

        const lastTeam = await Team.findOne({
            order: [
                ['team_id','DESC']
            ]
        });
        data.team_id = 't-' + lastTeam.id;

        const team = await Team.create(data);

        if(!team) generateError('Error creating new team', 500);

        const newTeam = await getTeamById(team.team_id);

        return newTeam;
    }catch(error){
        next(error);
    }
}

export const getTeams = async () =>{
    try{
        const teams = await Team.findAll();

        return teams;
    }catch(error){
        next(error);
    }
}

export const getTeamById = async (teamId) =>{
    try{
        const team = await Team.find({
            where:{
                team_id: teamId
            }
        });

        if(!team) generateError('Team with this id,it doent exist',404);

        return team;
    }catch(error){
        next(error);
    }
}

export const updateTeam = async (teamId,data) =>{
    try{

        const teamExists = await getTeamById(teamId);

        if(!teamExists) generateError('Team with this id,it doent exist',404);

        const team = await Team.update(data,{
            where:{
                team_id: teamId
            }
        });

        if(!team) generateError('Team cannot be updated',500);

        return team;
    }catch(error){
        next(error);
    }
}

export const deleteTeam = async (teamId) =>{
    try{
        const teamExists = await getTeamById(teamId);

        if(!teamExists) generateError('Team with this id,it doent exist',404);

        const team = await Team.destroy({
            where:{
                team_id: teamId
            }
        });

        if(!team) generateError('Team cannot be deleted',500);

        return team;
    }catch(error){
        next(error);
    }
}