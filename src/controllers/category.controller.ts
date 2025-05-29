import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { categoryService } from "../services";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send({ category });
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const results = await categoryService.queryCategory(req.query);
  res.status(httpStatus.OK).send(results);
});

export { createCategory, getCategories };
