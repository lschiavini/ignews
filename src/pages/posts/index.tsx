import { asText } from '@prismicio/helpers'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { createClient } from '../../services/prismic'
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
            <a key={post.slug} href='#'>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          ))}
          
        </div>
      </main>

    </>
  )
}

export const getStaticProps: GetStaticProps = async ({}) => {
    const response = await createClient({
      graphQuery: `{post{title}}`
    }).getAllByType('publication')

    console.log('response :>> ', JSON.stringify(response, null, 2));
    
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