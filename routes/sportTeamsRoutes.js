import express from "express";
import { validateApiKey } from "../middlewares/validateApiKey.js";

const router = express.Router();

router.post("/", validateApiKey);

router.get("/", validateApiKey);

router.get("/:sport_id", validateApiKey);

router.get(":/team_id", validateApiKey);

export default router;
