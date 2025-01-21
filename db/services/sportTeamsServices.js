import { where } from 'sequelize';
import { SportTeams } from '../../models/sportTeams';
import { generateError } from '../../utils/generateError';


export const createSportTeams = async (data) => {
    try {
        console.log(data);
        const sportTeams = await SportTeams.create(data);
        
        if(!sportTeams) generateError('Error creating new sport_teams', 500);

        return sportTeams;
    } catch (error) {
        console.log(error);
        generateError(error.message,error.status);
    }
}

export const getSportsTeams = async () =>{
    try{
        const sportTeams = await SportTeams.findAll();

        return sportTeams;
    }catch(error){
        console.log(error);
        generateError(error.message,error.status);
    }
}

export const getTeamsBySportId = async(sportId) =>{
    try{
        const sportTeams = await SportTeams.find({
            where:{
                sport_id: sportId
            }
        });

        if(!sportTeams) generateError('Sport dont exists to this sport',404);

        return sportTeams;
    }catch(error){
        console.log(error);
        generateError(error.message,error.status);
    }
}

export const getSportByTeamId = async(teamId) =>{
    try{
        const sportTeams = await SportTeams.find({
            where:{
                team_id: teamId
            }
        });

        if(!sportTeams) generateError('Sport dont exists to this team',404);

        return sportTeams;
    }catch(error){
        console.log(error);
        generateError(error.message,error.status);
    }
}