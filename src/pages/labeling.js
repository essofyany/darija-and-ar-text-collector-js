import { useEffect } from "react";
import { Container, useToast } from "@chakra-ui/react";
import TweetLabelCard from "../components/TweetLabelCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SkeletonList from "../components/SkeletonList";
import {
  deleteTweet,
  getTweets,
  labeledTweet,
  setLoadMore,
  setMetaData,
} from "../features/tweetsSlice";
import * as api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";

function labeling() {
  const tweetList = useSelector((state) => state.tweet.tweets.slice(0, 15));
  console.log(tweetList.length);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.getTweetsAPI();
        dispatch(getTweets(data.data));
        dispatch(setLoadMore());
        dispatch(setMetaData(data.metaData));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function onPositive(tweet) {
    try {
      const {
        data: { data },
      } = await api.updateAPI({ ...tweet, polarity: "positive" });
      dispatch(labeledTweet(tweet._id));
      console.log("positive");
      toast({
        title: "Marked as Positive",
        status: "success",
        duration: "1000",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function onNegative(tweet) {
    try {
      await api.updateAPI({ ...tweet, polarity: "negative" });
      console.log("negative");
      dispatch(labeledTweet(tweet._id));

      toast({
        title: "Marked as Negative",
        status: "success",
        duration: "1000",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function onNeutral(tweet) {
    try {
      await api.updateAPI({ ...tweet, polarity: "neutral" });
      console.log("neutral");
      dispatch(labeledTweet(tweet._id));

      toast({
        title: "Marked as Negative",
        status: "success",
        duration: "1000",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function onEdit(tweet) {
    try {
      // console.log(tweet);
      await api.updateAPI({ ...tweet, polarity: "edited" });
      console.log("edited");
      // dispatch(labeledTweet(tweet._id));
      toast({
        title: "Tweet Edited",
        status: "success",
        duration: "1000",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function onDelete(id) {
    try {
      console.log(id);
      await api.deleteAPI(id);
      dispatch(deleteTweet(id));
      console.log("deleted");

      toast({
        title: "Tweet deleted",
        status: "success",
        duration: "1000",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <Container
        mx="auto"
        d="flex"
        flexDir="column"
        pb="14"
        bg="blue.50"
        maxW={{ xl: "4xl", lg: "3xl", md: "3xl" }}
      >
        {tweetList.length > 0 ? (
          tweetList.map((tweet) => (
            <TweetLabelCard
              onPositive={onPositive}
              onNegative={onNegative}
              onNeutral={onNeutral}
              onDelete={onDelete}
              onEdit={onEdit}
              tweet={tweet}
              key={tweet._id}
            />
          ))
        ) : (
          <SkeletonList />
        )}
      </Container>
      <Footer />
    </>
  );
}

export default labeling;
