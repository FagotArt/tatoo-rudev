"use client";
import Link from "next/link";
import React from "react";

const Button = (props: any) => {
    const { className, children, containerClassName, href, onClick, ...rest } = props;
  
    const buttonContent = (
      <div
        {...rest}
        onClick={() => {
          onClick && onClick();
        }}
        className={`flex-1 text-center
           shadow-[0px_0px_5px_0px_rgba(0,0,0,0.5)_inset]
           bg-gradient-to-b from-white to-[#C7C7C7] text-black cursor-pointer border-[1px] border-black duration-100
           hover:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)_inset]
           active:scale-[0.95]
           px-[1rem] py-[0.4rem] rounded-[1rem] ${className}`}
      >
        {children}
      </div>
    );
  
    return href ? (
      <Link href={href} className={`w-fit flex justify-center items-center p-[1px] rounded-[1rem] border-[1px] border-black bg-[linear-gradient(to_top,rgba(255,255,255,0.2),gray,white,gray,rgba(255,255,255,0.2))] ${containerClassName}`}>
          {buttonContent}
      </Link>
    ) : (
      <div className={`w-fit flex justify-center items-center p-[1px] rounded-[1rem] border-[1px] border-black bg-[linear-gradient(to_top,rgba(255,255,255,0.2),gray,white,gray,rgba(255,255,255,0.2))] ${containerClassName}`}>
        {buttonContent}
      </div>
    );
  };

export default Button;
