import Joi from 'joi';

export const userTeamsSchema = Joi.object({
    user_id: Joi.number().required().messages({
        'number.base': 'User ID must be a number.',
        'number.empty': 'User ID is required.',
        'number.required': 'User ID is required.',
    }),
    team_id: Joi.number().required().messages({
        'number.base': 'Team ID must be a number.',
        'number.empty': 'Team ID is required.',
        'number.required': 'Team ID is required.',
    }),
    sport_id: Joi.number().required().messages({
        'number.base': 'Sport ID must be a number.',
        'number.empty': 'Sport ID is required.',
        'number.required': 'Sport ID is required.',
    }),
    status: Joi.valid('0', '1', '2').default('1').required().messages({
        'any.required': 'Estado es requerido.',
        'any.only': "El estado debe ser uno de '0', '1', o '2'.",
    }),
});

export const updateUserTeamsSchema = Joi.object({
    status: Joi.valid('0', '1', '2').required().messages({
        'any.required': 'Status is required.',
        'any.only': "Status must be one of '0', '1', or '2'.",
    }),
});
