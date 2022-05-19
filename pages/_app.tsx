import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RobinhoodProvider } from "../context/RobinhoodContext";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }: AppProps) {

  const MORALIS_SERVER_URL = String(process.env.MORALIS_SERVER_URL);
  const MORALIS_APP_ID = String(process.env.MORALIS_APP_ID);

  return (
    <MoralisProvider
      serverUrl= {MORALIS_SERVER_URL}
      appId= {MORALIS_APP_ID}
    >
      <RobinhoodProvider>
        <Component {...pageProps} />
      </RobinhoodProvider>
    </MoralisProvider>
  );
}

export default MyApp;
