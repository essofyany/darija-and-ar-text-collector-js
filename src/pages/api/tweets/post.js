const Twitter = require("twitter");
import { unifyArray } from "../../../utils/unifyArray";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const {
        body: { q, lang, screen_name },
      } = req;
      // Process a POST request
      const client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
      });
      // console.log("params", q, lang, screen_name);

      // fetching tweets from specific user
      if (screen_name && q.length < 1) {
        const statusesData = await client.get("statuses/user_timeline.json", {
          screen_name,
          count: 200,
          // trim_user: false,
          // exclude_replies: false,
          // include_rts: false,
        });
        const usefullStatusesData = statusesData
          .map((item) => {
            return {
              tweetId: item.id,
              author: item.user.screen_name,
              text: item.text,
              createdAt: item.created_at,
              lang: item.lang,
            };
          })
          .filter((item) => item.lang === lang);

        // console.log("screen_name");
        return res.status(200).json({
          message: "data fetched :)",
          body: usefullStatusesData,
        });
      }

      // fetching tweets using keywords or username
      if (q && screen_name.length < 1) {
        const searchData = await client.get("search/tweets.json", {
          q,
          lang,
          count: 100,
        });

        const usefulSearchData = searchData.statuses.map((item) => {
          return {
            tweetId: item.id,
            author: item.user.screen_name,
            text: item.text,
            createdAt: item.created_at,
            lang: item.lang,
          };
        });

        const unifiedUsefulSearchData = unifyArray(usefulSearchData);
        // console.log("q");

        return res.status(200).json({
          message: "data fetched :)",
          body: unifiedUsefulSearchData,
        });
      }

      if (screen_name && q) {
        const statusesData = await client.get("statuses/user_timeline.json", {
          screen_name,
          count: 200,
          // trim_user: false,
          // exclude_replies: false,
          // include_rts: false,
        });

        const usefullStatusesData = statusesData
          .map((item) => {
            return {
              tweetId: item.id,
              author: item.user.screen_name,
              text: item.text,
              createdAt: item.created_at,
              lang: item.lang,
            };
          })
          .filter((item) => item.lang === lang);

        const searchData = await client.get("search/tweets.json", {
          q,
          lang,
          count: 100,
        });

        const usefulSearchData = searchData.statuses.map((item) => {
          return {
            tweetId: item.id,
            author: item.user.screen_name,
            text: item.text,
            createdAt: item.created_at,
            lang: item.lang,
          };
        });

        const unifiedUsefulSearchData = unifyArray(usefulSearchData);

        const dataset = unifiedUsefulSearchData.concat(usefullStatusesData);

        // console.log("screen_name && q");

        return res.status(200).json({
          message: "data fetched :)",
          body: dataset,
        });
      }

      // console.log("nulllllllllllllll");

      res.status(200).json({
        message: "no data found :(",
        body: [],
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "something went wrong !!",
    });
    console.log(error);
  }
}
