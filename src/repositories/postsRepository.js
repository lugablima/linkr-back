import db from "../db/postgres.js";

async function getAllNewsPosts(userId) {
  return db.query(
    `SELECT p.id, json_build_object('id', u.id, 'name', u.username, 'photo', u."pictureURL") AS user, 
    json_build_object('url', p.link, 'legend', p.description, 'title', NULL, 'description', NULL, 'image', NULL) AS link, 
    p."createdAt" 
    FROM posts p 
    JOIN users u ON u.id = p."userId"
    LEFT JOIN followers f ON f."followingId" = u.id AND f."followerId" = $1 
    WHERE p."userId" = f."followingId", now() > p."createdAt" AND now() - interval '20 seconds' < p."createdAt"  
    ORDER BY p."createdAt" DESC`,
    [userId]
  );
}

async function getAllPosts(userId, offset) {
  return db.query(
    `SELECT p.id, json_build_object('id', u.id, 'name', u.username, 'photo', u."pictureURL") AS user,
    json_build_object('url', p.link, 'legend', p.description, 'title', NULL, 'description', NULL, 'image', NULL) AS link, 
    p."createdAt"
    FROM posts p 
    JOIN users u ON u.id = p."userId"
    LEFT JOIN followers f ON f."followingId" = u.id AND f."followerId" = $1
    WHERE p."userId" = f."followingId" 
    ORDER BY p."createdAt" DESC
    OFFSET $2
    LIMIT 10`,
    [userId, offset]
  );
}

async function getAllUserPosts(userId, offset) {
  return db.query(
    `SELECT p.id, json_build_object('id', u.id, 'name', u.username, 'photo', u."pictureURL") AS user, 
    json_build_object('url', p.link, 'legend', p.description, 'title', NULL, 'description', NULL, 'image', NULL) AS link, 
    p."createdAt" 
    FROM posts p 
    JOIN users u ON u.id = p."userId"
    WHERE u.id = $1
    ORDER BY p."createdAt" DESC
    OFFSET $2
    LIMIT 10`,
    [userId, offset]
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
  getAllNewsPosts,
  getAllPosts,
  getAllUserPosts,
  getPostById,
  insertPost,
  deletePostById,
  deleteLikedPost,
  updatePost,
};
