import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { errors } from "../error";
import { StatusCodes } from "http-status-codes";
// import { CustomAPIError } from "../error/custom-error";

export const errorHandlerMiddleware = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof errors.CustomAPIError) {
    return res
      .status((err as any)?.statusCode)
      .json({ msg: (err as any)?.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong, Please try again" });
};
