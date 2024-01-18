"use client";
import GuideMap from "@/components/guidemap";
import Divider from "@/components/ui/divider";
import useMediaQuery from "@/lib/utils/useMediaQuery";
import React from "react";

const Page = () => {
  const mobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="py-[120px]">
      <div className="text-4xl mb-[2rem] text-center font-bold">Country Guide</div>
      <Divider className="max-w-[200px] !mb-[2rem]" />
      <GuideMap width={mobile ? 300 : 700} containerClassName="mx-auto mb-[3rem]" />
    </div>
  );
};

export default Page;
