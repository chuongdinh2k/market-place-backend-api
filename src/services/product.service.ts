/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../utils/apiError";
import { Product, ProductCreationAttributes } from "../models/product.model";
import { generateSlug } from "../utils/slug";

type QueryResult = any;
type ProductType = Product;

/**
 * Create Product
 */
const createProduct = async (
  productBody: ProductCreationAttributes
): Promise<ProductType> => {
  const { name } = productBody;
  console.log("Creating product with name:", productBody);
  const existing = await Product.findOne({ where: { name: name } });
  if (existing) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product already exists");
  }
  const slug = generateSlug(name);
  productBody.slug = slug;
  return Product.create(productBody);
};

/**
 * Query for products
 */
const queryProducts = async (query: any): Promise<QueryResult> => {
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

  const { rows: results, count: total } = await Product.findAndCountAll({
    where: filter,
    offset: options.skip,
    limit: options.take,
    order: options.order,
  });
  return { results, total };
};

export { createProduct, queryProducts };
