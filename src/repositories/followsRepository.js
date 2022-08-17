import db from "../db/postgres.js";

async function follow(userId, following) {
  return db.query(`INSERT INTO follows (follower, following) VALUES ($1, $2)`, [userId, following]);
}

async function unfollow(userId, following) {
  return db.query(`DELETE FROM follows WHERE follower = 1$ AND following = $2`, [userId, following]);
}

async function checkFollowing(userId, following) {
  return db.query(`SELECT * FROM follows WHERE follower = $1 AND following = $2`, [userId, following]);
}

const followsRepository = { follow, unfollow, checkFollowing };

export default followsRepository;
