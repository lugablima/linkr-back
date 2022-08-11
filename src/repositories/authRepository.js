import bcrypt from "bcryptjs";

import db from "../db/postgres.js";

async function getUserByEmail(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function getUserById(userId) {
  return db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
}

async function getUserByUsername(username) {
  return db.query(`SELECT * FROM users WHERE username ILIKE $1`, [username]);
}

async function createUser(email, password, username, pictureURL) {
  const SALT = 10;
  const passwordHash = bcrypt.hashSync(password, SALT);

  return db.query(
    `INSERT INTO users (email, password, username, "pictureURL") 
  VALUES ($1, $2, $3, $4)`,
    [email, passwordHash, username, pictureURL]
  );
}

const authRepository = { getUserByEmail, getUserById, createUser, getUserByUsername };

export default authRepository;
