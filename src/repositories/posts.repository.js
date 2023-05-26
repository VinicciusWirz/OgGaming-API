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
    COUNT(f.id) AS followers,
    COUNT(f2.id) AS following,
    CASE
      WHEN COUNT( posts.id ) > 0
        THEN JSONB_AGG(JSONB_BUILD_OBJECT(
          'id', posts.id,
          'name', users.name,
          'username', users.username,
          'image', images.image_url,
          'content', posts.content
        ))
      ELSE '[]'
    END AS posts
    FROM users
    LEFT JOIN
        follows f ON users.id = f.following_user_id
    LEFT JOIN
        follows f2 ON users.id = f2.user_id
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
        RETURNING id;
    `,
    [userId, image_id, content]
  );
  return result;
}
