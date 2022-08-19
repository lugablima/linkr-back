import db from "../db/postgres.js";

async function getUsersByUsername(userId, username) {
  return db.query(
    ` SELECT u.id, u.username, u."pictureURL",
    CASE
   WHEN (f."followerId" = $1 AND u.username ILIKE $2) THEN 
     'true'::BOOLEAN
     ELSE
     'false'::BOOLEAN
     END AS "followedByUser"
   FROM users u
   LEFT JOIN followers f ON u.id = f."followingId"
   WHERE u.username ILIKE $2 ORDER BY u.id DESC`,
    [userId, `${username}%`]
  );
}

export default {
  getUsersByUsername,
};
