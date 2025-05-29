/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../utils/apiError";
import { Size, SizeCreationAttributes } from "../models/size.model";

type QueryResult = any;
type SizeType = Size;

/**
 * Create Size
 */
const createSize = async (
  sizeBody: SizeCreationAttributes
): Promise<SizeType> => {
  const { name } = sizeBody;
  const existing = await Size.findOne({ where: { name: name } });
  if (existing) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Size already exists");
  }
  return Size.create(sizeBody);
};

/**
 * Query for sizes
 */
const querySize = async (query: any): Promise<QueryResult> => {
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

  const { rows: results, count: total } = await Size.findAndCountAll({
    where: filter,
    offset: options.skip,
    limit: options.take,
    order: options.order,
  });
  return { results, total };
};

export { createSize, querySize };
