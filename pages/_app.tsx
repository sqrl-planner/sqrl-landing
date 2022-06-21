import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import ReactGA from 'react-ga';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const tracking_id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID as string;
    console.log("Enabling Google Analytics tracking for tracking_id: " + tracking_id);
    ReactGA.initialize(tracking_id);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
