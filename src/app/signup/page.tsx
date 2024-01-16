"use client";
import { signUp } from "@/actions/user/signup";
import HeaderSection from "@/components/headersection";
import Button from "@/components/ui/Button";
import BigTitle from "@/components/ui/bigtitle";
import BorderDivider from "@/components/ui/borderdivider";
import Card from "@/components/ui/card";
import CheckBox from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import React, { useEffect, useRef, useTransition } from "react";

const Page = () => {
  return (
    <div className="min-h-[100vh] pb-[5rem]">
      <HeaderSection className="pt-[140px]"></HeaderSection>
      <BorderDivider />
      <BigTitle className="mt-[-60px] z-[10]">Sign up</BigTitle>
      <div className="px-[2rem] pt-[5rem] flex justify-center items-center flex-wrap gap-[3rem] mb-[5rem]">
        <Card href='/signup/customer' className="text-center min-w-[300px] max-w-[600px] cursor-pointer">
          <img src="/images/icons/looking_for_artist.png" className="h-[10rem] mb-[1rem] mx-auto" />
          <div className="text-[1.3rem] font-bold mb-[1rem]">i&apos;m looking for an artist</div>
        </Card>
        <Card href='/signup/artist' className="text-center min-w-[300px] max-w-[600px] cursor-pointer">
          <img src="/images/icons/looking_for_costumer.png" className="h-[10rem] pt-[2rem]  mb-[1rem] mx-auto" />
          <div className="text-[1.3rem] font-bold mb-[1rem]">i&apos;m an artist</div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
