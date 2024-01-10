"use client";
import { RedirectProvider } from "@/lib/utils/redirect/redirect";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Providers = ({ children }: any) => {
  return (
    <RedirectProvider>
      <SessionProvider>{children}</SessionProvider>
    </RedirectProvider>
  );
};

export default Providers;
