import { CSVLink } from "react-csv";
import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/layout";
import useForm from "../hooks/useForm";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import { Text } from "@chakra-ui/layout";
import GitIcon from "../components/GitIcon";
import { unifyArray } from "../utils/unifyArray";
import { useToast } from "@chakra-ui/toast";
import HistoryTable from "../components/HistoryTable";
import TweetsTable from "../components/TweetsTable";
import { Center } from "@chakra-ui/layout";
import Loader from "react-loader-spinner";
import Scrollbars from "react-custom-scrollbars-2";
import Stats from "../components/Stats";

function HomePage() {
  const toast = useToast();
  const [stats, setStats] = useState({
    added: 0,
    total: 0,
  });
  const [tweetData, setTweetData] = useState([]);
  const [queryHistory, setQueryHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { input, handleChange } = useForm({
    q: "",
    lang: "",
    screen_name: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (input.lang !== "") {
      setIsLoading(true);
      await fetch("api/tweets/post", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // setTweetData([...tweetData, ...data.body]);
          setIsLoading(false);
          !data.body.length > 0 &&
            toast({
              position: "top",
              status: "info",
              title: "No Data Added!",
              description: "there is no data for the query you enter.",
              duration: "3000",
              isClosable: "true",
            });
          const unified = unifyArray([...tweetData, ...data.body]);
          setTweetData(unified);
          setStats({});
          setQueryHistory([
            ...queryHistory,
            `${input.q}, ${input.screen_name},${input.lang}`,
          ]);
        })
        .catch((error) => console.log(error));
    } else {
      toast({
        position: "top",
        status: "error",
        title: "Invalid Query!",
        description: "Language is required",
        duration: "3000",
        isClosable: "true",
      });
    }
  }

  function deleteTweet(tweetId) {
    const result = tweetData.filter((tweet) => tweet.tweetId !== tweetId);
    setTweetData(result);
  }

  return (
    <Box h="100vh">
      <Box d="flex" w="full" h="85vh">
        <Box w="85vw" overflow="hidden">
          <Scrollbars>
            <TweetsTable tweetData={tweetData} deleteTweet={deleteTweet} />
          </Scrollbars>
        </Box>
        <Divider orientation="vertical" />
        {/* Query History table */}
        <Box w="15vw" bg="yellow.50" overflow="hidden">
          <Scrollbars>
            <HistoryTable queryHistory={queryHistory} />
          </Scrollbars>
        </Box>
      </Box>
      <Divider />
      {isLoading && (
        <Center
          zIndex="modal"
          right="24"
          top="5"
          w="full"
          h="70%"
          position="absolute"
        >
          <Loader type="Rings" color="#F8BD6D" height={200} width={200} />
        </Center>
      )}
      {/* Form */}
      <Box
        p="5"
        d="flex"
        bg="red.50"
        h="10vh"
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <form onSubmit={handleSubmit}>
          <Box d="flex" justifyContent="space-between" alignItems="center">
            <Box d="flex">
              <Box d="flex" alignItems="center">
                <FormLabel>Query:</FormLabel>
                <Input
                  onChange={handleChange}
                  type="text"
                  name="q"
                  w="56"
                  value={input.q}
                  placeholder="e.g: '@essofyanyB', 'سلام',..."
                />
              </Box>
              <Box mx="5" d="flex" alignItems="center">
                <FormLabel>Username:</FormLabel>
                <Input
                  onChange={handleChange}
                  type="text"
                  w="36"
                  name="screen_name"
                  value={input.screen_name}
                  placeholder="e.g: essofyanyB"
                />
              </Box>
              <Box d="flex" alignItems="center">
                <FormLabel>Language:</FormLabel>
                <Input
                  onChange={handleChange}
                  type="text"
                  name="lang"
                  w="40"
                  value={input.lang}
                  placeholder="e.g: 'ar' for Arabic"
                />
              </Box>
            </Box>
            {/* <Stats total={stats.total} added={stats.added} /> */}
            <Button
              colorScheme="blue"
              borderRadius="full"
              color="blackAlpha.900"
              fontSize="sm"
              fontWeight="medium"
              ml="20"
              type="submit"
            >
              Apply Query
            </Button>
          </Box>
        </form>
        {/* download and clear table Btns */}
        <Button
          colorScheme="orange"
          borderRadius="full"
          color="blackAlpha.900"
          fontSize="sm"
          mx="5"
          fontWeight="medium"
          disabled={tweetData.length > 0 ? false : true}
          onClick={() => {
            setTweetData([]);
            setQueryHistory([]);
          }}
        >
          Clear Table
        </Button>
        <Button
          colorScheme="red"
          borderRadius="full"
          color="blackAlpha.900"
          fontSize="sm"
          fontWeight="medium"
          disabled={tweetData.length < 1 ? true : false}
          mr="5"
        >
          {tweetData.length < 1 ? (
            "No Data To Download"
          ) : (
            <CSVLink
              onClick={() =>
                toast({
                  position: "top",
                  status: "success",
                  description: "The file will be downloaded in few seconds :)",
                  duration: "3000",
                })
              }
              data={tweetData}
            >
              Download This Data
            </CSVLink>
          )}
        </Button>
      </Box>
      {/* footer */}
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        px="5"
        py="1"
        color="#212121"
      >
        <Text fontSize="sm">
          Created by: Essofyany Bilal, for PFE purpose, UM5 - 2021
        </Text>
        <a
          href="https://github.com/essofyany/darija-and-ar-text-collector-js"
          target="_blank"
        >
          <GitIcon />
        </a>
      </Box>
    </Box>
  );
}

export default HomePage;
