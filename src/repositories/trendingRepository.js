import db from "../db/postgres.js";

async function getTrendingHashtags() {
  return db.query(
    `SELECT id, name, "useCount" 
  FROM hashtags 
  ORDER BY "useCount" DESC 
  LIMIT 10`
  );
}

export default {
  getTrendingHashtags,
};
