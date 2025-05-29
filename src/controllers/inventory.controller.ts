import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { inventoryService } from "../services";

const createProductInventory = catchAsync(
  async (req: Request, res: Response) => {
    const store = await inventoryService.createProductInventory(req.body);
    res.status(httpStatus.CREATED).send({ store });
  }
);

const getProductInventories = catchAsync(
  async (req: Request, res: Response) => {
    const results = await inventoryService.queryProductInventory(req.query);
    res.status(httpStatus.OK).send(results);
  }
);

export { createProductInventory, getProductInventories };
