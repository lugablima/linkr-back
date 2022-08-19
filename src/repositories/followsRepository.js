import db from "../db/postgres.js";

async function follow(userId, id) {
  return db.query(`INSERT INTO followers ("followerId", "followingId") VALUES ($1, $2)`, [userId, id]);
}

async function unfollow(userId, id) {
  return db.query(`DELETE FROM followers WHERE "followerId" = $1 AND "followingId" = $2`, [userId, id]);
}

async function checkFollowing(userId, id) {
  return db.query(`SELECT * FROM followers WHERE "followerId" = $1 AND "followingId" = $2`, [userId, id]);
}

async function getFollowById(userId) {
  return db.query(`SELECT * FROM followers WHERE "followedId" = $1`, [userId]);
}

const followsRepository = { follow, unfollow, checkFollowing, getFollowById };

export default followsRepository;
