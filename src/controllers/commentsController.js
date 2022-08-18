import postsRepository from "../repositories/postsRepository.js";
import commentsRepository from "../repositories/commentsRepository.js";

export async function getComments(req, res) {
  const { userId } = res.locals;
  const postId = parseInt(req.params.postId);

  if (!postId) return res.sendStatus(404);

  try {
    const { rowCount: post } = await postsRepository.getPostById(postId);

    if (!post) return res.sendStatus(404);

    const {
      rows: [comments],
    } = await commentsRepository.getCommentsByPostId(userId, postId);

    res.status(200).send(comments);
  } catch (err) {
    console.log("Error getting the comments of the post:", err.message);
    res.sendStatus(500);
  }
}

export async function commentPost(req, res) {
  const { userId } = res.locals;
  const { postId, comment } = req.body;

  try {
    const { rowCount: post } = await postsRepository.getPostById(postId);

    if (!post) return res.sendStatus(404);

    await commentsRepository.insertComment(userId, postId, comment);

    res.sendStatus(201);
  } catch (err) {
    console.log("Error when commenting the post:", err.message);
    res.sendStatus(500);
  }
}
