const Twitter = require("twitter");

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const {
        body: { q, lang, count },
      } = req;
      // Process a POST request
      const client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
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
