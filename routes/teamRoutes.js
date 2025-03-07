import express from 'express';
import {
    createTeamController,
    getTeamsController,
    getTeamByIdController,
    updateTeamController,
    deleteTeamController,
} from '../controllers/teamControllers.js';
import { validateApiKey } from '../middlewares/validateApiKey.js';

const router = express.Router();

router.post('/register', validateApiKey, createTeamController);

router.get('/', validateApiKey, getTeamsController);

router.get('/:team_id', validateApiKey, getTeamByIdController);

router.put('/:team_id', validateApiKey, updateTeamController);

router.delete('/:team_id', validateApiKey, deleteTeamController);

export default router;
