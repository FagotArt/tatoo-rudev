"use server";

import Unlock, { UnlockValidation } from "@/lib/models/unlock";
import { plans } from "@/lib/stripe/plans";
import { createCheckout } from "@/lib/stripe/stripe";
import { withServerAuth } from "@/lib/utils/auth/auth";
import { validate } from "@/lib/utils/validation";

export const UnlockMe = withServerAuth(async (session, { artist, unlockAll }) => {
  const { error } = await validate(
    {
      user: session?.user?._id,
      artist: artist?._id,
      unlockAll,
    },
    UnlockValidation
  );

  if (error) {
    return {
      error: error,
      success: false,
    };
  }

  const stripeSession = await createCheckout({
    name: unlockAll ? "Unlock All" : `Unlock ${artist?.firstName + " " + artist?.lastName}`,
    amount: unlockAll ? plans.unlockAll.amount : plans.unlockArtist.amount,
    user: session?.user?._id?.toString(),
    artist: artist?._id,
    productId: unlockAll ? plans.unlockAll.productId : plans.unlockArtist.productId,
  });

  return { message: "success", success: true, session: stripeSession.id };
});

export const CheckUnlock = async ({ user, artist, productId }: any) => {
  const unlockAll = productId === plans.unlockAll.productId;
  const criteria: any = { user };

  if (artist) {
    criteria.artist = artist;
  } else if (unlockAll) {
    criteria.unlockAll = true;
  } else {
    return { error: "artist or unlockAll should be provided" };
  }
  //check if unlock exists
  const unlock = await Unlock.findOne(criteria);

  return unlock;
};

export const getMyContacts = withServerAuth(async (session) => {
  try {
    const unlocks = (await Unlock.find({ user: session?.user?._id}).populate('artist','-password'))?.map((unlock) => unlock.toObject())

    if (!unlocks) {
      return null;
    }

    //if there's an unlock with unlockAll put it at the beginning of the array
    const unlockAll = unlocks.find((unlock) => unlock.unlockAll);
    const contacts = unlocks.filter((unlock) => !unlock.unlockAll);

    console.log('unlockAll',unlockAll)
    if (unlockAll) {
      contacts.unshift(unlockAll);
    }

    return contacts;
  } catch (error) {
    console.log(error);
    return null;
  }
});
