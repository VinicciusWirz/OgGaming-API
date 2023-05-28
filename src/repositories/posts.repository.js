import { db } from "../database/database.connection.js";

export function getUserPosts(userId) {
  const result = db.query(
    `
    SELECT 
    users.bio,
    users.name,
    users.username,
    (
        SELECT i.image_url FROM images i
        WHERE i.user_id = users.id 
            AND i.is_profile = true
    ) AS profile_image,
    (SELECT COUNT(*) FROM follows WHERE following_user_id=$1) AS followers,
    (SELECT COUNT(*) FROM follows WHERE user_id=$1) AS following,
    CASE
      WHEN COUNT( posts.id ) > 0
        THEN JSONB_AGG(JSONB_BUILD_OBJECT(
          'id', posts.id,
          'name', users.name,
          'username', users.username,
          'poster_profile_pic', (
            SELECT i2.image_url
            FROM images i2
            WHERE i2.user_id = $1 AND i2.is_profile = true
            LIMIT 1
          ),
          'image', images.image_url,
          'content', posts.content,
          'created_at', posts.created_at,
          'likes', ( SELECT COUNT(*) FROM likes WHERE post_id = posts.id),
          'user_liked', (
            SELECT EXISTS(
              SELECT 1 FROM likes WHERE post_id = posts.id AND user_id = $1
            )
            )
        ) ORDER BY posts.created_at DESC )
      ELSE '[]'
    END AS posts
    FROM users
    LEFT JOIN
        posts ON users.id = posts.user_id
    LEFT JOIN
        images ON images.id = posts.image_id
    WHERE
        users.id = $1
    GROUP BY
        users.id;
    `,
    [userId]
  );
  return result;
}

export function insertNewPostDB(content, image_id, userId) {
  const result = db.query(
    `
        INSERT INTO posts
        (user_id, image_id, content)
        VALUES
        ($1, $2, $3)
        RETURNING id, created_at;
    `,
    [userId, image_id, content]
  );
  return result;
}

export function findPostLiked(userId, postId) {
  const result = db.query(
    `
        SELECT EXISTS (
            SELECT 1 FROM likes 
            WHERE user_id=$1 AND post_id=$2
        ) AS like_exists;
    `,
    [userId, postId]
  );
  return result;
}

export function removePostLiked(userId, postId) {
  const result = db.query(
    `
        DELETE FROM likes
        WHERE user_id=$1 AND post_id=$2;
    `,
    [userId, postId]
  );
  return result;
}

export function addPostLiked(userId, postId) {
  const result = db.query(
    `
        INSERT INTO likes
        (user_id, post_id)
        VALUES
        ($1, $2);
    `,
    [userId, postId]
  );
  return result;
}

export function getLikes(userId, postId) {
  const result = db.query(
    `
        SELECT 
        (SELECT COUNT(*) FROM likes WHERE post_id=$2) AS like_count,
        EXISTS (SELECT 1 FROM likes WHERE user_id=$1 AND post_id=$2) AS user_liked;
    `,
    [userId, postId]
  );
  return result;
}

export function getPublicUserPosts(visitorUserId, userId) {
  const result = db.query(
    `
    SELECT 
      users.bio,
      users.name,
      users.username,
      (
        SELECT i.image_url
        FROM images i
        WHERE i.user_id = users.id 
        AND i.is_profile = true
      ) AS profile_image,
      followers_count.count AS followers,
      following_count.count AS following,
      is_following.exists AS is_following,
      is_follower.exists AS is_follower,
      CASE
        WHEN COUNT(posts.id) > 0
          THEN JSONB_AGG(JSONB_BUILD_OBJECT(
            'id', posts.id,
            'name', users.name,
            'username', users.username,
            'poster_profile_pic', (
              SELECT i2.image_url
              FROM images i2
              WHERE i2.user_id = $1
              AND i2.is_profile = true
              LIMIT 1
            ),
            'image', images.image_url,
            'content', posts.content,
            'created_at', posts.created_at,
            'likes', (
              SELECT COUNT(*)
              FROM likes
              WHERE post_id = posts.id
            ),
            'user_liked', (
              SELECT EXISTS(
                SELECT 1
                FROM likes
                WHERE post_id = posts.id
                AND user_id = $2
              )
            )
          ) ORDER BY posts.created_at DESC
          ) ELSE '[]'
      END AS posts
    FROM users
    LEFT JOIN (
      SELECT following_user_id, COUNT(*) AS count
      FROM follows
      WHERE user_id = $1
      GROUP BY following_user_id
    ) AS followers_count ON users.id = followers_count.following_user_id
    LEFT JOIN (
      SELECT user_id, COUNT(*) AS count
      FROM follows
      WHERE following_user_id = $1
      GROUP BY user_id
    ) AS following_count ON users.id = following_count.user_id
    LEFT JOIN (
      SELECT EXISTS(
        SELECT 1
        FROM follows
        WHERE user_id = $2
        AND following_user_id = $1
      ) AS exists
    ) AS is_following ON true
    LEFT JOIN (
      SELECT EXISTS(
        SELECT 1
        FROM follows
        WHERE user_id = $1
        AND following_user_id = $2
      ) AS exists
    ) AS is_follower ON true
    LEFT JOIN posts ON users.id = posts.user_id
    LEFT JOIN images ON images.id = posts.image_id
    WHERE users.id = $1
    GROUP BY users.id, followers_count.count, following_count.count, is_following.exists, is_follower.exists;
    `,
    [visitorUserId, userId]
  );
  return result;
}

export function checkPostOwnership(postId, userId) {
  const result = db.query(
    `
      SELECT image_id FROM posts WHERE id=$1 AND user_id=$2;
    `,
    [postId, userId]
  );
  return result;
}

export function deletePostDB(postId, userId) {
  const result = db.query(
    `
      DELETE FROM posts
      WHERE id = $1 AND user_id=$2;
    `,
    [postId, userId]
  );
  return result;
}

export function deletePostLike(postId) {
  const result = db.query(
    `
      DELETE FROM likes
      WHERE post_id = $1;
    `,
    [postId]
  );
  return result;
}
