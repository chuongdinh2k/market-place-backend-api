import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { storeService } from "../services";

const createStore = catchAsync(async (req: Request, res: Response) => {
  const store = await storeService.createStore(req.body);
  res.status(httpStatus.CREATED).send({ store });
});

const getStores = catchAsync(async (req: Request, res: Response) => {
  const results = await storeService.queryStores(req.query);
  res.status(httpStatus.OK).send(results);
});

const updateStore = catchAsync(async (req: Request, res: Response) => {
  const store = await storeService.updateStore(req.body);
  res.status(httpStatus.OK).send({ store });
});

export { createStore, getStores, updateStore };
