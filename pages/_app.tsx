import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RobinhoodProvider } from '../context/RobinhoodContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RobinhoodProvider>
      <Component {...pageProps} />
    </RobinhoodProvider>
  )
}

export default MyApp
