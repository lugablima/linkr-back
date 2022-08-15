import db from "../db/postgres.js";

async function getHashtagByName(hashtag) {
  return db.query(`SELECT * FROM hashtags WHERE name = $1`, [hashtag]);
}

// async function getHashtagById(id) {
//   return db.query(`SELECT * FROM hashtags WHERE id = $1`, [id]);
// }

// async function getHashtagIdByName(name) {
//   return db.query(`SELECT hashtags.id FROM hashtags WHERE hashtags.name ILIKE $1 `, [name]);
// }

async function insertHashtag(hashtag) {
  return db.query(`INSERT INTO hashtags (name) VALUES ($1) RETURNING id`, [hashtag]);
}

async function setUseCount(hashtagId) {
  return db.query(`UPDATE hashtags SET "useCount" = "useCount" + 1 WHERE id = $1`, [hashtagId]);
}

async function insertHashtagPostRelation(postId, hashtagId) {
  return db.query(`INSERT INTO "hashtagsPosts" ("postId", "hashtagId") VALUES ($1, $2)`, [postId, hashtagId]);
}

async function getHashtagPostByName(hashtag) {
  return db.query(
    `SELECT p.id, json_build_object('name', u.username, 'photo', u."pictureURL") AS user, 
  json_build_object('url', p.link, 'legend', p.description, 'title', NULL, 'description', NULL, 'image', NULL) AS link, 
  p."createdAt" 
  FROM posts p 
  JOIN users u ON u.id = p."userId"
  JOIN "hashtagsPosts" r ON r."postId" = p.id
  JOIN hashtags h ON h.id = r."hashtagId"
  WHERE h.name ILIKE $1
  ORDER BY p."createdAt" DESC
  LIMIT 20`,
    [hashtag]
  );
}

const hashtagsRepository = {
  getHashtagByName,
  insertHashtag,
  // getHashtagById,
  // getHashtagIdByName,
  setUseCount,
  insertHashtagPostRelation,
  getHashtagPostByName,
};

export default hashtagsRepository;
