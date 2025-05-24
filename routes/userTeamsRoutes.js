import express from 'express';
import {
    createUserTeamController,
    getAllUserTeamsController,
    getTeamByUserController,
    getUsersByTeamIdController,
    updateStatusByUserAndTeamController,
} from '../controllers/userTeamsControllers.js';
import { validateApiKey } from '../middlewares/validateApiKey.js';

const router = express.Router();

//GET http://localhost:3004/team/user
router.get('/', validateApiKey, getAllUserTeamsController);

//GET http://localhost:3004/team/user/:user_email
router.get('/:user_email', validateApiKey, getTeamByUserController);

//GET http://localhost:3004/team/user/:team_id
router.get('/team/:team_id', validateApiKey, getUsersByTeamIdController);

//POST http://localhost:3004/team/user/register
router.post('/register', validateApiKey, createUserTeamController);

//PATCH http://localhost:3004/team/user/:user_email/:team_id
router.patch('/:user_email/:team_id', validateApiKey, updateStatusByUserAndTeamController);

export default router;
