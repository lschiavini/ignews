import { PrismicPreview } from "@prismicio/next"
import { PrismicProvider } from "@prismicio/react"
import { SessionProvider } from "next-auth/react"
import Link from "next/link"
import { AppProps } from "../../node_modules/next/app"
import Header from "../components/Header/index"
import { linkResolver, repositoryName } from "../services/prismic"
import "../styles/global.scss"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>
            {children}
          </a>
        </Link>
      )}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <SessionProvider session={pageProps.session}>
          <Header />
          <Component {...pageProps} />
        </SessionProvider>
      </PrismicPreview>
    </PrismicProvider>
  )
} // Reruns every change of screen

export default MyApp
