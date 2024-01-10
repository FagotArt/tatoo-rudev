"use client";
import { UnlockMe } from "@/actions/user/unlock";
import { BlockedAuthenticatedSection } from "@/components/authenticatedsection";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/errormessage";
import { plans } from "@/lib/stripe/plans";
import { modal } from "@/lib/utils/modal";
import { useRedirect } from "@/lib/utils/redirect/redirect";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const ContactUnlocker = ({ artist }: any) => {
  const [error, setError] = useState<any>();
  const {updateRedirect} = useRedirect()

  const unlock = async () => {
    const plan = await modal({
      Element: ({ proceed }: any) => (
        <div>
          <div className="flex justify-center items-stretch gap-[1rem]">
            <div className="min-w-[300px] rounded-[10px] shadow-lg border-[1px] border-black/20 p-[1rem] duration-300 hover:translate-y-[-3px]">
              <div className="font-bold py-[0.5rem] border-b-[1px] border-b-black/20 text-[2rem]">Unlock This Artist</div>
              <div className="py-[1rem] font-['Helvetica'] text-[1.5rem] font-bold">${plans.unlockArtist.amount / 100}</div>
              <div className="font-['Helvetica'] mb-[1rem]">Unlocks contact info for this artist.</div>
              <div>
                <Button
                  containerClassName="mx-auto"
                  onClick={() => {
                    proceed(plans.unlockArtist.productId);
                  }}
                >
                  Unlock This Artist
                </Button>
              </div>
            </div>
            <div className="min-w-[300px] rounded-[10px] shadow-lg border-[1px] border-black/20 p-[1rem] duration-300 hover:translate-y-[-3px]">
              <div className="font-bold py-[0.5rem] border-b-[1px] border-b-black/20 text-[2rem]">Unlock All Artists</div>
              <div className="py-[1rem] font-['Helvetica'] text-[1.5rem] font-bold">${plans.unlockAll.amount / 100}</div>
              <div className="font-['Helvetica'] mb-[1rem]">Unlocks contact info for all artists.</div>
              <div>
                <Button
                  containerClassName="mx-auto"
                  onClick={() => {
                    proceed(plans.unlockAll.productId);
                  }}
                >
                  Unlock All Artists
                </Button>
              </div>
            </div>
          </div>
        </div>
      ),
    });

    if (!plan || (plan !== plans.unlockArtist.productId && plan !== plans.unlockAll.productId)) {
      return;
    }

    const { error, session } = await UnlockMe({
      artist: artist,
      unlockAll: plan === plans.unlockAll.productId,
    });

    if (error) {
      setError(error);
      return;
    }

    updateRedirect(window.location.pathname);
    const stripe = await stripePromise;
    const result = await stripe?.redirectToCheckout({
      sessionId: session,
    });

    if (result?.error) {
      setError({
        user: result.error?.message || "Something went wrong with the payment",
      });
    }
  };

  const errmsg = error?.artist || error?.unlockAll || error?.user;
  return (
    <BlockedAuthenticatedSection>
      <Button className="px-[3rem]" containerClassName="mx-auto mb-[10px]" onClick={unlock}>
        Unlock Contact Info
      </Button>
      {errmsg && <ErrorMessage className="mx-auto w-fit">{errmsg}</ErrorMessage>}
    </BlockedAuthenticatedSection>
  );
};

export default ContactUnlocker;
