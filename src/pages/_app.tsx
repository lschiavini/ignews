import { AppProps } from "../../node_modules/next/app"


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
} // Reruns every change of screen

export default MyApp
