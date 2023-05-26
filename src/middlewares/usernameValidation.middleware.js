import { checkUsernameDB } from "../repositories/auth.repository.js";

export default async function usernameValidation(req, res, next) {
  const username = req.params.username;
  try {
    const result = await checkUsernameDB(username);
    if (!result.rowCount) return res.sendStatus(404);
    res.locals.visitorUserId = result.rows[0].id;

    next();
  } catch (error) {
    console.log(error)
    if (error.name === "JsonWebTokenError")
      return res.status(401).send("invalid signature");
    res.status(500).send(error);
  }
}
