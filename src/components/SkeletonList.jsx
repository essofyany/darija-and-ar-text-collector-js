import { Box, Center, Button } from "@chakra-ui/react";
import SkeletonCard from "../components/SkeletonCard";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setLoadMore } from "../features/tweetsSlice";

function SkeletonList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const loadMore = useSelector((state) => state.tweet.loadMore);
  const indexs = [1, 2, 3];

  return (
    <Box w="full" position="relative">
      {indexs.map((i) => (
        <SkeletonCard key={i} />
      ))}
      {loadMore && (
        <Center bg="white" w="full" h="100vh" position="absolute" top="0">
          <Button
            onClick={() => {
              dispatch(setLoadMore());
              router.reload();
            }}
            colorScheme="yellow"
          >
            Load More Data
          </Button>
        </Center>
      )}
    </Box>
  );
}

export default SkeletonList;
