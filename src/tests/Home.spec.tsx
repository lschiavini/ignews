import { render, screen } from "@testing-library/react"
import { mocked } from "jest-mock";
import Home, { getStaticProps } from "../pages"
import { stripe } from "../services/stripe";

jest.mock('next/router');   
jest.mock('next-auth/react', () => {
  return {
    useSession: () => [null, false]
  }
});

jest.mock('../../src/services/stripe')

describe('Home Page', () => {
  it('renders correclty', () => {



    render(
      <Home product={
        {priceId: 'fake', amount: 'R$10.00'}
      } />
    )
    expect(screen.getByText('for R$10.00 month')).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const retrievePricesStripeMocked = mocked(stripe.prices.retrieve)
    retrievePricesStripeMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000
    } as any)


    const response = await getStaticProps({})
    console.log(response)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )
  })
})