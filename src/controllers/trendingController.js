import trendingRepository from "../repositories/trendingRepository.js";

export default async function getTrending(req, res) {
  try {
    const result = await trendingRepository.getTrendingHashtags();
    if (result.rowCount === 0) {
      return res.status(404).send("No hashtags found.");
    }
    return res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error while trying to get trending hashtags", error);
  }
}
