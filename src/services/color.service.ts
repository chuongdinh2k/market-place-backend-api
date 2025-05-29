/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../utils/apiError";
import { Color, ColorCreationAttributes } from "../models/color.model";

type QueryResult = any;
type ColorType = Color;

/**
 * Create Size
 */
const createSize = async (
  colorBody: ColorCreationAttributes
): Promise<ColorType> => {
  const { name } = colorBody;
  const existing = await Color.findOne({ where: { name: name } });
  if (existing) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Color already exists");
  }
  return Color.create(colorBody);
};

/**
 * Query for colors
 */
const queryColors = async (query: any): Promise<QueryResult> => {
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

  const { rows: results, count: total } = await Color.findAndCountAll({
    where: filter,
    offset: options.skip,
    limit: options.take,
    order: options.order,
  });
  return { results, total };
};

export { createSize, queryColors };
