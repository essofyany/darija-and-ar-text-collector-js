import mongoose from "mongoose";
// import dbConnect from "../../utils/dbConnect";
import Tweet from "../../models/tweet";

export default async function handler(req, res) {
  const MONGODB_URL = process.env.MONGODB_URL;
  //   await dbConnect();

  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes: true,
  };

  mongoose.connect(MONGODB_URL, opts).then(() => {
    console.log("connecting to mongo");
    // return mongoose;
  });

  switch (req.method) {
    case "GET" /* Get Tweets */:
      try {
        console.log(Tweet);
        // { polarity: "" }
        const tweets = await Tweet.find().limit(200);
        const totalTweets = await Tweet.countDocuments({});
        const unlabeledTweets = await Tweet.countDocuments({
          polarity: " ",
        });

        if (!tweets) {
          return res.status(400).json({ success: false });
        }

        // save tweets text and export it as .txt file
        // const tweetsText = tweets.map((tweet) => {
        //   return tweet.text;
        // });

        // writedata(["src", "data", "tweetsText.txt"], tweetsText);

        res.status(200).json({
          success: true,
          data: tweets,
          metaData: {
            totalTweets,
            labeledTweets: totalTweets - unlabeledTweets,
          },
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST" /* POST Tweet */:
      try {
        const tweet = await Tweet.create(req.body);
        console.log(tweet);
        if (!tweet) {
          return res.status(400).json({ success: false });
        }
        res.status(201).json({ success: true, data: tweet });
      } catch (error) {
        res.status(400).json({ success: false });
      }

    case "PATCH" /* Edit tweet */:
      try {
        const tweet = await Tweet.findByIdAndUpdate(req.body._id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!tweet) {
          return res.status(400).json({ success: false });
        }
        res.status(201).json({ success: true, data: tweet });
      } catch (error) {
        res.status(400).json({ success: false });
      }

    case "PUT" /*  put for Delete tweet */:
      try {
        console.log(req.body);
        await Tweet.findByIdAndDelete({
          _id: req.body.id,
        });
        // if (!deletedTweet) {
        //   return res.status(400).json({ success: false });
        // }
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }

    default:
      res.status(400).json({ success: false });
  }
}
