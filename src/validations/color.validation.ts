import Joi from "joi";
import pagination from "./pagination.validation";

const createColor = {
  body: Joi.object().keys({
    name: Joi.string().required().min(1).max(50).trim(),
    colorCode: Joi.string()
      .required()
      .pattern(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i)
      .trim(),
  }),
};

const queryColors = { ...pagination.paginationQuery };

export default { createColor, queryColors };
