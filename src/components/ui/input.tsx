'use client'
import React, { useEffect, useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import ErrorMessage from "./errormessage";

interface InputProps {
  className?: string;
  [x: string]: any;
}

const Input = React.forwardRef((props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  const { label, className,value, containerClassName,onKeyDown, onChange, type, error, defaultValue, ...rest } = props;
  const isControlled = value !== undefined;
  const [hidden, setHidden] = useState<boolean>(type === "password");
  const [localValue, setLocalValue] = useState<string>(defaultValue || "");

  useEffect(() => {
    if (isControlled) {
      setLocalValue(value);
    }
  }, [value, isControlled]);
  
  const handleChange = (e: any) => {
    if (!isControlled) {
      setLocalValue(e.target.value);
    }
    onChange && onChange(e);
  }

  return (
    <>
      <div
        className={`w-fit flex justify-center items-center p-[1px] rounded-[1rem] border-[1px] border-black bg-[linear-gradient(to_top,rgba(255,255,255,0.2),gray,white,gray,rgba(255,255,255,0.2))] ${containerClassName}`}
      >
        <div
          {...rest}
          className={`flex-1 max-w-full
             shadow-[0px_0px_5px_0px_rgba(0,0,0,0.5)_inset]
                bg-gradient-to-b from-white to-[#C7C7C7] text-black border-[1px] border-black duration-100
                hover:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)_inset]
            px-[1rem] py-[0.4rem] rounded-[1rem] 
            flex justify-start items-center gap-[1rem]
            ${className}`}
        >
          <div className="whitespace-nowrap">{label}</div>
          <input value={localValue}  onKeyDown={onKeyDown} onChange={handleChange} type={hidden ? "password" : "text"} ref={ref} className="bg-transparent min-w-0 outline-none py-[5px] flex-1 " />
          {type === "password" && (
            <div onClick={() => setHidden(!hidden)} className="cursor-pointer text-[1.2rem] hover:text-black">
              {hidden ? <BiShowAlt /> : <BiHide />}
            </div>
          )}
        </div>
      </div>
      {error && error !== "" && <ErrorMessage className={`${className} mt-[-10px]`}>{error}</ErrorMessage>}
    </>
  );
});

export default Input;
