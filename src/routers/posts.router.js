import { Router } from "express";
import { getUserPost } from "../controllers/posts.controller.js";
import authValidation from "../middlewares/authValidation.middleware.js";


const postsRouter = Router();

postsRouter.get("/posts/me", authValidation, getUserPost);

export default postsRouter;