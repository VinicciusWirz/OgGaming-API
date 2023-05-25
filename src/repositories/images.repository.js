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
