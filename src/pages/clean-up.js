import { Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Cleaner } from "../utils/Cleaner";

function CleanUpPage() {
  const str = `@Chaouia_alg @winners0005 @AmnestyAR لقد قلتها خرية اما الحرية ننعم بها`;
  const cleaner = new Cleaner(str);
  // cleaner.removeChars();
  return (
    <Box>
      <Text>Data Clean Up Page</Text>
      <Text>{str}</Text>
      <Text>{cleaner.cleanOrder_1()}</Text>
    </Box>
  );
}

export default CleanUpPage;
