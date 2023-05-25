import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  try {
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function signin(req, res) {
  try {
    res.status(200).send("Token-Placeholder");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
