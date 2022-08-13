import hashtagsRepository from "../repositories/hashtagsRepository.js";

export default async function filterHashtagsByPosts(req, res) {
  try {
    const { postDescription } = res.locals;

    const hashtags = postDescription.split("").filter((d) => d.startsWith("#"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error filtering hashtags", error);
  }
}
