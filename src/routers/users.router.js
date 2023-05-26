import { Router } from "express";
import { followUser, getFollowerList, getFollowingList } from "../controllers/users.controllers.js";
import authValidation from "../middlewares/authValidation.middleware.js";
import usernameValidation from "../middlewares/usernameValidation.middleware.js";

const userRouter = Router();

userRouter.post(
  "/user/follow/:username",
  authValidation,
  usernameValidation,
  followUser
);
userRouter.get("/user/followers", authValidation, getFollowerList)
userRouter.get("/user/following", authValidation, getFollowingList)

export default userRouter;
