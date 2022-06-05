import Head from 'next/head'
import styles from './styles.module.scss'

export default function Posts() {
  return(
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href='#'>
            <time>12 Março de 2021</time>
            <strong>Debugging NodeJS within a Docker Container on VSCode</strong>
            <p>
            So hello, it’s been a while, and I haven’t being keeping up with my daily dispatches, or maybe my days are longer than yours. Relativity man, who knows?

            So I was playing around with a Node.js project hosting it using Docker alongside a Postgres database.
            </p>
          </a>

          <a href='#'>
            <time>12 Março de 2021</time>
            <strong>Debugging NodeJS within a Docker Container on VSCode</strong>
            <p>
            So hello, it’s been a while, and I haven’t being keeping up with my daily dispatches, or maybe my days are longer than yours. Relativity man, who knows?

            So I was playing around with a Node.js project hosting it using Docker alongside a Postgres database.
            </p>
          </a>

          <a href='#'>
            <time>12 Março de 2021</time>
            <strong>Debugging NodeJS within a Docker Container on VSCode</strong>
            <p>
            So hello, it’s been a while, and I haven’t being keeping up with my daily dispatches, or maybe my days are longer than yours. Relativity man, who knows?

            So I was playing around with a Node.js project hosting it using Docker alongside a Postgres database.
            </p>
          </a>

          
        </div>
      </main>

    </>
  )
}