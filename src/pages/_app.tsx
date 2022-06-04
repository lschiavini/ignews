import { AppProps } from "../../node_modules/next/app"
import Header from "../components/Header/index"
import "../styles/global.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Header />
    <Component {...pageProps} />
  </>
} // Reruns every change of screen

export default MyApp
