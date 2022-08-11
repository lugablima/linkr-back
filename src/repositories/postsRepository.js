import db from "../db/postgres.js";

async function getAllPosts() {
  return db.query(
    `SELECT p.id, u.username AS user, u."pictureURL" AS "userPhoto", p.link, p.description, p."createdAt" 
    FROM posts p 
    JOIN users u ON u.id = p."userId"
    ORDER BY p."createdAt" DESC
    LIMIT 20`
  );
}

async function insertPost(userId, link, description) {
  return db.query(`INSERT INTO posts ("userId", link, description) VALUES ($1, $2, $3)`, [userId, link, description]);
}

export default {
  getAllPosts,
  insertPost,
};
