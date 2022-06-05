
import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss"

interface SubscribeButtonProps {
    priceId: string;
}

function SubscribeButton({priceId}: SubscribeButtonProps) {

    const {data: session} = useSession()

    async function handleSubscribe() {
        if(!session) {
            signIn('github')
            return
        }
        try {
            const response = await api.post('/subscribe')
            const {sessionId} = response.data
            const stripe = await getStripeJs()
            stripe.redirectToCheckout({sessionId})

        } catch(error) {
            alert(error.message)
        }
    }


    return (
        <button type="button"
        className={styles.subscribeButton}
        onClick={handleSubscribe}
        >
            Subscribe Now
        </button>
    );
}

export default SubscribeButton;