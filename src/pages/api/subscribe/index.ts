import { query } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Stripe from "stripe";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

type User = {
    ref: {
        id: string
    }
    data: {
        stripe_customer_id: string
    }
}

async function getUser(session: Session): Promise<User> {
    const user = await fauna.query<User>(
        query.Get(
            query.Match(
                query.Index('users_by_email'),
                query.Casefold(session.user.email)
            )
        )
    )
    return user
}

async function saveStripeCustomerIdFaunaDB(user: User, stripeCustomer: Stripe.Customer) {

    await fauna.query(
        query.Update(
            query.Ref(query.Collection('users'), user.ref.id),
            {
                data: {
                    stripe_customer_id: stripeCustomer.id
                }
            }
        )
    )
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'POST') {

        const session = await getSession({ req: request })
        const user = await getUser(session)
        let customerId = user.data.stripe_customer_id

        if (!customerId) {
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email
            })
            await saveStripeCustomerIdFaunaDB(user, stripeCustomer)
            customerId = stripeCustomer.id
        }

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1L72PLHtZMSc9N5U1p9KaLHS', quantity: 1 }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS,
            cancel_url: process.env.STRIPE_CANCEL
        })

        return response.status(200).json({
            sessionId: stripeCheckoutSession.id
        })
    } else {
        response.setHeader('Allow', 'POST')
        response.status(405).end('Method not allowed')
    }
}