import Joi from "joi";

const createSize = {
  body: Joi.object().keys({
    name: Joi.string().required().min(1).max(50).trim(),
  }),
};

const querySize = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }),
};

export default { createSize, querySize };
