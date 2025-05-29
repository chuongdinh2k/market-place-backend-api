import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { colorService } from "../services";

const createColor = catchAsync(async (req: Request, res: Response) => {
  const color = await colorService.createColor(req.body);
  res.status(httpStatus.CREATED).send({ color });
});

const getColors = catchAsync(async (req: Request, res: Response) => {
  const results = await colorService.queryColors(req.query);
  res.status(httpStatus.OK).send(results);
});

export { createColor, getColors };
