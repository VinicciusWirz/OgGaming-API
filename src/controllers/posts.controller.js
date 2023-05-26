import { getUserPosts } from "../repositories/posts.repository.js";
import postService from "../services/postService.js";

export async function getUserPost(req, res) {
  const userId = res.locals.userId;
  try {
    const { rows } = await getUserPosts(userId);
    res.status(200).send(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function makeNewPost(req, res) {
  const { content, image } = req.body;
  const userId = res.locals.userId;
  try {
    const result = await postService.createNewPost(content, image, userId);
    res.status(201).send({ postId: result.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
