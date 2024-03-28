"use client";

import GuideMap from "@/components/guidemap";
import SearchBar from "@/components/ui/searchbar";
import useMediaQuery from "@/lib/utils/useMediaQuery";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export const HomeSearch = () => {
  const searchRef = useRef<any>(null);
  const router = useRouter();

  const onSearch = () => {
    router.push(`/artists?search=${searchRef.current.value}`);
  };

  return <SearchBar ref={searchRef} onSearch={onSearch} text="Artist" className="md:min-w-[300px]" containerClassName="mb-[2rem] mx-auto max-w-[100%]" />;
};

export const Guide = ()=>{
  const mobile = useMediaQuery("(max-width: 768px)");

  return <GuideMap width={mobile ? 300 : 700} containerClassName="mx-auto mb-[3rem]" />
}
