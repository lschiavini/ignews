import { pseudoRandomBytes } from 'crypto'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { createPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

interface PostProps {
  posts: Post[]
}

export default function Posts({posts}: PostProps) {
  return(
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.slug + pseudoRandomBytes(3)} href={`/posts/${post.slug}`}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
          
        </div>
      </main>

    </>
  )
}

export const getStaticProps: GetStaticProps = async ({}) => {
    const response = await createPrismicClient({
      graphQuery: `{post{title}}`
    }).getAllByType('publication')
    
    const posts = response.map((post) => {
      return {
        slug: post.uid,
        title: post.data.content.find(content => content.type === 'heading1')?.text ?? "",
        excerpt: post.data.content.find(content => content.type === 'paragraph' && content.text != "")?.text ?? "",
        updatedAt: new Date(post.last_publication_date).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })

    return {
      props: {
        posts
      }
    }

}