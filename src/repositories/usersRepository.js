import db from "../db/postgres.js";

async function getUsersByUsername(username) {
  return db.query(`SELECT id, username, "pictureURL" FROM users WHERE username ILIKE $1 ORDER BY id ASC`, [`${username}%`]);
}

export default {
  getUsersByUsername,
};
