import Joi from "joi";

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(128),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    avatar: Joi.string().uri().optional(),
  }),
};

export default { createUser };
