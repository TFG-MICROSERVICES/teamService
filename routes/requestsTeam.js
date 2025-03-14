import express from 'express';
import { validateApiKey } from '../middlewares/validateApiKey.js';
import { createRequestTeamController } from '../controllers/requestTeamsControllers.js';
import { getRequestTeamByIdController, updateRequestTeamController } from '../controllers/requestTeamsControllers.js';

const router = express.Router();

router.get('/team/:id', validateApiKey, getRequestTeamByIdController);

router.post('/', validateApiKey, createRequestTeamController);

router.put('/:id', validateApiKey, updateRequestTeamController);

export default router;
