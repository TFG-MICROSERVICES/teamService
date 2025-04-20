import express from 'express';
import {
    createTeamController,
    getTeamsController,
    getTeamByIdController,
    updateTeamController,
    deleteTeamController,
    teamsByArrayController,
} from '../controllers/teamControllers.js';
import { validateApiKey } from '../middlewares/validateApiKey.js';
import { getTeamByUserController } from '../controllers/userTeamsControllers.js';

const router = express.Router();

//GET http://localhost:3000/team/
router.get('/', validateApiKey, getTeamsController);

//GET http://localhost:3000/team/:team_id
router.get('/:team_id', validateApiKey, getTeamByIdController);

//GET http://localhost:3000/team/user/:user_email
router.get('/user/:user_email', validateApiKey, getTeamByUserController);

//POST http://localhost:3000/team/register
router.post('/register', validateApiKey, createTeamController);

//GET http://localhost:3000/team/teams-by-array
router.post('/teams-by-array', validateApiKey, teamsByArrayController);

//PUT http://localhost:3000/team/:team_id
router.put('/:team_id', validateApiKey, updateTeamController);

//DELETE http://localhost:3000/team/:team_id
router.delete('/:team_id', validateApiKey, deleteTeamController);

export default router;
