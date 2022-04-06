import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

const supportedChainIds = [4];

const connector = {
  injected: {},
};

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      supportedChainIds={supportedChainIds}
      connector={connector}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
