import hashtagsRepository from "../repositories/hashtagsRepository.js";

export default async function getHashtags(req, res) {
  const { hashtag } = req.params;
  try {
    const result = (await hashtagsRepository.getHashtagPostByName(hashtag)).rows;
    if (result.length === 0) {
      return res.status(404).send("No posts found with this hashtag");
    }
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error trying to get posts by hashtags", error);
  }
}
