import jwt from "jsonwebtoken";
import { checkUserIdDB } from "../repositories/auth.repository.js";

export default async function authOptionalValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  try {
    if (token) {
      if (!authorization) return res.sendStatus(401);
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      const { rowCount } = await checkUserIdDB(id);
      if (!rowCount) return res.sendStatus(401);
      res.locals.userId = id;
    }
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError")
      return res.status(401).send("invalid signature");
    res.status(500).send(error);
  }
}
