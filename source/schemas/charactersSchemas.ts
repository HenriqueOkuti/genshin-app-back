import Joi from 'joi';

export const createCharacterSchema = Joi.object({
  characterId: Joi.number().required(),
  level: Joi.number().required(),
  friendship: Joi.number().required(),
  talents: {
    normal: Joi.number().required(),
    skill: Joi.number().required(),
    burst: Joi.number().required(),
  },
  constellations: Joi.number().required(),
});
