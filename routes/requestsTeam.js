import express from 'express';
import { validateApiKey } from '../middlewares/validateApiKey.js';
import { createRequestTeamController } from '../controllers/requestTeamsControllers.js';
import { getRequestTeamByIdController, updateRequestTeamController } from '../controllers/requestTeamsControllers.js';

const router = express.Router();

//GET http://localhost:3004/team/request/team/:id
router.get('/team/:id', validateApiKey, getRequestTeamByIdController);

//POST http://localhost:3004/team/request/team/
router.post('/', validateApiKey, createRequestTeamController);

//PUT http://localhost:3004/team/request/:id
router.put('/:id', validateApiKey, updateRequestTeamController);

export default router;
