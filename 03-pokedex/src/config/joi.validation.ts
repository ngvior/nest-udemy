import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required() && Joi.string(),
  PORT: Joi.number().default(3333),
  DEFAULT_LIMIT: Joi.number().default(6),
});
