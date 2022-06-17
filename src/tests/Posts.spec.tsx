import { render, screen } from "@testing-library/react"
import { mocked } from "jest-mock";
import Posts, { getStaticProps } from "../pages/posts"
import { createPrismicClient } from "../services/prismic";
import fetch from "node-fetch";

const posts = [
  {slug: 'my-new-post', title: 'My New post', excerpt: 'My Excerpt', updatedAt: 'Today' },
  {slug: 'my-new-post', title: 'My New post', excerpt: 'My Excerpt', updatedAt: 'Today' },
  {slug: 'my-new-post', title: 'My New post', excerpt: 'My Excerpt', updatedAt: 'Today' }
]


jest.mock('../services/prismic')

describe('Posts Page', () => {
  
  it('renders correctly', () => {

    render(
      <Posts posts={posts} />
    )

    const listOfEntries = screen.getAllByText('My New post')

    expect(listOfEntries).toHaveLength(3)
  
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(createPrismicClient)
    
    getPrismicClientMocked.mockReturnValueOnce({
      getAllByType: jest.fn().mockResolvedValueOnce(
        [
            {
              uid: 'my-new-post',
              data: {
                content: [
                  {type: 'heading1', text: 'My new post'},
                  {type: 'paragraph', text: 'Post excerpt'}
                ]
              },
              last_publication_date: '04-01-2021'
            }
        ]
      )
    } as any)

    const response = await getStaticProps({})
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My new post',
              excerpt: 'Post excerpt',
              updatedAt: 'April 01, 2021'
            }
          ]
        }
      })
    )
  })
})