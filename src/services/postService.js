import { insertNewPostImage } from "../repositories/images.repository.js";
import { insertNewPostDB } from "../repositories/posts.repository.js";

export async function createNewPost(content, image, userId) {
  try {
    const { rows } = await insertNewPostImage(image, userId);
    const image_id = rows[0].id;
    const newPost = await insertNewPostDB(content, image_id, userId);
    return newPost.rows[0];
  } catch (error) {
    return error.message;
  }
}

const postService = { createNewPost };
export default postService;
