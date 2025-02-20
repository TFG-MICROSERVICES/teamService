import Joi from 'joi';

export const userTeamsSchema = Joi.object({
    user_email: Joi.string().max(255).email().required().messages({
        'string.base': 'Email must be a string.',
        'string.max': 'Email must be at most 255 characters long.',
        'string.empty': 'Email is required.',
        'string.email': 'Email format is invalid.',
    }),
    team_id: Joi.string().required().messages({
        'string.base': 'Team ID must be a string.',
        'string.empty': 'Team ID is required.',
    }),
    status: Joi.valid('0', '1', '2').required().messages({
        'any.required': 'Status is required.',
        'any.only': "Status must be one of '0', '1', or '2'.",
    }),
});

export const updateUserTeamsSchema = Joi.object({
    status: Joi.valid('0', '1', '2').required().messages({
        'any.required': 'Status is required.',
        'any.only': "Status must be one of '0', '1', or '2'.",
    }),
});
