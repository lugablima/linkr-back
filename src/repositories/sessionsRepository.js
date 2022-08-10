import db from "../db/postgres.js";

async function createSession(token, userId) {
  return db.query(`
   INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, userId]);
}

async function getSessionByToken(token) {
  return db.query(`SELECT *  FROM sessions WHERE token = $1`, [token]);
}

const sessionsRepository = {
  createSession,
  getSessionByToken
}

export default sessionsRepository;