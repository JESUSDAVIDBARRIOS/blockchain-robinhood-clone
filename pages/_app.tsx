import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RobinhoodProvider } from "../context/RobinhoodContext";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      serverUrl='https://pxwwfao9cuil.usemoralis.com:2053/server'
      appId='BEBfHzrGVaaklHu4NkD1Mek2asPsptJb6JEMQeFq'
    >
      <RobinhoodProvider>
        <Component {...pageProps} />
      </RobinhoodProvider>
    </MoralisProvider>
  );
}

export default MyApp;
