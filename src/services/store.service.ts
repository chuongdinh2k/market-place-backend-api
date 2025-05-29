/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../utils/apiError";
import {
  Store,
  StoreCreationAttributes,
  StoreUpdateAttributes,
} from "../models/store.model";
import { generateSlug } from "../utils/slug";

type QueryResult = any;
type StoreType = Store;

/**
 * Create Size
 */
const createStore = async (
  storeBody: StoreCreationAttributes
): Promise<StoreType> => {
  const { name } = storeBody;
  const existing = await Store.findOne({ where: { name: name } });
  if (existing) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Store already exists");
  }
  const slug = generateSlug(name);
  storeBody.slug = slug;
  return Store.create(storeBody);
};

const updateStore = async (
  updateStoreBody: StoreUpdateAttributes
): Promise<StoreType> => {
  const { id, name } = updateStoreBody;
  const store = await Store.findByPk(id);
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, "Store not found");
  }
  if (name) {
    const existing = await Store.findOne({ where: { name: name } });
    if (existing && existing.id !== id) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Store with this name already exists"
      );
    }
    store.name = name;
    store.slug = generateSlug(name);
  }
  return store.save();
};

/**
 * Query for stores
 */
const queryStores = async (query: any): Promise<QueryResult> => {
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

  const { rows: results, count: total } = await Store.findAndCountAll({
    where: filter,
    offset: options.skip,
    limit: options.take,
    order: options.order,
  });
  return { results, total };
};

export { createStore, queryStores, updateStore };
