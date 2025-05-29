import Joi from "joi";

const createColor = {
  body: Joi.object().keys({
    name: Joi.string().required().min(1).max(50).trim(),
    colorCode: Joi.string()
      .required()
      .pattern(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i)
      .trim(),
  }),
};

const queryColors = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }),
};

export default { createColor, queryColors };
