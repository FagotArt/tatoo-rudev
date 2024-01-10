"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Collapse = (props: any) => {
    const { children, title, className, contentClassName,expanded } = props;
  const [open, setOpen] = useState(expanded || false);
  return (
    <div className={className}>
      <div className="cursor-pointer flex justify-between items-center" onClick={() => setOpen(!open)}>
        <div>{title}</div>
        <FaChevronDown className={` ${open ? "transform rotate-180" : ""}`} />
      </div>
      <div className={`overflow-hidden duration-100 grid ${open ? "grid-rows-[1fr] pt-[10px]" : "grid-rows-[0fr]"} `}>
        <div className={`min-h-0 pl-[1rem] ${contentClassName}`}>{children}</div>
      </div>
    </div>
  );
};

export default Collapse;
