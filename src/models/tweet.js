import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  polarity: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  author: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  tweetId: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);
