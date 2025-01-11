import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { errors } from "../error";
import { GetUserAuthInfoRequest } from "../modules/interface/auth";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer ")) {
    throw new errors.UnauthenticatedError("Invalid Credentials");
  }

  const token = authHeader.split(" ")?.[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_TOKEN as string
    ) as JwtPayload;

    (req as GetUserAuthInfoRequest).user = {
      userId: payload.userId,
      name: payload.name,
    };
    next();
  } catch (error) {
    throw new errors.UnauthenticatedError("Invalid Credentials");
  }
};
