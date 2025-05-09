import { NextFunction, Request, Response } from "express";

type AsyncControllers = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const catchErrors =
  (controller: AsyncControllers): AsyncControllers =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
