/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../utils/apiError";
import { Category, CategoryCreationAttributes } from "../models/category.model";

type QueryResult = any;
type CategoryType = Category;

/**
 * Create Category
 */
const createCategory = async (
  categoryBody: CategoryCreationAttributes
): Promise<CategoryType> => {
  const { name } = categoryBody;
  const existing = await Category.findOne({ where: { name: name } });
  if (existing) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category already exists");
  }
  return Category.create(categoryBody);
};

/**
 * Query for sizes
 */
const queryCategory = async (query: any): Promise<QueryResult> => {
  const { skip, take, order, limit, page, ...filter } = query;

  // Support both skip/take and page/limit
  const _take = take ? Number(take) : limit ? Number(limit) : 10;
  const _skip = skip
    ? Number(skip)
    : page && limit
    ? (Number(page) - 1) * Number(limit)
    : 0;

  const options = {
    skip: _skip,
    take: _take,
    order: order ? JSON.parse(order as string) : [["createdAt", "DESC"]],
  };

  const { rows: results, count: total } = await Category.findAndCountAll({
    where: filter,
    offset: options.skip,
    limit: options.take,
    order: options.order,
  });
  return { results, total };
};

export { createCategory, queryCategory };
