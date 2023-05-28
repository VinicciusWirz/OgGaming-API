import {
  deletePostImg,
  insertNewPostImage,
} from "../repositories/images.repository.js";
import {
  addPostLiked,
  deletePostDB,
  deletePostLike,
  findPostLiked,
  getLikes,
  getPublicUserPosts,
  insertNewPostDB,
  removePostLiked,
} from "../repositories/posts.repository.js";
import genCleanText from "../utils/genCleanText.js";

async function createNewPost(content, image, userId) {
  const cleanContent = genCleanText(content);
  const cleanImage = genCleanText(image);
  try {
    const { rows } = await insertNewPostImage(cleanImage, userId);
    const image_id = rows[0].id;
    const newPost = await insertNewPostDB(cleanContent, image_id, userId);
    return newPost.rows[0];
  } catch (error) {
    return error.message;
  }
}

async function likePostReqs(userId, postId) {
  try {
    const { rows } = await findPostLiked(userId, postId);
    if (rows[0].like_exists) {
      await removePostLiked(userId, postId);
    } else {
      await addPostLiked(userId, postId);
    }
    const result = await getLikes(userId, postId);
    return result.rows[0];
  } catch (error) {
    return error.message;
  }
}

async function getUserPostsReqs(visitorUserId, userId) {
  try {
    const result = await getPublicUserPosts(visitorUserId, userId);
    return result.rows[0];
  } catch (error) {
    return error.message;
  }
}

async function deleteUserPostReq(postId, userId, imageId) {
  try {
    await deletePostLike(postId);
    await deletePostDB(postId, userId);
    const result = await deletePostImg(imageId, userId);
    return result;
  } catch (error) {
    return error.message;
  }
}

const postService = {
  createNewPost,
  likePostReqs,
  getUserPostsReqs,
  deleteUserPostReq,
};
export default postService;
