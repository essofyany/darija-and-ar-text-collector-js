import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <Box w="full" h="100vh" position="relative">
      <Header />
      <Box w="full" h="90vh">
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
