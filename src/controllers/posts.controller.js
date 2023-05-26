import { getUserPosts } from "../repositories/posts.repository.js";
import postService from "../services/postService.js";

export async function getUserPost(req, res) {
  const userId = res.locals.userId;
  const targetId = req.params.id || userId;
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

export async function likePost(req, res) {
  const userId = res.locals.userId;
  const postId = req.params.id;
  try {
    const result = await postService.likePostReqs(userId, postId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getPublicUserPost(req, res) {
  const userId = res.locals.userId;

  const visitorUserId = res.locals.visitorUserId;
  try {
    const result = await postService.getUserPostsReqs(visitorUserId, userId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
