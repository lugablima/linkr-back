import postsRepository from "../repositories/postsRepository.js";

export async function getPosts(req, res) {
  try {
    const { rowCount: users } = await postsRepository.getUserByEmail(email);

    if (users) {
      return res.status(409).send("Email already registered");
    }

    const { rowCount: user } = await postsRepository.getUserByUsername(username);

    if (user) {
      return res.status(409).send("Username already registered");
    }

    await postsRepository.createUser(email, password, username, pictureURL);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server crashed while trying to create user", error);
  }
}

export async function createPost(req, res) {
  const { id: userId } = res.locals.user;
  const { link } = req.body;
  let { description } = req.body;

  description = description.trim();

  // Falta fazer a sanitização do description com a lib string-strip-html

  if (!description) description = null;

  try {
    await postsRepository.insertPost(userId, link, description);

    res.sendStatus(201);
  } catch (err) {
    console.log("Error creating post: ", err.message);
    res.sendStatus(500);
  }
}
