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
} from "@chakra-ui/icons";
import router from "next/router";

function Header() {
  return (
    <Box
      d="flex"
      justifyContent="space-between"
      bg="white"
      w="100vw"
      h="5vh"
      px="5"
      py="2"
      mb="5"
      position="sticky"
      top="0"
      zIndex="modal"
      boxShadow="md"
    >
      <Text fontWeight="medium" fontSize="lg">
        Labeling Tweets
      </Text>
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
