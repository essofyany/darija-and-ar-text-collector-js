import { Thead } from "@chakra-ui/table";
import { Th } from "@chakra-ui/table";
import { Td } from "@chakra-ui/table";
import { Tbody } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";
import { Table } from "@chakra-ui/table";

function HistoryTable({ queryHistory }) {
  return (
    <Table w="15vw" size="sm" colorScheme="yellow">
      <Thead>
        <Tr>
          <Th textAlign="center" color="blackAlpha.800">
            Query History
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {queryHistory.map((item, idx) => (
          <Tr key={idx}>
            <Td textAlign="center">{item}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default HistoryTable;
