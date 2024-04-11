"use client";
import React from "react";
import BackgroundSection from "./bgsection";
import Button from "./ui/Button";
import Link from "next/link";
import { useRedirect } from "@/lib/utils/redirect/redirect";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { updateRedirect } = useRedirect();
  const session = useSession();
  const user :any = session.data?.user;

  return (
    <BackgroundSection
      image="/images/bg_2_skull_design_tb.png"
      imageStyle={{
        WebkitMaskImage: "linear-gradient(to top,rgba(0,0,0,1) 70%,rgba(0,0,0,0))",
        maskImage: "linear-gradient(to top,rgba(0,0,0,1) 70%,rgba(0,0,0,0))",
      }}
    >
      <div className="relative mt-[2rem] min-h-[500px] z-1 px-[2rem] flex flex-col md:flex-row justify-between items-center gap-[2rem] border-b-[1px] border-b-[rgba(255,255,255,0.5)] pb-[2rem]">
        <div className="md:w-[30%] flex flex-col items-start gap-[1rem]">
          <Link href="/">Home</Link>
          <Link href="/artists">Explore Artist</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/about">About Us</Link>
          <Link href="/country-guide">Country Guide</Link>
          <Link href="/faq">FAQs</Link>
        </div>
        <div className="md:w-[30%]"></div>
        <div className="md:w-[30%] flex flex-col justify-start items-center gap-[1rem]">
          {(!user || user.error) &&
          <Button
            onClick={() => {
              updateRedirect(window.location.pathname);
            }}
            href="/signup"
            className="px-[4rem]"
          >
            Sign Up
          </Button>
          }
          <div className="font-['Helvetica'] text-center">
            Sign up today and become a part of the fastest growing directory of tattoo artists in the UK, or become one of the many individuals looking to find the tattoo artist that best suits them!
          </div>
        </div>
      </div>
    </BackgroundSection>
  );
};

export default Footer;
