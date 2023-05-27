import { Router } from "express";
import {
  editUserInfo,
  followUser,
  getFollowerList,
  getFollowingList,
  getSearchQuery,
} from "../controllers/users.controllers.js";
import authValidation from "../middlewares/authValidation.middleware.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import usernameValidation from "../middlewares/usernameValidation.middleware.js";
import userSchema from "../schemas/user.schema.js";

const userRouter = Router();

userRouter.post(
  "/user/follow/:username",
  authValidation,
  usernameValidation,
  followUser
);
userRouter.get("/user/followers", authValidation, getFollowerList);
userRouter.get("/user/following", authValidation, getFollowingList);
userRouter.get("/user/search/:name", authValidation, getSearchQuery);
userRouter.put(
  "/user/me",
  schemaValidation(userSchema.userInfo),
  authValidation,
  editUserInfo
);
userRouter.put(
  "/user/me/pfp",
  schemaValidation(userSchema.userPfp),
  authValidation,
  editUserInfo
);

export default userRouter;
