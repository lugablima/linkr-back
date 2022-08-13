import db from "../db/postgres.js";

async function getAllPosts() {
  return db.query(
    `SELECT p.id, json_build_object('name', u.username, 'photo', u."pictureURL") AS user, 
    json_build_object('url', p.link, 'legend', p.description, 'title', NULL, 'description', NULL, 'image', NULL) AS link, 
    p."createdAt" 
    FROM posts p 
    JOIN users u ON u.id = p."userId"
    ORDER BY p."createdAt" DESC
    LIMIT 20`
  );
}

function getPostById(postId) {
  return db.query(`SELECT * FROM posts WHERE id = $1`, [postId]);
}

async function insertPost(userId, link, description) {
  return db.query(`INSERT INTO posts ("userId", link, description) VALUES ($1, $2, $3)`, [userId, link, description]);
}

export default {
  getAllPosts,
  getPostById,
  insertPost,
};
