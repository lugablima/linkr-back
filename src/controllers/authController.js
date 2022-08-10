import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authRepository from "../repositories/authRepository.js";
import sessionsRepository from "../repositories/sessionsRepository.js";

export async function createUser(req, res) {
  const { email, password, username, pictureURL } = req.body;

  try {
    const { rowCount:users }   = await authRepository.getUserByEmail(email);
    console.log(users)
    if ( users  ) {
      return res.status(409).send("Email already registered");
    }

    const { rowCount: user } = await authRepository.getUserByUsername(username);
    console.log(user)
    if ( user ) {
      return res.status(409).send("Username already registered");
    }

    await authRepository.createUser(email, password, username, pictureURL);
    res.sendStatus(201);
  } catch (error) {

    console.log(error);
    return res.status(500).send("Server crashed while trying to create user", error);

  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  const { rows: users } = await authRepository.getUserByEmail(email);


  const [user] = users;

  if (!user) return res.status(401).send("unauthorized");

  if (bcrypt.compareSync(password, users.password)) {
    const data = {
      id: users.id,
      name: users.name,
    };
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(data, secretKey);

    await sessionsRepository.createSession(token, user.id);
    return res.send(token);
  }

  return res.status(401);
}
