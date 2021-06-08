import { Button } from "@chakra-ui/button";
import { Divider } from "@chakra-ui/layout";
import { Center } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useState } from "react";
import { newStemmer } from "../utils/snowballStemmer";
import Normalizor from "../utils/Normalizor";
import DeleteRedundancy from "../utils/DeleteRedundancy";
import { Text } from "@chakra-ui/layout";

function CleanUpPage() {
  const stemmer = newStemmer("arabic");
  const deleteRedundancy = new DeleteRedundancy();

  const [str, setStr] = useState("");
  const [result, setResult] = useState("");
  const [target, setTarget] = useState("");

  function tokenization(sentence) {
    const tokens = sentence.split(" ");
    const trimedTokens = tokens.map((token) => token.trim());
    return trimedTokens.join("| ");
  }

  function normalization(sentence) {
    const tokens = sentence.split(" ");
    const trimedTokens = tokens.map((token) => token.trim());
    const normList = trimedTokens.map((word) =>
      deleteRedundancy.normalize(word)
    );
    return normList.join(" ");
  }
  // console.log(deleteRedundancy.normalize("اااااااتَحرُّوعععععععععععععا"));

  function stemmingSentence(sentence) {
    const ts = sentence.split(" ");
    const stemmList = ts.map((token) => stemmer.stem(token));
    console.log(stemmList);
    return stemmList.join(" ");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (target === "Tokenization") {
      setResult(tokenization(str));
    } else if (target === "Normalization") {
      setResult(normalization(str));
    } else if (target === "Stemming") {
      setResult(stemmingSentence(str));
    }
  }

  return (
    <Container my="5">
      <Center mb="10">
        <Heading>Text Pre-processing</Heading>
      </Center>
      <form onSubmit={handleSubmit}>
        <Textarea
          type="text"
          onChange={(e) => setStr(e.target.value)}
          value={str}
          rows="6"
        />
        <Box mt="5" d="flex" justifyContent="space-between">
          <Button
            type="submit"
            colorScheme="red"
            onClick={(e) => setTarget(e.target.innerText)}
          >
            Tokenization
          </Button>
          <Button
            type="submit"
            onClick={(e) => setTarget(e.target.innerText)}
            colorScheme="orange"
          >
            Normalization
          </Button>
          <Button
            type="submit"
            onClick={(e) => setTarget(e.target.innerText)}
            colorScheme="teal"
          >
            Stemming
          </Button>
        </Box>
      </form>
      <Divider my="10" />
      <Text>{result}</Text>
    </Container>
  );
}

export default CleanUpPage;
