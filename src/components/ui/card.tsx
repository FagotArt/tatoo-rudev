'use client'
import Link from "next/link";
import React from "react";


const Card = (props: any) => {
  const { children,className,innerClassName,href, ...rest } = props;
  return (
    <Link href={href || ''}>
    <div className={`p-[2px] bg-[linear-gradient(to_top,gray,white,#CACACA)] rounded-[1rem] flex justify-center items-center ${className}`}>
      <div className={`bg-[linear-gradient(to_top,#EFEFEF,#CACACA_5%,white)] flex-1 min-h-[100%] rounded-[1rem] p-[1rem] border-[1px] border-[rgba(0,0,0,0.5)] text-black duration-300 shadow-[0px_0px_10px_rgba(0,0,0,0.3)_inset] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.7)_inset] ${innerClassName}`} {...rest}>
        {children}
      </div>
    </div>
    </Link>
  );
};

export default Card;
