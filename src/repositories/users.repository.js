import { db } from "../database/database.connection.js";

export function isFollowing(userId, targetId) {
  const result = db.query(
    `
        SELECT EXISTS (
            SELECT 1
            FROM follows
            WHERE user_id = $1 AND following_user_id = $2
          ) AS follows;
        `,
    [userId, targetId]
  );
  return result;
}

export function followReq(userId, targetId) {
  const result = db.query(
    `
        INSERT INTO follows
        (user_id, following_user_id)
        VALUES
        ($1, $2);
    `,
    [userId, targetId]
  );
  return result;
}

export function unfollowReq(userId, targetId) {
  const result = db.query(
    `
        DELETE FROM follows
        WHERE user_id = $1 AND following_user_id = $2;
    `,
    [userId, targetId]
  );
  return result;
}
