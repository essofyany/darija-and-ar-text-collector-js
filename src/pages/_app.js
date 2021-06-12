import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../store";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
