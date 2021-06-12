import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import router from "next/router";
import { useSelector } from "react-redux";

function Header() {
  const metaData = useSelector((state) => state.tweet.metaData);

  return (
    <Box
      d="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100vw"
      h="5vh"
      px="5"
      py="4"
      mb="5"
      position="sticky"
      top="0"
      zIndex="modal"
      boxShadow="md"
    >
      {/* 🔺 */}
      <Box d="flex">
        <TriangleUpIcon mx="1" boxSize={6} color="green.500" />
        <Text fontWeight="semibold" fontSize="lg">
          {metaData.labeledTweets}/{metaData.totalTweets}
        </Text>
      </Box>

      <Menu>
        <MenuButton variant="outline">
          <HamburgerIcon w="28px" h="28px" />
        </MenuButton>
        <MenuList bg="white">
          <MenuItem
            color="blue.900"
            onClick={() => router.push("/")}
            icon={<AddIcon />}
          >
            Collect Tweets
          </MenuItem>
          <MenuItem
            color="blue.900"
            onClick={() => router.push("/clean-up")}
            icon={<EditIcon />}
          >
            Text Pre-Processor
          </MenuItem>
          <MenuItem
            color="blue.900"
            icon={<ExternalLinkIcon />}
            onClick={() =>
              router.push(
                "https://github.com/essofyany/darija-and-ar-text-collector-js"
              )
            }
          >
            Source Code
          </MenuItem>
          <MenuItem
            onClick={() => router.reload()}
            color="blue.900"
            icon={<RepeatIcon />}
          >
            Refresh
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default Header;
