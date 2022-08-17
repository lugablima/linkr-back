import db from "../db/postgres.js";

async function getAllPosts() {
  return db.query(
    `SELECT p.id, json_build_object('id', u.id, 'name', u.username, 'photo', u."pictureURL") AS user, 
    json_build_object('url', p.link, 'legend', p.description, 'title', NULL, 'description', NULL, 'image', NULL) AS link, 
    p."createdAt" 
    FROM posts p 
    JOIN users u ON u.id = p."userId"
    ORDER BY p."createdAt" DESC
    LIMIT 20`
  );
}

async function getAllUserPosts(userId) {
  return db.query(
    `SELECT p.id, json_build_object('id', u.id, 'name', u.username, 'photo', u."pictureURL") AS user, 
    json_build_object('url', p.link, 'legend', p.description, 'title', NULL, 'description', NULL, 'image', NULL) AS link, 
    p."createdAt" 
    FROM posts p 
    JOIN users u ON u.id = p."userId"
    WHERE u.id = $1
    ORDER BY p."createdAt" DESC
    LIMIT 20`,
    [userId]
  );
}

async function getPostById(postId) {
  return db.query(`SELECT * FROM posts WHERE id = $1`, [postId]);
}

async function insertPost(userId, link, description) {
  return db.query(`INSERT INTO posts ("userId", link, description) VALUES ($1, $2, $3) RETURNING id`, [userId, link, description]);
}

async function deletePostById(postId) {
  return db.query(`DELETE FROM posts WHERE id = $1`, [postId]);
}

async function deleteLikedPost(postId) {
  return db.query(`DELETE FROM "likedPosts" WHERE "postId" = $1`, [postId]);
}

async function updatePost(postId, userId, link, description) {
  return db.query(`UPDATE posts SET link = $1, description = $2 WHERE id = $3 AND "userId" = $4 RETURNING *`, [
    link,
    description,
    postId,
    userId,
  ]);
}

export default {
  getAllPosts,
  getAllUserPosts,
  getPostById,
  insertPost,
  deletePostById,
  deleteLikedPost,
  updatePost,
};
