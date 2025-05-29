import Joi from "joi";
import pagination from "./pagination.validation";

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(50).trim(),
    description: Joi.string().optional().allow("").max(500).trim(),
  }),
};

const queryCategories = { ...pagination.paginationQuery };

export default { createCategory, queryCategories };
