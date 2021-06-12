import { configureStore } from "@reduxjs/toolkit";
import tweetReducer from "./features/tweetsSlice";

export default configureStore({
  reducer: {
    tweet: tweetReducer,
  },
});
