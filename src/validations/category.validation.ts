import Joi from "joi";

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(50).trim(),
    slug: Joi.string().required().min(3).max(50).trim(),
    description: Joi.string().optional().allow("").max(500).trim(),
  }),
};

const queryCategory = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }),
};

export default { createCategory, queryCategory };
