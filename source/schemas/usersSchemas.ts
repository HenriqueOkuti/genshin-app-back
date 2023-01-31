import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  image: Joi.string().required(),
});
