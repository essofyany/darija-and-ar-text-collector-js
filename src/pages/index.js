// const Twitter = require("twitter-v2");
import { CSVLink } from "react-csv";
import Loader from "react-loader-spinner";
import { Thead } from "@chakra-ui/table";
import { Th } from "@chakra-ui/table";
import { Td } from "@chakra-ui/table";
import { Tbody } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";
import { Table } from "@chakra-ui/table";
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
import { Center } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { CloseIcon } from "@chakra-ui/icons";

function HomePage() {
  const toast = useToast();
  const [tweetData, setTweetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { input, handleChange } = useForm({
    q: "@essofyanyB",
    lang: "en",
    count: "10",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (input.q.length >= 3) {
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
        })
        .catch((error) => console.log(error));
    } else {
      toast({
        position: "top",
        status: "error",
        title: "Invalid Query!",
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
      <Box w="full" h="85vh" overflow="hidden" overflowY="scroll">
        <Table w="full" size="sm">
          <Thead>
            <Tr>
              <Th key="1" color="red.700">
                Idx
              </Th>
              <Th key="6" color="red.700">
                Tweet ID
              </Th>
              <Th key="2" color="red.700">
                Username
              </Th>
              <Th key="3" color="red.700">
                Tweet Body
              </Th>
              <Th key="4" color="red.700">
                Created_At
              </Th>
              <Th key="5" color="red.700">
                Lang
              </Th>
              <Th key="5" color="red.700"></Th>
            </Tr>
          </Thead>
          <Tbody position="relative">
            {tweetData.length > 0 &&
              tweetData.map((tweet, index) => (
                <Tr key={tweet.tweetId}>
                  <Td>{index + 1}</Td>
                  <Td>{tweet.tweetId}</Td>
                  <Td>{tweet.author}</Td>
                  <Td>{tweet.text}</Td>
                  <Td>{new Date(tweet.createdAt).toDateString().slice(4)}</Td>
                  <Td>{tweet.lang}</Td>
                  <Td>
                    <CloseIcon
                      onClick={() => deleteTweet(tweet.tweetId)}
                      cursor="pointer"
                      _hover={{ color: "red" }}
                    />
                  </Td>
                </Tr>
              ))}
            {isLoading && (
              <Center
                zIndex="modal"
                top="0.5"
                w="full"
                h="80%"
                position="absolute"
              >
                <Loader
                  type="Rings"
                  color="#F8BD6D"
                  height={200}
                  width={200}
                  // timeout={3000} //3 se#cs
                />
              </Center>
            )}
            {tweetData.length < 1 && (
              <Center
                flexDir="column"
                top="0.5"
                w="full"
                h="80%"
                position="absolute"
              >
                <Text mb="10" color="gray.300" fontSize="xl">
                  No Data To Display
                </Text>
                <Text color="gray.300" fontSize="lg">
                  Query: a keyword(s) or username(s) that will be used for
                  searching.
                </Text>
                <Text my="2" color="gray.300" fontSize="lg">
                  Language: the language of the data that will be requested like
                  (en, ar, fr, ...).
                </Text>
                <Text color="gray.300" fontSize="lg">
                  Count: data size, max value is 100 per-request.
                </Text>
              </Center>
            )}
          </Tbody>
        </Table>
      </Box>
      <Divider />
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
                  value={input.q}
                  placeholder="e.g: @essofyanyB"
                />
              </Box>
              <Box mx="5" d="flex" alignItems="center">
                <FormLabel>Language:</FormLabel>
                <Input
                  onChange={handleChange}
                  type="text"
                  name="lang"
                  value={input.lang}
                  placeholder="e.g: ar for Arabic"
                />
              </Box>
              <Box d="flex" alignItems="center">
                <FormLabel>Count:</FormLabel>
                <Input
                  onChange={handleChange}
                  type="numeric"
                  name="count"
                  w="52"
                  value={input.count}
                  placeholder="e.g: 10, max value is 100"
                />
              </Box>
            </Box>
            <Button
              colorScheme="blue"
              borderRadius="full"
              color="blackAlpha.900"
              fontSize="sm"
              fontWeight="medium"
              ml="32"
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
          onClick={() => setTweetData([])}
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
          mr="10"
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
