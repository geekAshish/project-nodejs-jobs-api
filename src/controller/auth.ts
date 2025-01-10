import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_TOKEN as string,
    { expiresIn: "30d" }
  );

  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.getName() }, token });
};
