import bcrypt from "bcrypt";

import db from "../db/postgres.js";

async function getUserByEmail(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function createUser(email, password, username, pictureURL) {
  const SALT = 10;
  const passwordHash = bcrypt.hashSync(password, SALT);

  return db.query(`INSERT INTO users (email, password, username, pictureURL) VALUES ($1, $2, $3, $4)`, [
    (email, passwordHash, username, pictureURL),
  ]);
}

const authRepository = { getUserByEmail, createUser };

export default authRepository;
