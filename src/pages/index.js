import keys from "../../keys";
// import Twitter from "twitter-v2";
const Twitter = require("twitter-v2");

function HomePage({ data }) {
  console.log(data);
  return (
    <div>
      <h1>data collector app</h1>
      <h3>{data.id}</h3>
      <p>{data.text}</p>
    </div>
  );
}

const client = new Twitter({
  consumer_key: keys.APIKey,
  consumer_secret: keys.APISecretKey,
  access_token_key: keys.access_token,
  access_token_secret: keys.access_token_secret,
});

export async function getServerSideProps(context) {
  
  const params = {
    query: "from:__N8i lang:en",
    max_results: 10,
    tweet: {
      fields: [
        "created_at",
        "entities",
        "in_reply_to_user_id",
        "public_metrics",
        "referenced_tweets",
        "source",
        "author_id",
      ],
    },
  };
  const { data } = await client.get("tweets/search/recent", params);
  return {
    props: {
      data: data[0],
    },
  };
}

export default HomePage;
