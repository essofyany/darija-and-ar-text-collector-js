import mongoose from "mongoose";
import Tweet from "../../../models/tweet";

export default async function handler(req, res) {
  //   const tweet = new Tweet();
  mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => err && console.log(err)
  );

  if (req.method === "POST") {
    const payload = JSON.parse(req.body);
    const { text, polarity } = payload[0];
    console.log("from API: ", text);
    console.log("from API: ", polarity);
    const result = await Tweet.create({
      text: text,
      polarity: polarity,
    });

    console.log("from mongo: ", result);
    res.status(201).json({
      message: "tweed is labeled as positive",
      data: {
        tweet: "dsdsdfsdf",
        polarity: "positive",
      },
    });
  } else return res.send("Unauthorized endpoint");
}
