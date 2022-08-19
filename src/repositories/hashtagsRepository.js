import db from "../db/postgres.js";

async function getHashtagByName(hashtag) {
  return db.query(`SELECT * FROM hashtags WHERE name = $1`, [hashtag]);
}

async function insertHashtag(hashtag) {
  return db.query(`INSERT INTO hashtags (name) VALUES ($1) RETURNING id`, [hashtag]);
}

async function setUseCount(hashtagId) {
  return db.query(`UPDATE hashtags SET "useCount" = "useCount" + 1 WHERE id = $1`, [hashtagId]);
}

async function insertHashtagPostRelation(postId, hashtagId) {
  return db.query(`INSERT INTO "hashtagsPosts" ("postId", "hashtagId") VALUES ($1, $2)`, [postId, hashtagId]);
}

async function getHashtagPostByName(hashtag, offset) {
  return db.query(
    `SELECT p.id, json_build_object('id', u.id, 'name', u.username, 'photo', u."pictureURL") AS user, 
  json_build_object('url', p.link, 'legend', p.description, 'title', NULL, 'description', NULL, 'image', NULL) AS link, 
  p."createdAt" 
  FROM posts p 
  JOIN users u ON u.id = p."userId"
  JOIN "hashtagsPosts" r ON r."postId" = p.id
  JOIN hashtags h ON h.id = r."hashtagId"
  WHERE h.name ILIKE $1
  ORDER BY p."createdAt" DESC
  OFFSET $2
  LIMIT 10`,
    [hashtag, offset]
  );
}

async function deleteHashtagPostRelation(postId, hashtagId) {
  return db.query(`DELETE FROM "hashtagsPosts" WHERE "postId" = $1 AND "hashtagId" = $2`, [postId, hashtagId]);
}

async function decrementUseCount(hashtagId) {
  return db.query(`UPDATE hashtags SET "useCount" = "useCount" - 1 WHERE id = $1 RETURNING "useCount"`, [hashtagId]);
}

async function deleteHashtag(hashtagId) {
  return db.query(`DELETE FROM hashtags WHERE id = $1`, [hashtagId]);
}

const hashtagsRepository = {
  getHashtagByName,
  insertHashtag,
  setUseCount,
  insertHashtagPostRelation,
  getHashtagPostByName,
  deleteHashtagPostRelation,
  decrementUseCount,
  deleteHashtag,
};

export default hashtagsRepository;
