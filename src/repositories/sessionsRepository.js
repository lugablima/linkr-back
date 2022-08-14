import db from "../db/postgres.js";

async function createSession(userId) {
  return db.query(
    `
   INSERT INTO sessions ("userId") VALUES ($1)`,
    [userId]
  );
}

async function getSessionById(sessionId) {
  return db.query(`SELECT * FROM sessions WHERE id = $1`, [sessionId]);
}

const sessionsRepository = {
  createSession,
  getSessionById,
};

export default sessionsRepository;
