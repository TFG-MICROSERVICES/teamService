import Joi from 'joi';

export const requestTeamSchema = Joi.object({
    team_id: Joi.number().required().messages({
        'any.required': 'El ID del equipo es requerido',
        'number.base': 'El ID del equipo debe ser un número',
    }),
    user_email: Joi.string().required().messages({
        'any.required': 'El email del usuario es requerido',
        'string.base': 'El email del usuario debe ser una cadena',
    }),
    sport_id: Joi.number().required().messages({
        'any.required': 'El ID del deporte es requerido',
        'number.base': 'El ID del deporte debe ser un número',
    }),
    status: Joi.string().valid('0', '1', '2').required().default('2').messages({
        'any.required': 'El estado es requerido',
        'string.base': 'El estado debe ser una cadena',
        'any.only': 'El estado debe ser 0, 1 o 2',
    }),
    description: Joi.string().max(255).required().messages({
        'any.required': 'La descripción es requerida',
        'string.base': 'La descripción debe ser una cadena',
        'string.max': 'La descripción debe tener máximo 255 caracteres',
    }),
});

export const updateRequestTeamSchema = Joi.object({
    status: Joi.string().valid('0', '1', '2').required().messages({
        'any.required': 'El estado es requerido',
    }),
});
