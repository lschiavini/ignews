import { asHTML } from "@prismicio/helpers";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { createPrismicClient } from "../../services/prismic";

import styles from './post.module.scss'

interface PostProps {
  post : {
    slug: string
    title: string
    content: string
    rawContent: string
    updatedAt: string
  }
}

export default function Post({post} : PostProps) {
  console.log('post :>> ', post);
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
            className={styles.postContent}
            dangerouslySetInnerHTML={{
            __html: post.content
          }} />
        </article>
      </main>
    </>
    
  );
}


export const getServerSideProps : GetServerSideProps = async ({req, params}) => {
  const session = await getSession({req}) 
  console.log('session :>> ', session);
  const {slug} = params

  if(!session.activeSubscription) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }


  const response = await createPrismicClient(
    {
      graphQuery: `{post{title}}`
    }
  ).getByUID('publication', String(slug))
  
  const title = response.data.content.find(content => content.type === 'heading1')?.text ?? ""
  response.data.content.splice(0,1)
  const post = {
    slug: response.uid,
    title: title,
    content: asHTML(response.data.content),
    rawContent: response.data.content,
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