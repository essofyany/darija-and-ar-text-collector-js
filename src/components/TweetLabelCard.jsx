import { Button, Box, Textarea } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";

function TweetLabelCard({
  tweet,
  onPositive,
  onNegative,
  onEdit,
  onNeutral,
  onDelete,
}) {
  const [editable, setEditable] = useState(true);
  const [text, setText] = useState(tweet.text);

  return (
    <Box w="full" border="1px solid gray" borderRadius="10" p="3" my="2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onEdit({ ...tweet, text: text });
        }}
      >
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
            onClick={(e) => onPositive(tweet)}
            w="22%"
            colorScheme="whatsapp"
          >
            Positive
          </Button>
          <Button
            type="button"
            onClick={(e) => onNeutral(tweet)}
            w="22%"
            colorScheme="linkedin"
          >
            Neutral
          </Button>
          <Button
            type="button"
            onClick={(e) => onNegative(tweet)}
            w="22%"
            colorScheme="red"
          >
            Negative
          </Button>
          <Button
            type={editable ? "submit" : "button"}
            variant="outline"
            w="15%"
            colorScheme="black"
            onClick={() => setEditable(!editable)}
          >
            {editable ? "Edit" : "Save"}
          </Button>
          <Button
            type="button"
            onClick={(e) => onDelete(tweet._id)}
            w="10%"
            color="#fff"
            bg="red.700"
            colorScheme=""
          >
            <DeleteIcon />
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default TweetLabelCard;
