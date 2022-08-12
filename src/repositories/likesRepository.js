import db from "../db/postgres.js";

function getLikesByPostId(postId) {
  return db.query(
    `SELECT l."postId" AS id, json_agg(u.username) AS users, 
        CASE 
            WHEN COUNT(l."postId") > 2 THEN 
                COUNT(l."postId")::INTEGER - 2 
            ELSE 
                '0'::INTEGER 
        END AS "likeCountLeft"  
    FROM "likedPosts" l
    JOIN users u ON u.id = l."userId" 
    WHERE "postId" = $1
    GROUP BY l."postId"`,
    [postId]
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
