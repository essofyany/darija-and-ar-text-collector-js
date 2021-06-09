import mongoose from "mongoose";
import Tweet from "../../../models/tweet";

export default async function handler(req, res) {
  mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => err && console.log(err)
  );

  try {
    const tweetsList = await Tweet.db.db;
    console.log(tweetsList);
    res.status(200).json({ message: "getting tweet list", data: 'tweetsList' });
    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
}
