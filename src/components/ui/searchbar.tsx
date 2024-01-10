'use client'
import React, { forwardRef, useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

const SearchBar = forwardRef((props: any,ref:any) => {
  const { className,value,onChange, containerClassName, children,text,onSearch, ...rest } = props;
  const isControlled = value !== undefined;
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isControlled) {
      setInputValue(value);
    }
  }, [value, isControlled]);

  const handleInputChange = (e:any) => {
    if (!isControlled) {
      setInputValue(e.target.value);
    }
    onChange && onChange(e);
  };

  return (
    <div
      className={`p-[2px] w-fit flex justify-center items-center border-[1px] border-black bg-[linear-gradient(to_top,rgba(255,255,255,0.2),gray,white,gray,rgba(255,255,255,0.2))] rounded-[2rem] ${containerClassName}`}
    >
      <div className="flex flex-1 justify-start items-stretch bg-gradient-to-b from-white to-[#C7C7C7] text-black  rounded-[2rem] overflow-hidden">
        <div className="flex p-[10px] justify-start items-center flex-1 gap-[10px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)_inset]">
          <IoMdSearch className="text-[1.5rem] text-black" />
          <input 
            value={inputValue}
            onChange={handleInputChange}
          ref={ref} type="text" placeholder="Search" className={`bg-transparent border-none outline-none text-[0.9rem] text-black placeholder:text-black flex-1 ${className}`} />
        </div>
        <div 
          onClick={onSearch}
        className="border-l-[2px] cursor-pointer border-black py-[10px] px-[20px] curosr-pointer">{text}</div>
      </div>
    </div>
  );
})

export default SearchBar;
