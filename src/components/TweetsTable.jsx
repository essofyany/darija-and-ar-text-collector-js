import { CloseIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/layout";
import { Center } from "@chakra-ui/layout";
import { Thead } from "@chakra-ui/table";
import { Th } from "@chakra-ui/table";
import { Td } from "@chakra-ui/table";
import { Tbody } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";
import { Table } from "@chakra-ui/table";

function TweetsTable({ tweetData, deleteTweet }) {
  return (
    <Table w="full" size="sm" h="full">
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
          <Th key="5" color="red.700">
            Delete
          </Th>
        </Tr>
      </Thead>
      <Tbody position="relative">
        {tweetData.length > 0 &&
          tweetData.map((tweet, index) => (
            <Tr key={tweet.tweetId}>
              <Td>{index + 1}</Td>
              <Td maxW="20">{tweet.tweetId}</Td>
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
              Query: a keyword(s) based search.
            </Text>
            <Text color="gray.300" fontSize="lg">
              Username: collecting specific user tweets, "username without @
              symbol".
            </Text>
            <Text my="2" color="gray.300" fontSize="lg">
              Lang: the language of the data that will be requested like (en,
              ar, fr, ...).
            </Text>
          </Center>
        )}
      </Tbody>
    </Table>
  );
}

export default TweetsTable;
