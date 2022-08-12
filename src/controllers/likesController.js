import likesRepository from "../repositories/likesRepository.js";
import postsRepository from "../repositories/postsRepository.js";

export async function getLikes(req, res) {
  const { userId } = res.locals;
  const postId = parseInt(req.params.postId);

  if (!postId) return res.sendStatus(404);

  try {
    const { rowCount: post } = await postsRepository.getPostById(postId);

    if (!post) return res.sendStatus(404);

    const { rows: likes } = await likesRepository.getLikesByPostId(userId, postId);

    res.status(200).send(likes);
  } catch (err) {
    console.log("Error getting the likes of the post:", err.message);
    res.sendStatus(500);
  }
}

export async function likePost(req, res) {
  const { userId } = res.locals;
  const { postId } = req.body;

  try {
    const { rowCount: post } = await postsRepository.getPostById(postId);

    if (!post) return res.sendStatus(404);

    await likesRepository.insertLike(userId, postId);

    res.sendStatus(201);
  } catch (err) {
    console.log("Error when liking the post:", err.message);
    res.sendStatus(500);
  }
}

export async function dislikePost(req, res) {
  const { userId } = res.locals;
  const postId = parseInt(req.params.postId);

  if (!postId) return res.sendStatus(404);

  try {
    const { rowCount: post } = await postsRepository.getPostById(postId);

    if (!post) return res.sendStatus(404);

    await likesRepository.deleteLike(userId, postId);

    res.sendStatus(200);
  } catch (err) {
    console.log("Error unliking the post:", err.message);
    res.sendStatus(500);
  }
}
