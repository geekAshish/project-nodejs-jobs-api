import { Router } from "express";
import { register } from "../controller/auth";

const userRoute = Router();

userRoute.route("/register").post(register);

export default userRoute;
