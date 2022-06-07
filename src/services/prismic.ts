import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'
import sm from '../../sm.json'

export const endpoint = sm.apiEndpoint
export const repositoryName = prismic.getRepositoryName(endpoint)

// Update the Link Resolver to match your project's route structure
export function linkResolver(doc: any) {
  switch (doc.type) {
    case 'homepage':
      return '/'
    case 'page':
      return `/${doc.uid}`
    default:
      return null
  }
}

type Config = {
  client: prismic.Client
  previewData: any
  req: prismic.HttpRequestLike
}

// This factory function allows smooth preview setup
export function createClient(config = {}) {
  const myConfig = config as Config
  const client = prismic.createClient(
    endpoint,
    {
      ...config,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      fetch: fetch
    })

  enableAutoPreviews({
    client,
    previewData: myConfig.previewData,
    req: myConfig.req,
  })

  return client
}