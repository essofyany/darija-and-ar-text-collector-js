import Twitter from "twitter";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const {
        body: { q, lang, count },
      } = req;
      // Process a POST request
      const client = new Twitter({
        consumer_key: "lBheSn1mVj7DIlqfEYQfoGh6Z",
        consumer_secret: "JrCCWKnK3uiwMRxip8gkIXRomSSYxK4tkNQr4bGGeMLD1fNPel",
        access_token_key: "1311288548100894721-pRsBl7ZZny4OaEonO403lalMb2Wdxa",
        access_token_secret: "YpblrM7sBa8yiAIR294JjSsr0Q0eJxoRoONh3LydNUWKv",
      });
      const params = {
        q,
        count,
        lang,
      };
      console.log("params", params);

      const data = await client.get("search/tweets.json", params);
      const newData = data.statuses.map((item) => {
        return {
          tweetId: item.id,
          author: item.user.screen_name,
          text: item.text,
          createdAt: item.created_at,
          lang: item.lang,
        };
      });
      res.status(200).json({
        message: "response is here",
        body: newData,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "something went wrong !!",
    });
    console.log(error);
  }
}
