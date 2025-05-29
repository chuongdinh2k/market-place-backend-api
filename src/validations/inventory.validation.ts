import Joi from "joi";
import pagination from "./pagination.validation";

const createProductInventory = {
  body: Joi.object().keys({
    productId: Joi.number().required().integer().min(1),
    amount: Joi.number().required().min(1),
    sizeId: Joi.number().required().integer().min(1),
    colorId: Joi.number().required().integer().min(1),
    storeId: Joi.number().required().integer().min(1),
  }),
};

const queryProductInventories = { ...pagination.paginationQuery };

export default { createProductInventory, queryProductInventories };
