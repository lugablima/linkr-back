import "../setup.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import authRepository from "../repositories/authRepository.js";

const TIME_15_DAYS = 60 * 60 * 24 * 15;

export async function createUser(req, res) {
  const { email, password, username, pictureURL } = req.body;

  try {
    const { rowCount: users } = await authRepository.getUserByEmail(email);

    if (users) {
      return res.status(409).send("Email already registered");
    }

    const { rowCount: user } = await authRepository.getUserByUsername(username);

    if (user) {
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

  try {
    const { rows: users } = await authRepository.getUserByEmail(email);

    const [user] = users;

    if (user && bcrypt.compareSync(password, user.password)) {
      const data = {
        userId: user.id,
      };

      const secretKey = process.env.JWT_SECRET;
      const token = jwt.sign(data, secretKey, { expiresIn: TIME_15_DAYS });

      res.status(200).send({ name: user.username, photo: user.pictureURL, token });
    } else res.sendStatus(401);
  } catch (err) {
    console.log("Error logging in user:", err.message);
    res.sendStatus(500);
  }
}
