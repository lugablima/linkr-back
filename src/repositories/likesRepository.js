import db from "../db/postgres.js";

function getLikesByPostId(userId, postId) {
  return db.query(
    `SELECT l."postId" AS id, json_agg(u.username) AS users,                  
    COUNT(l."postId")::INTEGER AS "likesCount", 
      CASE 
        WHEN EXISTS(SELECT * FROM "likedPosts" l WHERE l."userId" = $1 AND l."postId" = $2) THEN
          'true'::BOOLEAN
        ELSE
          'false'::BOOLEAN
      END AS "likedByUser"
    FROM "likedPosts" l
    JOIN users u ON u.id = l."userId" 
    WHERE "postId" = $2
    GROUP BY l."postId"`,
    [userId, postId]
  );
}

function insertLike(userId, postId) {
  return db.query(`INSERT INTO "likedPosts" ("userId", "postId") VALUES ($1, $2)`, [userId, postId]);
}

function deleteLike(userId, postId) {
  return db.query(`DELETE FROM "likedPosts" WHERE "userId" = $1 AND "postId" = $2`, [userId, postId]);
}

export default {
  getLikesByPostId,
  insertLike,
  deleteLike,
};
