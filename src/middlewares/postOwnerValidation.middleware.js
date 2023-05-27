import { checkPostOwnership } from "../repositories/posts.repository.js";

export default async function postOwnerValidation(req, res, next) {
  const userId = res.locals.userId;
  const postId = req.params.id;

  try {
    const { rows, rowCount } = await checkPostOwnership(postId, userId);
    if (!rowCount) return res.sendStatus(401);
    res.locals.imageId = rows[0].image_id;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
}
