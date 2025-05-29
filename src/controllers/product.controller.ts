import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { productService } from "../services";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const store = await productService.createProduct(req.body);
  res.status(httpStatus.CREATED).send({ store });
});

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const results = await productService.queryProducts(req.query);
  res.status(httpStatus.OK).send(results);
});

export { createProduct, getProducts };
