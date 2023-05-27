import { db } from "../database/database.connection.js";
export function createUserPicDB(picture, userId) {
  const result = db.query(
    `
    INSERT INTO images
    (image_url, user_id, is_profile)
    VALUES
    ($1, $2, true);
    `,
    [picture, userId]
  );
  return result;
}

export function createUserDefPicDB(userId) {
  const result = db.query(
    `
      INSERT INTO images
      (user_id, is_profile)
      VALUES
      ($1, true);
      `,
    [userId]
  );
  return result;
}

export function getProfilePicDB(userId) {
  const result = db.query(
    `
      SELECT image_url FROM images
      WHERE user_id=$1 AND is_profile=true;
    `,
    [userId]
  );
  return result;
}

export function insertNewPostImage(image, userId) {
  const result = db.query(
    `
    INSERT INTO images
    (image_url, user_id, is_profile)
    VALUES
    ($1, $2, false)
    RETURNING id;
    `,
    [image, userId]
  );
  return result;
}

export function deletePostImg(imageId, userId) {
  const result = db.query(
    `
      DELETE FROM images
      WHERE id=$1 AND user_id=$2;
    `,
    [imageId, userId]
  );
  return result;
}
