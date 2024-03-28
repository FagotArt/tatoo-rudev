"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getStripeSessionById } from "@/lib/stripe/stripe";
import ErrorMessage from "@/components/ui/errormessage";
import SuccessMessage from "@/components/ui/successmessage";
import { CheckUnlock } from "@/actions/user/unlock";
import LoadingMessage from "@/components/ui/loadingmessage";
import Button from "@/components/ui/Button";
import { useRedirect } from "@/lib/utils/redirect/redirect";

const pollInterval = 1000;
const timeout = 60000;
let timeElapsed = 0;

const Page = () => {
  const searchParams = useSearchParams();
  const [unlocked, setUnlocked] = useState<any>();
  const [sessionLoading, setSessionLoading] = useState(true);
  const [session, setSession] = useState<any>();
  const { redirect } = useRedirect();

  useEffect(() => {
    fetchSession();
  }, [searchParams]);

  //if theres no session
  if (!searchParams.has("session_id")) {
    return (
      <div className="py-[150px]">
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-[1rem]">
            <div>
              <ErrorMessage iconSize={25} className="!text-[1rem]">
                No session id provided
              </ErrorMessage>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sessionId = searchParams.get("session_id") as string;
  const succeeded = session?.payment_intent?.status === "succeeded";

  const fetchSession = async () => {
    setSessionLoading(true);
    const res = (await getStripeSessionById(sessionId)) as any;
    setSessionLoading(false);
    setSession(res);
    const interval = setInterval(async () => {
      const { user, artist, productId } = res?.payment_intent?.metadata || {};
      const unlock = await CheckUnlock({ user, artist, productId });
      if (unlock?.error) {
        console.log(unlock.error);
        clearInterval(interval);
        setUnlocked(unlock);
        return;
      }
      if (unlock) {
        clearInterval(interval);
        setUnlocked(unlock);
      } else if (timeElapsed > timeout) {
        clearInterval(interval);
        setUnlocked({
          error: "Waiting for unlock timed out, if the artist contacts are not unlocked please contact us at test@email.com",
        });
      }
      timeElapsed += pollInterval;
    }, pollInterval);
  };

  return (
    <div className="py-[150px]">
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-[1rem]">
          <div>
            {sessionLoading ? (
              <LoadingMessage className="!text-[1rem]">Verifying Payment</LoadingMessage>
            ) : succeeded ? (
              <SuccessMessage iconSize={22} className="!text-[1rem]">
                Payment Succeeded
              </SuccessMessage>
            ) : (
              <ErrorMessage iconSize={25} className="!text-[1rem]">
                Payment Failed
              </ErrorMessage>
            )}
          </div>
          <div>
            {unlocked ? (
              unlocked.error ? (
                <ErrorMessage iconSize={25} className="!text-[1rem]">
                  Something went wrong, if this persists please contact us
                </ErrorMessage>
              ) : (
                <SuccessMessage iconSize={22} className="!text-[1rem]">
                  {unlocked.unlockAll ? "All Artists Unlocked" : "Artist Contacts Unlocked"}
                </SuccessMessage>
              )
            ) : (
              <LoadingMessage className="!text-[1rem]">Unlocking contacts</LoadingMessage>
            )}
          </div>
          <div>
            {unlocked &&
              !unlocked.error &&
              session &&
              (unlocked.unlockAll ? (
                <div className="flex gap-[1rem] justify-center items-center">
                  <Button href={`/artists`}>Explore Artists</Button>
                  <Button onClick={redirect}>Go to Artist</Button>
                </div>
              ) : (
                <Button containerClassName="mx-auto" href={`/artists/${session.payment_intent?.metadata.artist}`}>
                  Go to Artist
                </Button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
