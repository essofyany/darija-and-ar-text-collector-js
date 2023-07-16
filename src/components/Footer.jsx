import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Footer() {
  const metaData = useSelector((state) => state.tweet.metaData);

  return (
    <Box
      d="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      borderTop="2px solid #ccc"
      w="100vw"
      h="5vh"
      position="fixed"
      bottom="0"
      px="5"
      py="2"
      mt="5"
      zIndex="sticky"
    >
      <Text fontWeight="md" fontSize="md">
        Developed By Chaymaa Rouiouih
      </Text>
      <Text fontWeight="md" fontSize="md">
        😁 2022-2023
      </Text>
    </Box>
  );
}

export default Footer;
