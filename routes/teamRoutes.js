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

router.get('/:id', validateApiKey, getTeamByIdController);

router.put('/:id', validateApiKey, updateTeamController);

router.delete('/:id', validateApiKey, deleteTeamController);

export default router;
