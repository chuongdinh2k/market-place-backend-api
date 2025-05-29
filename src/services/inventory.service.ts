/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../utils/apiError";
import {
  Inventory,
  InventoryCreationAttributes,
} from "../models/inventory.model";

type QueryResult = any;
type InventoryType = Inventory;

/**
 * Create a new product inventory
 */
const createProductInventory = async (
  productBody: InventoryCreationAttributes
): Promise<InventoryType> => {
  const existingInventory = await Inventory.findOne({
    where: {
      productId: productBody.productId,
      storeId: productBody.storeId,
      sizeId: productBody.sizeId,
      colorId: productBody.colorId,
    },
  });

  if (existingInventory) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Inventory for this product already exists"
    );
  }
  return Inventory.create(productBody);
};

/**
 * Query for product inventory with pagination and filtering
 */
const queryProductInventory = async (query: any): Promise<QueryResult> => {
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

  const { rows: results, count: total } = await Inventory.findAndCountAll({
    where: filter,
    offset: options.skip,
    limit: options.take,
    order: options.order,
  });
  return { results, total };
};

export { createProductInventory, queryProductInventory };
