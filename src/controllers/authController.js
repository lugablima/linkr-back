import authRepository from "../repositories/authRepository.js";

export default async function createUser(req, res) {
  const { email, password, username, pictureURL } = req.body;

  try {
    const emailRegistered = authRepository.getUserByEmail(email);

    if (emailRegistered.rows.length > 0) {
      return res.status(409).send("Email already registered");
    }

    await authRepository.createUser(email, password, username, pictureURL);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
