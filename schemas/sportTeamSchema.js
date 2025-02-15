import Joi from "joi";

export const sportTeamSchema = Joi.object({
  id: Joi.number().integer().optional(), // autoIncrement, not necessary in validation
  sport_id: Joi.string().max(255).required().messages({
    "string.base": "Sport ID must be a string.",
    "string.max": "Sport ID must be at most 255 characters long.",
    "string.empty": "Sport ID is required.",
  }),
  team_id: Joi.string().required().messages({
    "string.base": "Team ID must be a string.",
    "string.empty": "Team ID is required.",
  }),
});
