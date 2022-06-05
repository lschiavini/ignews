import { query } from "faunadb"
import { fauna } from "../../../services/fauna"
import { stripe } from "../../../services/stripe"

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {
  console.log('subscriptionId', subscriptionId)
  console.log('customerId', customerId)

  const userRef = await fauna.query(
    query.Select(
      "ref",
      query.Get(
        query.Match(
          query.Index('users_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const chosenProduct = 0

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[chosenProduct].price.id
  }

  await fauna.query(
    query.Create(
      query.Collection('subscriptions'),
      { data: subscriptionData }
    )
  )


}