import postsRepository from "../repositories/postsRepository.js";

export async function getPosts(req, res) {
  try {
    const { rows: posts } = await postsRepository.getAllPosts();

    res.status(200).send(posts);
  } catch (err) {
    console.log("Error getting posts: ", err.message);
    return res.sendStatus(500);
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
