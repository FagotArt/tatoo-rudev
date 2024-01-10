'use client'
import React, { useEffect, useState } from "react";
import ErrorMessage from "./errormessage";

const TextArea = (props: any) => {
  const { label, value, onChange, error, defaultValue, className, containerClassName, inputClassName, ...rest } = props;
  const isControlled = value !== undefined;
  const [localValue, setLocalValue] = useState("");

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
  };

  return (
    <>
      <div
        className={`w-fit flex justify-center items-center p-[1px] rounded-[1rem] border-[1px] border-black bg-[linear-gradient(to_top,rgba(255,255,255,0.2),gray,white,gray,rgba(255,255,255,0.2))] ${containerClassName}`}
      >
        <div
          className={`flex-1 relative
               shadow-[0px_0px_5px_0px_rgba(0,0,0,0.5)_inset]
                  bg-white text-black border-[1px] border-black duration-100
                  hover:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)_inset]
              px-[1rem] py-[0.4rem] rounded-[1rem] 
              flex justify-start items-center gap-[1rem]
              ${className}`}
        >
          <img src="/images/border_corner.png" className="absolute bottom-[-10px] left-[-10px] z-10 h-[30px] scale-y-[-1]" />
          <img src="/images/border_corner.png" className="absolute bottom-[-10px] right-[-10px] scale-x-[-1] scale-y-[-1] z-10 h-[30px]" />
          <textarea {...rest} onChange={handleChange} value={localValue} defaultValue={defaultValue} className={`bg-transparent outline-none py-[5px] flex-1 ${inputClassName}`} />
        </div>
      </div>
      {error && error !== "" && <ErrorMessage className={`${className} mt-[-10px]`}>{error}</ErrorMessage>}
    </>
  );
};

export default TextArea;
