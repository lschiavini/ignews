import { asHTML } from "@prismicio/helpers";
import { GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createPrismicClient } from "../../../services/prismic";

import styles from '../post.module.scss'

interface PostPreviewProps {
  post : {
    slug: string
    title: string
    content: string
    rawContent: string
    updatedAt: string
  }
}

export default function PostPreview({post} : PostPreviewProps) {
  const {data: session} = useSession()
  const router = useRouter()
  console.log('post :>> ', post);

  useEffect(() => {
    if(!session?.activeSubscription && post) {
      console.log('postHere :>> ', post);
      router.push(`/posts/${post.slug}`)
    }
  }, [session])
  
  if(!post) return <></>

  return (
    <>
      <Head>
        <title>{`${post.title} | ignews`}</title>  
      </Head>    
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{
            __html: post.content
          }} />

            <div className={styles.continueReading}>
              Wanna continue reading?
              <Link href="/">
                <a>Subscribe Now 🤗</a>
              </Link>
            </div>

        </article>
      </main>
    </>
    
  );
}


export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps : GetStaticProps = async ({params}) => {
  const {slug} = params

  const response = await createPrismicClient(
    {
      graphQuery: `{post{title}}`
    }
  ).getByUID('publication', String(slug))
  
  const title = response.data.content.find(content => content.type === 'heading1')?.text ?? ""
  response.data.content.splice(0,1)
  const content = response.data.content.filter(content => content.text !== "").splice(0,4)

  const post = {
    slug: response.uid,
    title: title,
    content: asHTML(content),
    rawContent: content,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: { post }
  }
}