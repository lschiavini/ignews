import Head from "../../node_modules/next/head"
import styles from "../styles/home.module.scss"

export default function Home() {
  return (
    <>
      <Head>
        <title>Init | ig.news</title>
      </Head>
    <h1
      className={styles.title}
    >
      Hello <span>World</span>
    </h1>
    </>
  )
}