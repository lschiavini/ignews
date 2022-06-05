import { SessionProvider } from "next-auth/react"
import { AppProps } from "../../node_modules/next/app"
import Header from "../components/Header/index"
import "../styles/global.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return <SessionProvider session={pageProps.session}>
    <Header />
    <Component {...pageProps} />
  </SessionProvider>
} // Reruns every change of screen

export default MyApp
