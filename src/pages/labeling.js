import { Container, useToast } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Modal from '../components/Modal';
import SkeletonList from '../components/SkeletonList';
import TweetLabelCard from '../components/TweetLabelCard';
import {
  deleteTweet,
  getTweets,
  labeledTweet,
  setLoadMore,
  setMetaData,
} from '../features/tweetsSlice';
import * as api from '../utils/api';

function labeling() {
  const tweetList = useSelector((state) => state.tweet.tweets);
  // console.log(tweetList.length);
  const dispatch = useDispatch();
  const [tweet, setTweet] = useState();
  const [textType, setTextType] = useState();
  const [words, setWords] = useState([]);
  const toast = useToast();
  const funcRef = useRef();

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
      } = await api.updateAPI({ ...tweet, polarity: 'positive' });
      dispatch(labeledTweet(tweet._id));
      toast({
        title: 'Marked as Positive',
        status: 'success',
        duration: '3000',
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function onNegative(tweet) {
    try {
      await api.updateAPI({ ...tweet, polarity: 'negative' });
      // console.log("negative");
      dispatch(labeledTweet(tweet._id));

      toast({
        title: 'Marked as Negative',
        status: 'success',
        duration: '3000',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function onNeutral(tweet) {
    try {
      await api.updateAPI({ ...tweet, polarity: 'neutral' });
      // console.log("neutral");
      dispatch(labeledTweet(tweet._id));

      toast({
        title: 'Marked as Neutral',
        status: 'success',
        duration: '3000',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function onEdit(tweet) {
    try {
      // console.log(tweet);
      await api.updateAPI({ ...tweet, polarity: 'edited' });
      // console.log("edited");
      // dispatch(labeledTweet(tweet._id));
      toast({
        title: 'Tweet Edited',
        status: 'success',
        duration: '3000',
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
      // console.log("deleted");

      toast({
        title: 'Tweet deleted',
        status: 'success',
        duration: '3000',
      });
    } catch (error) {
      console.log(error);
    }
  }

  const onClose = () => {
    setTweet(null);
    setTextType(null);
  };

  const onSave = async () => {
    if (words.length) await api.createWord({ words, type: textType });

    await funcRef.current(tweet);

    onClose();
  };

  return (
    <>
      <Head>
        <title>Tweets Labeler (word embedding)</title>
      </Head>
      <Header />
      <Container
        mx='auto'
        d='flex'
        flexDir='column'
        pb='14'
        bg='blue.50'
        maxW={{ xl: '4xl', lg: '3xl', md: '3xl' }}
      >
        {tweetList.length > 0 ? (
          tweetList.map((tweet) => (
            <TweetLabelCard
              onPositive={() => {
                setTextType('positive');
                setTweet(tweet);
                funcRef.current = onPositive;
              }}
              onNegative={() => {
                setTextType('negative');
                setTweet(tweet);
                funcRef.current = onNegative;
              }}
              onNeutral={() => {
                setTextType('neutral');
                setTweet(tweet);
                funcRef.current = onNeutral;
              }}
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
      {tweet && (
        <Modal
          tweet={tweet.text}
          onClose={onClose}
          setWords={setWords}
          onSave={onSave}
        />
      )}
    </>
  );
}

export default labeling;
