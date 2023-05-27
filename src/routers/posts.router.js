import { Router } from "express";
import {
  deletePost,
  getPublicUserPost,
  getUserPost,
  likePost,
  makeNewPost,
} from "../controllers/posts.controller.js";
import authValidation from "../middlewares/authValidation.middleware.js";
import postOwnerValidation from "../middlewares/postOwnerValidation.middleware.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import usernameValidation from "../middlewares/usernameValidation.middleware.js";
import { postSchema } from "../schemas/post.schema.js";

const postsRouter = Router();

postsRouter.get("/posts/me", authValidation, getUserPost);
postsRouter.post(
  "/posts/new",
  authValidation,
  schemaValidation(postSchema),
  makeNewPost
);
postsRouter.post("/posts/like/:id", authValidation, likePost);
postsRouter.get(
  "/posts/user/:username",
  authValidation,
  usernameValidation,
  getPublicUserPost
);
postsRouter.delete(
  "/posts/delete/:id",
  authValidation,
  postOwnerValidation,
  deletePost
);

export default postsRouter;
