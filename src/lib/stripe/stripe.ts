'use server'
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

interface createCheckoutProps {
    name:string,
    amount:number,
    productId: string,
    user: any,
    artist?:any,
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const getStripe = () => {
    return stripe
}

export const createCheckout = async (props:createCheckoutProps)=>{
    const {name,amount,user,productId,artist} = props
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data:{
                currency:'usd',
                product_data:{
                    name: name
                },
                unit_amount:amount
            },
            quantity:1
        }],
        mode: 'payment',
        success_url: `${backendUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${backendUrl}/payment/cancel`,
        payment_intent_data : {
            metadata: {
                user,
                productId,
                artist,
            }
        },
    })

    return session
}

export const getStripeSessionById = async (session_id:string) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id,{
            expand: ['payment_intent']
        })
    
        return session
    } catch (error) {
        console.log(error)

        return {
            error,
            message: 'failed to retrieve checkout session'
        }
    }
}