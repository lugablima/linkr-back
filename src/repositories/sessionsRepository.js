import db from "../db/postgres.js";

async function createSession(userId) {
  return db.query(
    `
   INSERT INTO sessions ("userId") VALUES ($1)`,
    [userId]
  );
}

async function getSessionByToken(token) {
  return db.query(`SELECT *  FROM sessions WHERE token = $1`, [token]);
}

const sessionsRepository = {
  createSession,
  getSessionByToken,
};

export default sessionsRepository;
