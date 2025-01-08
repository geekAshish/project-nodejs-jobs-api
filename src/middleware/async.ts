import { NextFunction, Request, Response } from "express";

export const asyncWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => {}
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error);
      next(error); // we passed it to the next middleware
    }
  };
};
