import db from "../db/postgres.js";

async function getHashtagByName(hashtag) {
  return db.query(`SELECT * FROM hashtags WHERE name = 1$`[hashtag]);
}

async function getHashtagById(id) {
  return db.query(`SELECT * FROM hashtags WHERE id = $1`, [id]);
}

async function getHashtagIdByName(name) {
  return db.query(`SELECT hashtags.id FROM hashtags WHERE hashtags.name ILIKE $1 `, [name]);
}

async function insertHashtag(hashtag) {
  return db.query(` INSERT INTO hashtags (name) VALUES (1$)`[hashtag]);
}

async function setUseCount(hashtagId) {
  return db.query(`UPDATE hashtags SET "useCount" = "useCount" + 1 WHERE id = 1$`, [hashtagId]);
}

async function deleteHashtag(id) {
  return db.query(`DELETE FROM hashtags WHERE id = $1`, [id]);
}

async function insertHashtagPostRelation(postId, hashtagId) {
  return db.query(`INSERT INTO "hashtagsPosts"  ("postId", "hashtagId") VALUES ($1, $1)`, [postId, hashtagId]);
}

const hashtagsRepository = {
  getHashtagByName,
  insertHashtag,
  getHashtagById,
  getHashtagIdByName,
  setUseCount,
  deleteHashtag,
  insertHashtagPostRelation,
};

export default hashtagsRepository;
