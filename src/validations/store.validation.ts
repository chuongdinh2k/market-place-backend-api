import Joi from "joi";
import pagination from "./pagination.validation";

const createStore = {
  body: Joi.object().keys({
    name: Joi.string().required().min(1).max(50).trim(),
    address: Joi.string().optional().allow(""),
    phone: Joi.string().required().min(10).max(15).trim(),
    email: Joi.string().optional().email().allow(""),
    description: Joi.string().optional().allow(""),
    logo: Joi.string().optional().allow(""),
  }),
};

const queryStores = { ...pagination.paginationQuery };

const updateStore = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().min(1).max(50).trim(),
    address: Joi.string().allow(""),
    phone: Joi.string().min(10).max(15).trim(),
    email: Joi.string().email().allow(""),
    description: Joi.string().allow(""),
    logo: Joi.string().allow(""),
  }),
};

export default { createStore, queryStores, updateStore };
