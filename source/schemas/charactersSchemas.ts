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

export const updateCharacterSchema = Joi.object({
  userCharacterId: Joi.number().required(),
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

export const deleteCharacterSchema = Joi.object({
  userCharacterId: Joi.number().required(),
});
