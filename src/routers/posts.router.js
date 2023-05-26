import { Router } from "express";
import { getUserPost, makeNewPost } from "../controllers/posts.controller.js";
import authValidation from "../middlewares/authValidation.middleware.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { postSchema } from "../schemas/post.schema.js";

const postsRouter = Router();

postsRouter.get("/posts/me", authValidation, getUserPost);
postsRouter.post(
  "/posts/new",
  authValidation,
  schemaValidation(postSchema),
  makeNewPost
);

export default postsRouter;
