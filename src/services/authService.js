import {
  checkUserEmailDB,
  checkUsernameDB,
} from "../repositories/auth.repository.js";
import genDefUsername from "../utils/genDefUsername.js";
import bcrypt from "bcrypt";
import { getProfilePicDB } from "../repositories/images.repository.js";

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

    const userId = rows[0].id;
    const { rows: image } = await getProfilePicDB(userId);
    const pfp = image[0].image_url;

    return {
      id: userId,
      name: rows[0].name,
      username: rows[0].username,
      bio: rows[0].bio,
      birthday: rows[0].birthday,
      image: pfp,
    };
  } catch (error) {
    return { error: error.message };
  }
}
