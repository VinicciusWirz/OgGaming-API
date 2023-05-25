import { checkUsernameDB } from "../repositories/auth.repository.js";
import genDefUsername from "../utils/GenDefUsername.js";

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
    res.status(500).send(error.message);
  }
}
