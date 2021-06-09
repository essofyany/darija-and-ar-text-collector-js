import { Button, Box, Textarea } from "@chakra-ui/react";
import { useState } from "react";

function TweetLabelCard({ tweet, onPositive, onNegative, onEdit }) {
  const [editable, setEditable] = useState(true);
  const [text, setText] = useState(tweet.text);

  return (
    <Box w="full" border="1px solid gray" borderRadius="10" p="3" my="2">
      <form onSubmit={onEdit}>
        <Textarea
          readOnly={editable}
          minBlockSize="20"
          mb="2"
          w="full"
          bg={!editable ? "blue.50" : "blackAlpha.50"}
          borderRadius="10"
          p="2"
          textAlign="right"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Box mt="2" w="full" d="flex" justifyContent="space-between">
          <Button
            type="button"
            onClick={(e) => onPositive(tweet.id)}
            w="32%"
            colorScheme="whatsapp"
          >
            Positive
          </Button>
          <Button type="button" onClick={onNegative} w="32%" colorScheme="red">
            Negative
          </Button>
          <Button
            type={editable ? "submit" : "button"}
            w="32%"
            colorScheme={!editable ? "facebook" : "twitter"}
            onClick={() => setEditable(!editable)}
          >
            {editable ? "Edit" : "Save"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default TweetLabelCard;
