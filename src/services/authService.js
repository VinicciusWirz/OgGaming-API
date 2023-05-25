import {
  checkUserEmailDB,
  checkUsernameDB,
} from "../repositories/auth.repository.js";
import genDefUsername from "../utils/GenDefUsername.js";
import bcrypt from "bcrypt";

export async function createNewUsername() {
  const username = genDefUsername();
  try {
    const user = await checkUsernameDB(username);
    if (user.rows[0]) {
      return createNewUsername();
    } else {
      return username;
    }
  } catch (error) {
    return error.message;
  }
}

export async function authenticateUser(email, password) {
  try {
    const { rows, rowCount } = await checkUserEmailDB(email);
    if (!rowCount) {
      return { error: { status: 404 } };
    }
    const userPassword = rows[0].password;
    const comparePassword = bcrypt.compareSync(password, userPassword);
    if (!comparePassword) return { error: { status: 401 } };
    return { id: rows[0].id };
  } catch (error) {
    return { error: error.message };
  }
}
