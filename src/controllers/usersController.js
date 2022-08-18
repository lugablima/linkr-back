/* eslint-disable import/no-named-as-default */
import usersRepository from "../repositories/usersRepository.js";

async function getUsers(req, res) {
  const { username } = req.params;

  try {
    const { rows: users } = await usersRepository.getUsersByUsername(username);

    res.status(200).send(users);
  } catch (err) {
    console.log("Error getting users:", err.message);
    return res.sendStatus(500);
  }
}

export default getUsers;
