import Joi from 'joi';

export const teamSchema = Joi.object({
    name: Joi.string().max(255).required().messages({
        'any.required': 'name is required',
        'string.base': 'name must be a string',
        'string.max': 'name must be at most 255 characters',
    }),
    sport_id: Joi.string().max(255).required().messages({
        'any.required': 'name is required',
        'string.base': 'name must be a string',
        'string.max': 'name must be at most 255 characters',
    }),
    public: Joi.boolean().default(true).required().messages({
        'any.required': 'name is required',
        'boolean.base': 'publi must be a boolean',
    }),
});

export const updateSchema = Joi.object({
    name: Joi.string().max(255).required().messages({
        'any.required': 'name is required',
        'string.base': 'name must be a string',
        'string.max': 'name must be at most 255 characters',
    }),
});
