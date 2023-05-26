import { Router } from "express";
import { followUser } from "../controllers/users.controllers.js";
import authValidation from "../middlewares/authValidation.middleware.js";
import usernameValidation from "../middlewares/usernameValidation.middleware.js";

const userRouter = Router();

userRouter.post(
  "/user/follow/:username",
  authValidation,
  usernameValidation,
  followUser
);

export default userRouter;
