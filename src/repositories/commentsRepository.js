import db from "../db/postgres.js";

function getCommentsByPostId(userId, postId) {
  return db.query(
    `SELECT c."postId" AS id, json_agg(json_build_object('id', u.id, 'name', u.username, 'photo', u."pictureURL", 'comment', c.comment, 'date', c."createdAt", 'followedByUser', 
    CASE 
      WHEN f."followerId" = $1 AND f."followingId" = u.id THEN
        'true'::BOOLEAN
      ELSE
        'false'::BOOLEAN
    END) ORDER BY c."createdAt" ASC) AS comments,                  
    COUNT(c."postId")::INTEGER AS "commentsCount" 
    FROM comments c
    JOIN users u ON u.id = c."userId"
    LEFT JOIN followers f ON u.id = f."followingId" 
    WHERE c."postId" = $2
    GROUP BY c."postId"`,
    [userId, postId]
  );
}

function insertComment(userId, postId, comment) {
  return db.query(`INSERT INTO comments ("postId", "userId", comment) VALUES ($1, $2, $3)`, [postId, userId, comment]);
}

export default {
  getCommentsByPostId,
  insertComment,
};
