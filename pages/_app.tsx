import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import ReactGA from 'react-ga';
ReactGA.initialize("process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID");

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
