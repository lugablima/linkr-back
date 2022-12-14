import followsRepository from "../repositories/followsRepository.js";

export async function follow(req, res) {
  const id = parseInt(req.params.id);
  const { userId } = res.locals;

  try {
    const { rowCount: isFollowing } = await followsRepository.checkFollowing(userId, id);
    if (isFollowing) {
      return res.status(409).send("You're already following this user");
    }
    await followsRepository.follow(userId, id);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error while trying to follow", err);
  }
}

export async function unfollow(req, res) {
  const id = parseInt(req.params.id);
  const { userId } = res.locals;

  try {
    const { rowCount: isFollowing } = await followsRepository.checkFollowing(userId, id);
    if (!isFollowing) {
      return res.status(409).send("You're not following this user");
    }
    await followsRepository.unfollow(userId, id);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error while trying to unfollow", err);
  }
}

export async function checkFollowing(req, res) {
  const id = parseInt(req.params.id);
  const { userId } = res.locals;

  try {
    const { rowCount: isFollowing } = await followsRepository.checkFollowing(userId, id);
    if (!isFollowing) {
      return res.status(200).send(false);
    }
    return res.status(200).send(true);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error while trying to check following", err);
  }
}

export async function checkUserFollowsSomeone(req, res) {
  const { userId } = res.locals;

  try {
    const { rowCount: follows } = await followsRepository.getFollowById(userId);
    if (!follows) {
      return res.status(200).send(false);
    }
    return res.status(200).send(true);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error while trying to check if user follows someone", err);
  }
}
