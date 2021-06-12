import { Stack, Skeleton, Box, Center, Button } from "@chakra-ui/react";

function SkeletonCard() {
  return (
    <Stack
      w="full"
      border="1px solid #ddd"
      borderRadius="10"
      p="3"
      my="2"
      spacing={5}
    >
      <Skeleton
        h="24"
        borderRadius="10"
        startColor="gray.300"
        endColor="gray.50"
      />
      <Box mt="2" w="full" d="flex" justifyContent="space-between">
        <Skeleton
          borderRadius="5"
          startColor="gray.200"
          endColor="gray.50"
          h="10"
          w="20%"
        />
        <Skeleton
          borderRadius="5"
          startColor="gray.200"
          endColor="gray.50"
          h="10"
          w="20%"
        />
        <Skeleton
          borderRadius="5"
          startColor="gray.200"
          endColor="gray.50"
          h="10"
          w="20%"
        />
        <Skeleton
          borderRadius="5"
          startColor="gray.200"
          endColor="gray.50"
          h="10"
          w="20%"
        />
        <Skeleton
          borderRadius="5"
          startColor="gray.200"
          endColor="gray.50"
          h="10"
          w="10%"
        />
      </Box>
    </Stack>
  );
}

export default SkeletonCard;
