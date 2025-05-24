import Joi from 'joi';

export const userTeamsSchema = Joi.object({
    user_email: Joi.string().required().messages({
        'string.base': 'El email del usuario debe ser una cadena de texto.',
        'string.empty': 'El email del usuario es requerido.',
        'string.required': 'El email del usuario es requerido.',
    }),
    team_id: Joi.number().required().messages({
        'number.base': 'El ID del equipo debe ser un número.',
        'number.empty': 'El ID del equipo es requerido.',
        'number.required': 'El ID del equipo es requerido.',
    }),
    sport_id: Joi.number().required().messages({
        'number.base': 'El ID del deporte debe ser un número.',
        'number.empty': 'El ID del deporte es requerido.',
        'number.required': 'El ID del deporte es requerido.',
    }),
    status: Joi.valid('0', '1', '2').default('1').required().messages({
        'any.required': 'El estado es requerido.',
        'any.only': "El estado debe ser uno de '0', '1'.",
    }),
});

export const updateUserTeamsSchema = Joi.object({
    status: Joi.valid('0', '1', '2').required().messages({
        'any.required': 'El estado es requerido.',
        'any.only': "El estado debe ser uno de '0', '1'.",
    }),
});
