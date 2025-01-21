import{
    createTeam,
    getTeams,
    getTeamById,
    updateTeam,
    deleteTeam
} from '../db/services/teamServices.js';
import { teamSchema } from '../schemas/teamSchema.js';

export const createTeamController = async (req,res,next) =>{
    try{
        const validate = await teamSchema.validateAsync(req.body,{stripUnknown: true});

        const team = await createTeam(validate);

        res.status(201).json({
            message: 'Team created successfully',
            team
        });
        res.status(201).json(team);
    }catch(error){
        next(error);
    }
}

export const getTeamsController = async (req,res,next) =>{
    try{
        const teams = await getTeams();

        res.status(200).json(teams);
    }catch(error){
        next(error);
    }
}

export const getTeamByIdController = async (req,res,next) =>{
    try{
        const { id } = req.params;

        const team = await getTeamById(id);

        res.status(200).json({
            message: 'Team found',
            team
        });
    }catch(error){
        next(error);
    }
}

export const updateTeamController = async (req,res,next) =>{
    try{
        const { id } = req.params;
        const { data } = req.body;

        const team = await updateTeam(id,data);

        res.status(200).json({
            message: 'Team updated successfully',
            team
        });
    }catch(error){
        next(error);
    }
}

export const deleteTeamController = async (req,res,next) =>{
    try{
        const { id } = req.params;

        await deleteTeam(id);

        res.status(200).json({
            message: 'Team deleted successfully'
        });
    }catch(error){
        next(error);
    }
}