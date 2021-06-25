import { useState } from "react";
import Head from "next/head";
import { CSVLink } from "react-csv";
import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/layout";
import useForm from "../hooks/useForm";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import GitIcon from "../components/GitIcon";
import { unifyArray } from "../utils/unifyArray";
import { useToast } from "@chakra-ui/toast";
import HistoryTable from "../components/HistoryTable";
import TweetsTable from "../components/TweetsTable";
import DraggableBtn from "../components/DraggableBtn";
import { Center } from "@chakra-ui/layout";
import Loader from "react-loader-spinner";
import { Scrollbars } from "react-custom-scrollbars-2";

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
    <>
      <Head>
        <title>Tweets Collector</title>
      </Head>
      <Box w="100vw" h="100vh" position="relative">
        <Box d="flex" w="full" h={["75vh", "75vh", "85vh"]}>
          <Box w={["full", "full", "85vw", "85vw"]} overflow="hidden">
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              universal={true}
            >
              <TweetsTable tweetData={tweetData} deleteTweet={deleteTweet} />
            </Scrollbars>
          </Box>
          <Divider orientation="vertical" />
          {/* Query History table */}
          <Box d={["none", "block"]} w="15vw" overflow="hidden">
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              universal={true}
            >
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
          p={["1", "1", "5"]}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              d="flex"
              justifyContent={["center", "space-between"]}
              alignItems="center"
              w="full"
              flexWrap={["wrap", "wrap", "nowrap"]}
            >
              {/* inputs */}
              <Box
                d="flex"
                flexWrap={["wrap", "wrap", "wrap", "nowrap"]}
                w={["full", "full", "auto"]}
                pr={["3", "3", "0"]}
              >
                <Box
                  d="flex"
                  w={["full", "full", "full", "auto"]}
                  alignItems="center"
                  my="2"
                >
                  <FormLabel>Query:</FormLabel>
                  <Input
                    onChange={handleChange}
                    type="text"
                    name="q"
                    w={["full", "full", "52"]}
                    value={input.q}
                    placeholder="e.g: '@essofyanyB', 'سلام',..."
                  />
                </Box>
                <Box
                  mx={["0", "0", "5"]}
                  d="flex"
                  w={["full", "full", "auto"]}
                  alignItems="center"
                  my="2"
                >
                  <FormLabel>Username:</FormLabel>
                  <Input
                    onChange={handleChange}
                    type="text"
                    w={["full", "full", "36"]}
                    name="screen_name"
                    value={input.screen_name}
                    placeholder="e.g: essofyanyB"
                  />
                </Box>
                <Box
                  d="flex"
                  w={["full", "full", "auto"]}
                  // pl={["5", "5", "5", "0"]}
                  alignItems="center"
                  my="2"
                >
                  <FormLabel>Language:</FormLabel>
                  <Input
                    onChange={handleChange}
                    type="text"
                    name="lang"
                    w={["full", "full", "40"]}
                    value={input.lang}
                    placeholder="e.g: 'ar' for Arabic"
                  />
                </Box>
              </Box>
              {/* Buttons */}
              <Box
                w={["full", "full", "auto"]}
                d="flex"
                justifyContent="center"
                alignItems="center"
                flexWrap={["wrap", "wrap", "wrap", "wrap", "nowrap"]}
              >
                <Button
                  colorScheme="facebook"
                  borderRadius={["5", "5", "full"]}
                  color="blackAlpha.900"
                  fontSize="sm"
                  fontWeight="medium"
                  type="submit"
                  w={["full", "full", "full", "full", "auto"]}
                >
                  Apply Query
                </Button>
                {/* download and clear table Btns */}
                <Button
                  colorScheme="orange"
                  borderRadius={["5", "5", "full"]}
                  color="blackAlpha.900"
                  fontSize="sm"
                  mx={["0", "0", "0", "0", "5"]}
                  my={["2", "2", "0"]}
                  fontWeight="medium"
                  w={["full", "full", "full", "full", "auto"]}
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
                  borderRadius={["5", "5", "full"]}
                  color="blackAlpha.900"
                  fontSize="sm"
                  fontWeight="medium"
                  w={["full", "full", "full", "full", "auto"]}
                  disabled={tweetData.length < 1 ? true : false}
                >
                  {tweetData.length < 1 ? (
                    "No Data To Download"
                  ) : (
                    <CSVLink
                      onClick={() =>
                        toast({
                          position: "top",
                          status: "success",
                          description:
                            "The file will be downloaded in few seconds :)",
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
            </Box>
          </form>
        </Box>
        {/* footer */}
        <Box
          d="flex"
          justifyContent={["center", "space-between"]}
          alignItems="center"
          px={["1", "1", "5"]}
          // py="1"
          color="#212121"
          flexWrap="wrap"
        >
          <Text fontSize="sm">
            Developed by: Essofyany Bilal, for research purpose, UM5 - 2021
          </Text>
          <a
            href="https://github.com/essofyany/darija-and-ar-text-collector-js"
            target="_blank"
          >
            <GitIcon />
          </a>
        </Box>
      </Box>
      <DraggableBtn />
    </>
  );
}

export default HomePage;
