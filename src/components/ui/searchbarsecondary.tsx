import React from "react";
import { IoMdSearch } from "react-icons/io";

const SearchBarSecondary = (props: any) => {
  const { className,onChange, containerClassName,onSearch, ...rest } = props;
  return (
    <div className={`${containerClassName} p-[2px] rounded-[5rem] shadow-md bg-[#F5F5F5] flex justify-start items-center gap-[10px] pr-[1rem]`}>
      <input
        onChange={onChange}
        className={`${className} outline-none min-w-0 font-['Helvetica'] flex-1 px-[1rem] bg-[linear-gradient(to_bottom,#3E3E3E,#1B1B1B)] text-white text-[0.9rem] p-[10px] rounded-[5rem]`}
      />
      <IoMdSearch 
      onClick={onSearch}
      className="text-[1.5rem] cursor-pointer text-black min-w-[30px]" />
    </div>
  );
};

export default SearchBarSecondary;
