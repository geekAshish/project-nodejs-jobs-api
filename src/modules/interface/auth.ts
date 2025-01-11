import { Request } from "express";

interface UserInterface {
  userId: string;
  name: string;
}

export interface GetUserAuthInfoRequest extends Request {
  user: UserInterface;
}
