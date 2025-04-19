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

router.post('/', validateApiKey, createUserTeamController);

router.get('/', validateApiKey, getAllUserTeamsController);

router.get('/:user_email', validateApiKey, getTeamByUserController);

router.get('/team/:team_id', validateApiKey, getUsersByTeamIdController);

router.patch('/:user_email/:team_id', validateApiKey, updateStatusByUserAndTeamController);

export default router;
