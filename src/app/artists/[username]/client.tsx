"use client";
import { toggleFavorite } from "@/actions/user/me";
import CheckBox from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import React from "react";

export const Favorite = ({ id }: any) => {
  const session: any = useSession();

  const toggleFav = async () => {
    const res = await toggleFavorite(id);
    if (res?.error) {
      console.log(res.error);
    }else{
        session.update();
    }
  };

  return <CheckBox value={session?.data?.user?.favorites?.includes(id)} onChange={toggleFav} label="Add to favourites" />;
};

export default Favorite;
