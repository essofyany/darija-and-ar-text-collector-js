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
});

export default mongoose.model("Tweet", tweetSchema);
