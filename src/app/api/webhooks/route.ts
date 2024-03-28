import Unlock, { UnlockValidation } from "@/lib/models/unlock";
import { plans } from "@/lib/stripe/plans";
import { getStripe } from "@/lib/stripe/stripe";
import { validate } from "@/lib/utils/validation";

const stripe = getStripe();

export async function POST(req: Request) {
  if(!req.body){
    return new Response('no body', {status: 400})
  }
  
  const sig = req.headers.get("stripe-signature") || "";

  //prepare reader
  let rawBody = '';
  const reader = req.body.getReader();
  let done, value;
  while (!done) {
    ({ done, value } = await reader.read());
    if (value) {
      rawBody += new TextDecoder("utf-8").decode(value);
    }
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (error:any) {
    console.log(`⚠️  Webhook signature verification failed.`, error?.message);
    return new Response("Webhook Error: Invalid signature", { status: 400 });
  }

  switch (event.type) {
    case "charge.succeeded":
      const session = event.data.object;
      const { user, productId, artist } = session.metadata;

      const { error } = await validate(
        {
          user: user,
          artist: artist,
          unlockAll: productId === plans.unlockAll.productId,
        },
        UnlockValidation
      );

      if (error) {
        return Response.json(
          {
            message: "unlock validation failed",
            error,
          },
          {
            status: 400,
          }
        );
      }

      const unlock = new Unlock({
        user,
        artist,
        unlockAll: productId === plans.unlockAll.productId,
      });

      await unlock.save();

      return new Response("success", { status: 200 });
    default:
      console.log(`Unhandled event type ${event.type}`);
      return new Response(`Unhandled event type ${event.type}`, {
        status: 200,
      });
  }
}
