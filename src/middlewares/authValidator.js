import "../setup.js";
import jwt from "jsonwebtoken";
import authRepository from "../repositories/authRepository.js";

async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("You must send a token before");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    const { rowCount: user } = await authRepository.getUserById(data.userId);

    if (!user) return res.status(401).send("!user");

    res.locals.userId = data.userId;

    next();
  } catch (err) {
    res.sendStatus(401);
  }
}

export default validateToken;
