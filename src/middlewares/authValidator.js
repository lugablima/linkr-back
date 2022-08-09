import usersRepository from "../repositories/authRepository.js";
import sessionsRepository  from "../repositories/sessionsRepository.js";


export async function validateToken (req, res, next) {

    const authorization = req.headers.authorization 
    const token = authorization?.replace("Bearer", "");

    if(!token) return res.status(401).send("You must send a token before");

    try {
        const { rows: sessions } = await sessionsRepository.getSessionByToken(token);
        const [session] = sessions;
        
        if(!session) return res.status(401).send("You have no session");

        const { rows:users } = await usersRepository.getUserById(session.userId);
        const [ user ] = users;
        if(!user) return res.status(401).send("User not found");
        res.locals.user = user;
        next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}