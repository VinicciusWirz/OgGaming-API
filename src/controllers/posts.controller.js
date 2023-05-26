import { getUserPosts } from "../repositories/posts.repository.js";

export async function getUserPost(req, res) {
  const userId = res.locals.userId;
  try {
    const { rows } = await getUserPosts(userId);
    res.status(200).send(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
