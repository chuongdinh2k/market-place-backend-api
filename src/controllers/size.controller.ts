import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { sizeService } from "../services";

const createSize = catchAsync(async (req: Request, res: Response) => {
  const size = await sizeService.createSize(req.body);
  res.status(httpStatus.CREATED).send({ size });
});

const getSizes = catchAsync(async (req: Request, res: Response) => {
  const results = await sizeService.querySize(req.query);
  res.status(httpStatus.OK).send(results);
});

export { createSize, getSizes };
