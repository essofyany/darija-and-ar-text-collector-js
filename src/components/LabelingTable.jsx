import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";

function LabelingTable({ tweets }) {
  return (
    <Table w="full" size="md">
      <Thead color="red.700">
        <Tr>
          <Th key="1">Tweet</Th>
          <Th key="2">Pos</Th>
          <Th key="3">Neg</Th>
          <Th key="4">Edit</Th>
        </Tr>
      </Thead>
      <Tbody position="relative">
        {tweets.length > 0 &&
          tweets.map((tweet) => (
            <Tr key={tweet.id}>
              <Td>{tweet.text}</Td>
              <Td px="0.5">
                <Button colorScheme="whatsapp" p="1">
                  Positive
                </Button>
              </Td>
              <Td px="0.5">
                <Button colorScheme="red" p="1">
                  Negative
                </Button>
              </Td>
              <Td>
                <Button colorScheme="facebook">Edit</Button>
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
}

export default LabelingTable;
