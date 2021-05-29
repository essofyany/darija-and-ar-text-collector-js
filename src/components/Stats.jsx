import { StatLabel } from "@chakra-ui/stat";
import { StatHelpText } from "@chakra-ui/stat";
import { StatArrow } from "@chakra-ui/stat";
import { StatNumber } from "@chakra-ui/stat";
import { Stat } from "@chakra-ui/stat";

export default function Stats({ total, added }) {
  return (
    <Stat w="20" bg="red">
      <StatLabel>Total</StatLabel>
      <StatNumber>{total}</StatNumber>
      <StatHelpText>
        <StatArrow type="increase" />
        {added}
      </StatHelpText>
    </Stat>
  );
}
