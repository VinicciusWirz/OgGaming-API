import { db } from "../database/database.connection.js";

export function createUserDB(name, email, bio, password, username) {
  const result = db.query(
    `
        INSERT INTO users
        (name, email, bio, password, username)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING id;
    `,
    [name, email, bio, password, username]
  );
  return result;
}

export function checkUsernameDB(username) {
  const result = db.query(
    `
        SELECT id FROM users WHERE username=$1;
    `,
    [username]
  );
  return result;
}

export function checkUserEmailDB(email) {
  const result = db.query(
    `
        SELECT id, password FROM users WHERE email=$1;
    `,
    [email]
  );
  return result;
}
