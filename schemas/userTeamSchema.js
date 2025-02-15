import Joi from "joi";

export const userTeamsSchema = Joi.object({
  user_email: Joi.string().max(255).email().required().messages({
    "string.base": "Email must be a string.",
    "string.max": "Email must be at most 255 characters long.",
    "string.empty": "Email is required.",
    "string.email": "Email format is invalid.",
  }),
  team_id: Joi.string().required().messages({
    "string.base": "Team ID must be a string.",
    "string.empty": "Team ID is required.",
  }),
});
