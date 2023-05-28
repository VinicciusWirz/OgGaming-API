import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserDB } from "../repositories/auth.repository.js";
import {
  createUserDefPicDB,
  createUserPicDB,
} from "../repositories/images.repository.js";
import {
  authenticateUser,
  createNewUsername,
} from "../services/authService.js";
import genCleanText from "../utils/genCleanText.js";

export async function signup(req, res) {
  const { name, email, bio, password, picture } = req.body;
  const cleanName = genCleanText(name);
  const cleanBio = genCleanText(bio);
  const cleanPicture = genCleanText(picture);

  try {
    const hashPassword = bcrypt.hashSync(password, 10);
    const username = await createNewUsername();

    const { rows } = await createUserDB(
      cleanName,
      email,
      cleanBio,
      hashPassword,
      username
    );
    const userId = rows[0].id;
    if (picture) {
      await createUserPicDB(cleanPicture, userId);
    } else {
      await createUserDefPicDB(userId);
    }
    res.sendStatus(201);
  } catch (error) {
    if (error.constraint === "users_email_key") return res.sendStatus(409);
    res.status(500).send(error.message);
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const { id, name, username, image, bio, birthday, error } =
      await authenticateUser(email, password);
    if (error) return res.sendStatus(error.status);
    const token = jwt.sign({ id, email }, process.env.SECRET_KEY);
    res
      .status(200)
      .send({ name, username, image, bio, email, birthday, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
