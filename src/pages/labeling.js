import { useEffect, useState } from "react";
import { Heading, Center, Container, useToast } from "@chakra-ui/react";
import TweetLabelCard from "../components/TweetLabelCard";

function labeling() {
  const toast = useToast();
  const [data, setData] = useState([
    {
      id: "1",
      text: "بغيت نولي لباس عليا مشي نولي لباس عليا مشي  نولي لباس عليا مشي  نبان لباس عليا",
      polarity: "",
      validated: false,
    },
    {
      id: "2",
      text: "كاينة اخي ولكن مشي كذبة بهاد الصيفة وانما اختبار صعيب",
      polarity: "",
      validated: false,
    },
    {
      id: "3",
      text: "شحال خايبة يبقى لك غير تصاور ديال شي حد عزيز عليك بزاف",
      polarity: "",
      validated: false,
    },
  ]);
  const [count, setCount] = useState(0);

  async function onPositive(tweetId) {
    // const payload = data.filter((tweet) => tweet.id === tweetId);

    const res = await fetch("http://localhost:5000/api/positive", {
      method: "POST",
      body: JSON.stringify({
        text: "شحال خايبة يبقى لك غير تصاور ديال شي حد عزيز عليك بزاف",
        polarity: "",
      }),
    });
    
    console.log(res);
    // labeling
    const labeled = data.map((tweet) =>
      tweet.id === tweetId ? { ...tweet, polarity: "positive" } : tweet
    );

    // feltring
    const filtredTweets = labeled.filter(
      (tweet) => tweet.polarity !== "positive"
    );

    setData(filtredTweets);

    setCount(count + 1);
    // console.log(data);
    toast({
      title: "Marked as Positive",
      status: "success",
      duration: "1000",
    });
  }
  function onNegative() {
    toast({
      title: "Marked as Negative",
      status: "success",
      duration: "1000",
    });
  }
  function onEdit(e) {
    e.preventDefault();
    toast({
      title: "Tweet Edited",
      status: "success",
      duration: "1000",
    });
  }

  useEffect(() => {}, [count]);
  return (
    <>
      <Center bg="lightsalmon" w="100vw" p="1" mb="5">
        <Heading>Labeling tweets</Heading>
      </Center>
      <Container
        mx="auto"
        d="flex"
        flexDir="column"
        maxW={{ xl: "4xl", lg: "3xl", md: "3xl" }}
      >
        {data.map((tweet) => (
          <TweetLabelCard
            onPositive={onPositive}
            onNegative={onNegative}
            onEdit={onEdit}
            tweet={tweet}
            key={tweet.id}
          />
        ))}
      </Container>
    </>
  );
}

export default labeling;
