import db from "../db/postgres.js";

async function getAllPosts() {
  return db.query(`SELECT * FROM users WHERE email = $1`);
}

async function insertPost(userId, link, description) {
  return db.query(`INSERT INTO posts ("userId", link, description) VALUES ($1, $2, $3)`, [userId, link, description]);
}

export default {
  getAllPosts,
  insertPost,
};
