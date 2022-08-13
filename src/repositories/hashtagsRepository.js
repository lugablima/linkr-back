import db from "../db/postgres.js";

async function getHashtagsByName(name) {
  return db.query(`SELECT * FROM hashtags WHERE name = 1$`[name]);
}

async function insertHashtags(hashtag) {
  return db.query(` INSERT INTO hashtags (name) VALUES (1$)`[hashtag]);
}

async function getHashtagsById(id) {
  return db.query(`SELECT * FROM hashtags WHERE id = $1`, [id]);
}

async function setUseCount(id) {
  return db.query(`UPDATE hashtags SET "useCount" = "useCount" + 1 WHERE id = 1$`, [id]);
}

async function deleteHashtag(id) {
  return db.query(`DELETE FROM hashtags WHERE id = $1`, [id]);
}

// async function getTrending(){

// }

const hashtagsRepository = { getHashtagsByName, insertHashtags, getHashtagsById, setUseCount, deleteHashtag };

export default hashtagsRepository;
