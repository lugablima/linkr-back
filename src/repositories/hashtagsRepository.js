import db from "../db/postgres.js";

async function insertHashtags(hashtag) {
  return db.query(` INSERT INTO hashtags (name) VALUES (1$)`[hashtag]);
}

const hashtagsRepository = insertHashtags;

export default hashtagsRepository;
