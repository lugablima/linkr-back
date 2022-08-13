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
  const { postId } = res.locals.id;
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
    hashtags = description.match(regexp);
  }
  if (hashtags) {
    hashtags = hashtags.map((hashtag) => {
      const hashtagName = hashtag.substring(1);
      return hashtagName.toLowerCase();
    });
  } else {
    hashtags = [];
  }

  try {
    await Promise.all(
      hashtags.map(async (hashtag) => {
        const hashtagExist = (await hashtagsRepository.getHashtagByName(hashtag)).rows[0];

        if (hashtagExist) {
          const hashtagId = await hashtagsRepository.getHashtagIdByName(hashtagExist);
          await hashtagsRepository.setUseCount(hashtagId).rows[0];
        } else {
          const newHashtag = (await hashtagsRepository.insertHashtag(hashtag)).rows[0];
          await hashtagsRepository.insertHashtagPostRelation(postId, newHashtag.id);
        }
      })
    );

    await postsRepository.insertPost(userId, link, description);

    res.sendStatus(201);
  } catch (err) {
    console.log("Error creating post:", err.message);
    res.sendStatus(500);
  }
}
