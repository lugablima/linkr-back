import db from "../db/postgres.js";

async function getTrending() {
  return db.query(`SELECT * FROM hashtags.name, SUM(hashtags."useCount") as "useCount" ORDER By "useCount" DESC LIMIT 10 `);
}

const trendingRepository = getTrending;

export default trendingRepository;
