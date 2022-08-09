import usersRepository from "../repositories/authRepository";
import sessionsRepository from "../repositories/sessionsRepository.js";

export async function login(req, res) {

    const { email, password }  = req.body;
    const { rows: users } = await usersRepository.getUserByEmail(email);

    const [user] = users;

    if (!user) return res.status(401).send("unauthorized");

    if (bcrypt.compareSync(password, users.password)) {
        const data = {
            id: users.id,
            name: users.name
        }
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(data, secretKey);

        await sessionsRepository.createSession(token, user.id);
        return res.send(token);

    }

    return res.status(401);
}