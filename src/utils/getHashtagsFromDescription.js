export default function getHashtagsFromDescription(description) {
  let hashtags;

  const regexp = /#\S+/g;
  hashtags = description.match(regexp)?.map((hashtag) => hashtag.replace("#", "").toLowerCase());

  if (!hashtags) hashtags = [];

  return hashtags;
}
