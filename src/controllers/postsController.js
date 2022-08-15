import urlMetadata from "url-metadata";
import hashtagsRepository from "../repositories/hashtagsRepository.js";
import postsRepository from "../repositories/postsRepository.js";

export async function getPosts(req, res) {
  try {
    const { rows: posts } = await postsRepository.getAllPosts();

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

export async function createPost(req, res) {
  const { userId } = res.locals;
  const { link } = req.body;
  let { description } = req.body;

  description = description.trim();

  // Falta fazer a sanitização do description com a lib string-strip-html
  // Falta também identificar se a description possui uma hashtag ou mais de uma
  // Se tiver, precisa verificar se cada hashtag já existe no banco de dados
  // Se existir, precisa somar um na contagem de usos da hashtag e associar ela ao id do post
  // Se não existir, precisa criar a hashtag no banco e associar ela ao id do post

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

        return "Ok";
      })
    );

    res.sendStatus(201);
  } catch (err) {
    console.log("Error creating post:", err.message);
    res.sendStatus(500);
  }
}
