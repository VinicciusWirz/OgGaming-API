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

export function findFollowers(userId) {
  const result = db.query(
    `
        SELECT 
        users.id, 
        users.name, 
        users.username,
        users.bio,
        EXISTS (
          SELECT 1
          FROM follows
          WHERE follows.user_id = $1
            AND follows.following_user_id = users.id
        ) AS is_following,
        EXISTS (
          SELECT 1
          FROM follows
          WHERE follows.user_id = users.id
            AND follows.following_user_id = $1
        ) AS is_follower,
        (
            SELECT images.image_url
            FROM images WHERE images.user_id = users.id AND images.is_profile = true
        ) AS profile_image,
        (
            SELECT COUNT(*)
            FROM follows
            WHERE follows.user_id = users.id
        ) AS following_count,
        (
            SELECT COUNT(*)
            FROM follows
            WHERE follows.following_user_id = users.id
        ) AS followers_count
        FROM
            users
        LEFT JOIN
            follows ON follows.user_id = users.id AND follows.following_user_id=$1
        WHERE
            follows.following_user_id=$1;
        `,
    [userId]
  );
  return result;
}
