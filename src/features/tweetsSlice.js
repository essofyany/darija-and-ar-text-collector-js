import { createSlice } from "@reduxjs/toolkit";

export const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: [],
    draftTweet: "",
    loadMore: false,
    metaData: "",
  },
  reducers: {
    getTweets: (state, action) => {
      state.tweets = action.payload;
    },
    labeledTweet: (state, action) => {
      // state.tweets = state.tweets.map((tweet) =>
      //   tweet._id === action.payload._id ? action.payload : tweet
      // );
      state.tweets = state.tweets.filter(
        (tweet) => tweet._id !== action.payload
      );
      state.metaData.totalTweets--;
      state.metaData.labeledTweets++;
    },
    updateTweet: (state, action) => {
      state.tweets = state.tweets.map((tweet) =>
        tweet._id === action.payload.id ? action.payload.updatedTweet : tweet
      );
    },
    deleteTweet: (state, action) => {
      state.tweets = state.tweets.filter(
        (tweet) => tweet._id !== action.payload
      );
      state.metaData.totalTweets--;
    },
    loadDraftTweet: (state, action) => {
      state.draftTweet = action.payload;
    },
    setLoadMore: (state) => {
      state.loadMore = !state.loadMore;
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getTweets,
  labeledTweet,
  updateTweet,
  deleteTweet,
  loadDraftTweet,
  setLoadMore,
  setMetaData,
} = tweetSlice.actions;

export default tweetSlice.reducer;
