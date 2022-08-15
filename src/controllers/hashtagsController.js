import urlMetadata from "url-metadata";
import hashtagsRepository from "../repositories/hashtagsRepository.js";

export default async function getHashtags(req, res) {
  const { hashtag } = req.params;
  try {
    const { rows: hashtags } = await hashtagsRepository.getHashtagPostByName(hashtag);

    if (hashtags.length === 0) {
      return res.status(404).send("No posts found with this hashtag");
    }

    const newHashtags = await Promise.all(
      hashtags.map(async (el) => {
        const { title, image, description } = await urlMetadata(el.link.url);

        const newHashtag = { ...el };

        newHashtag.link.title = title;
        newHashtag.link.image = image;
        newHashtag.link.description = description;

        return newHashtag;
      })
    );

    res.status(200).send(newHashtags);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error trying to get posts by hashtags", error);
  }
}