"use client";
import BorderDecorations from "@/components/decoration/borderdecorations";
import React, { useState } from "react";
import { CategoriesFilter } from "./filters";
import { FaFilter } from "react-icons/fa6";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`md:hidden absolute top-[0.5rem] left-[1rem] z-[10] w-[40px] h-[40px] flex justify-center items-center rounded-full bg-black/80 p-1 cursor-pointer`}
        onClick={() => setOpen(!open)}
      >
        <FaFilter className='text-white'/>
      </div>
      <div className={`${open ? "max-w-0 min-w-0" : "max-w-[300px] min-w-[300px]"}   md:min-w-[300px] overflow-hidden duration-300 relative !text-white/70 md:flex-1 `}>
        <div className={`pt-[60px] md:pt-[1rem] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3),transparent)]  duration-300  p-[1rem]`}>
          <BorderDecorations rightBorder />
          <CategoriesFilter />
        </div>
      </div>
    </>
  );
};

export default SideBar;
