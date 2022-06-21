import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    // Force dark mode on page load
    document.documentElement.classList.add('dark')
  })

  return <Component {...pageProps} />
}

export default MyApp
