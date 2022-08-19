import urlMetadata from "url-metadata";
import hashtagsRepository from "../repositories/hashtagsRepository.js";
import postsRepository from "../repositories/postsRepository.js";
import getHashtagsFromDescription from "../utils/getHashtagsFromDescription.js";

export async function getNewsPosts(req, res) {
  const { userId } = res.locals;
  try {
    const { rows: posts } = await postsRepository.getAllNewsPosts(userId);

    const newPosts = await Promise.all(
      posts.map(async (post) => {
        const { title, image, description } = await urlMetadata(post.link.url);

        const newPost = { ...post };

        newPost.link.title = title;
        newPost.link.image = image;
        newPost.link.description = description;

        return newPost;
      })
    );

    res.status(200).send(newPosts);
  } catch (err) {
    console.log("Error getting news posts:", err.message);
    return res.sendStatus(500);
  }
}

export async function getPosts(req, res) {
  const { userId } = res.locals;
  try {
    const offset = parseInt(req.params.offset);

    if (!offset && offset !== 0) return res.sendStatus(422);

    const { rows: posts } = await postsRepository.getAllPosts(userId, offset);

    const newPosts = await Promise.all(
      posts.map(async (post) => {
        const { title, image, description } = await urlMetadata(post.link.url);

        const newPost = { ...post };

        newPost.link.title = title;
        newPost.link.image = image;
        newPost.link.description = description;

        return newPost;
      })
    );

    res.status(200).send(newPosts);
  } catch (err) {
    console.log("Error getting posts:", err.message);
    return res.sendStatus(500);
  }
}

export async function getUserPosts(req, res) {
  try {
    const offset = parseInt(req.params.offset);

    if (!offset && offset !== 0) return res.sendStatus(422);

    const userId = parseInt(req.params.userId);

    if (!userId) return res.sendStatus(404);

    const { rows: posts } = await postsRepository.getAllUserPosts(userId, offset);

    const newPosts = await Promise.all(
      posts.map(async (post) => {
        const { title, image, description } = await urlMetadata(post.link.url);

        const newPost = { ...post };

        newPost.link.title = title;
        newPost.link.image = image;
        newPost.link.description = description;

        return newPost;
      })
    );

    res.status(200).send(newPosts);
  } catch (err) {
    console.log("Error getting posts from a user:", err.message);
    return res.sendStatus(500);
  }
}

export async function createPost(req, res) {
  const { userId } = res.locals;
  const { link } = req.body;
  let { description } = req.body;

  description = description.trim();

  if (!description) description = null;

  let hashtags;

  if (description) {
    const regexp = /#\S+/g;
    hashtags = description.match(regexp)?.map((hashtag) => hashtag.replace("#", "").toLowerCase());
  }

  if (!hashtags) hashtags = [];

  try {
    const {
      rows: [insertedPost],
    } = await postsRepository.insertPost(userId, link, description);

    await Promise.all(
      hashtags.map(async (hashtag) => {
        const {
          rows: [hashtagExist],
        } = await hashtagsRepository.getHashtagByName(hashtag);

        if (hashtagExist) {
          await hashtagsRepository.setUseCount(hashtagExist.id);
          await hashtagsRepository.insertHashtagPostRelation(insertedPost.id, hashtagExist.id);
        } else {
          const {
            rows: [insertedHashtag],
          } = await hashtagsRepository.insertHashtag(hashtag);
          await hashtagsRepository.insertHashtagPostRelation(insertedPost.id, insertedHashtag.id);
        }
      })
    );

    res.sendStatus(201);
  } catch (err) {
    console.log("Error creating post:", err.message);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  const { userId } = res.locals;
  const postId = parseInt(req.params.postId);

  if (!postId) return res.sendStatus(404);

  try {
    const {
      rows: [post],
    } = await postsRepository.getPostById(postId);

    if (!post) return res.sendStatus(404);

    if (post.userId !== userId) return res.sendStatus(401);

    if (post.description) {
      const oldHashtags = getHashtagsFromDescription(post.description);

      await Promise.all(
        oldHashtags.map(async (hashtag) => {
          const {
            rows: [storedHashtag],
          } = await hashtagsRepository.getHashtagByName(hashtag);

          await hashtagsRepository.deleteHashtagPostRelation(postId, storedHashtag.id);

          const {
            rows: [returningValue],
          } = await hashtagsRepository.decrementUseCount(storedHashtag.id);

          if (!returningValue.useCount) {
            await hashtagsRepository.deleteHashtag(storedHashtag.id);
          }
        })
      );
    }

    await postsRepository.deleteLikedPost(postId);

    await postsRepository.deletePostById(postId);

    res.sendStatus(200);
  } catch (err) {
    console.log("Error deleting post:", err.message);
    res.sendStatus(500);
  }
}

export async function updatePost(req, res) {
  const { userId } = res.locals;
  const postId = parseInt(req.params.postId);
  const { link } = req.body;
  let { description } = req.body;

  if (!postId) return res.sendStatus(404);

  try {
    const {
      rows: [post],
    } = await postsRepository.getPostById(postId);

    if (!post) return res.sendStatus(404);

    if (post.userId !== userId) return res.sendStatus(401);

    if (post.description) {
      const oldHashtags = getHashtagsFromDescription(post.description);

      await Promise.all(
        oldHashtags.map(async (hashtag) => {
          const {
            rows: [storedHashtag],
          } = await hashtagsRepository.getHashtagByName(hashtag);

          await hashtagsRepository.deleteHashtagPostRelation(postId, storedHashtag.id);

          const {
            rows: [returningValue],
          } = await hashtagsRepository.decrementUseCount(storedHashtag.id);

          if (!returningValue.useCount) {
            await hashtagsRepository.deleteHashtag(storedHashtag.id);
          }
        })
      );
    }

    description = description.trim();
    let hashtags;

    if (!description) description = null;
    else {
      hashtags = getHashtagsFromDescription(description);
    }

    const {
      rows: [updatedPost],
    } = await postsRepository.updatePost(postId, userId, link, description);

    await Promise.all(
      hashtags.map(async (hashtag) => {
        const {
          rows: [hashtagExist],
        } = await hashtagsRepository.getHashtagByName(hashtag);

        if (hashtagExist) {
          await hashtagsRepository.setUseCount(hashtagExist.id);
          await hashtagsRepository.insertHashtagPostRelation(updatedPost.id, hashtagExist.id);
        } else {
          const {
            rows: [insertedHashtag],
          } = await hashtagsRepository.insertHashtag(hashtag);
          await hashtagsRepository.insertHashtagPostRelation(updatedPost.id, insertedHashtag.id);
        }

        return "Ok";
      })
    );

    res.status(201).send(updatedPost);
  } catch (err) {
    console.log("Error creating post:", err.message);
    res.sendStatus(500);
  }
}
