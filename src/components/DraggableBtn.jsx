import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  HamburgerIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";
import { motion } from "framer-motion";
import router from "next/router";

const MotionMenuBtn = motion(Box);

function DraggableBtn({ title1, title2, link1, link2 }) {
  return (
    <MotionMenuBtn
      position="absolute"
      top="10"
      right="3"
      w="10"
      borderRadius="lg"
      bg="facebook.400"
      animate={{ x: -90, y: 90 }}
      drag
      dragConstraints={{ left: -540, right: 1, top: -1, bottom: 440 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      zIndex="modal"
    >
      <Menu colorScheme="linkedin">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          color="white"
        />
        <MenuList color="white">
          <MenuItem onClick={() => router.push(link1)} icon={<EditIcon />}>
            {title1}
          </MenuItem>
          <MenuItem
            onClick={() => router.push(link2)}
            icon={<AttachmentIcon />}
          >
            {title2}
          </MenuItem>
          <MenuItem
            icon={<ExternalLinkIcon />}
            onClick={() =>
              router.push(
                "https://github.com/essofyany/darija-and-ar-text-collector-js"
              )
            }
          >
            Source Code
          </MenuItem>
          <MenuItem onClick={() => router.reload()} icon={<RepeatIcon />}>
            Refresh
          </MenuItem>
        </MenuList>
      </Menu>
    </MotionMenuBtn>
  );
}

export default DraggableBtn;
