import Joi from "joi";
import pagination from "./pagination.validation";

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required().min(1).max(50).trim(),
    price: Joi.number().required().min(0),
    categoryId: Joi.number().required().integer().min(1),
    thumbnail: Joi.string().uri().optional(),
    images: Joi.array().items(Joi.string().uri()).optional(),
    description: Joi.string().optional().allow(""),
  }),
};

const queryProducts = { ...pagination.paginationQuery };

export default { createProduct, queryProducts };
