// const Twitter = require("twitter-v2");
const Twitter = require("twitter");
import { Thead } from "@chakra-ui/table";
import { Th } from "@chakra-ui/table";
import { Td } from "@chakra-ui/table";
import { Tbody } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";
import { Table } from "@chakra-ui/table";
import keys from "../../keys";

function HomePage({ data }) {
  console.log(data);
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Index</Th>
          <Th>Tweet ID</Th>
          <Th>Tweet Body</Th>
          <Th>Lang</Th>
          <Th>Location</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((tweet, index) => (
          <Tr key={tweet.id}>
            <Td>{index}</Td>
            <Td>{tweet.id}</Td>
            <Td>{tweet.text}</Td>
            <Td>{tweet.lang}</Td>
            <Td>{tweet.user.location}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export async function getServerSideProps(context) {
  const client = new Twitter({
    consumer_key: keys.APIKey,
    consumer_secret: keys.APISecretKey,
    access_token_key: keys.access_token,
    access_token_secret: keys.access_token_secret,
  });

  // query doc: https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query
  // Twitter-v2
  // const params = {
  //   // query: "from:DGSN_MAROC",
  //   // query: "winners0005",
  //   id: "chaimaadidi",
  //   "tweet.fields": "conversation_id,lang", // Edit optional query parameters here
  //   // "user.fields": "created_at",
  // };
  // const { data } = await client.get("tweets/search/recent", params);
  // const { data } = await client.get("users/:id/tweets", params);

  // Twitter-v1
  // const params = { screen_name: "chaimaadidi", count: 10 };
  // const data = await client.get("statuses/user_timeline", params);

  const params = {
    q: "@chaimaadidi OR @AyshaIisha OR @RezraziI",
    count: 200,
    // locale: "ma", //usefull when searching by keywords
    lang: "ar",
    since_id: "1396168542685307000", //usefull for searchin for more then 100 tweet per person.
    include_entities: "false",
  };
  const data = await client.get("search/tweets.json", params);

  console.log(data.statuses.length);

  return {
    props: {
      data: data.statuses,
    },
  };
}

export default HomePage;
