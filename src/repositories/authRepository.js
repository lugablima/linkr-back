import bcrypt from "bcrypt";
import db from "../db/postgres.js";

async function getUserByEmail(email) {
    return db.query("SELECT email FROM users WHERE email = $1", [email])
}
 async function createUser(name, email, password) {
    const SALT = process.env.SALT
    const passwordHash = bcrypt.hashSync(password, SALT);

    return db.query(`INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)`,
    [name, email, passwordHash])
 }

 const usersRepository = {
    getUserByEmail,
    createUser
 }

 export default usersRepository;
