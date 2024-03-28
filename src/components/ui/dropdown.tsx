'use client'
import React, { useState } from "react";

const DropDown = (props: any) => {
  const { label,value, options,onChange, containerClassName, defaultOption } = props;
  const isControlled = value !== undefined;
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | undefined>(defaultOption)
  const [expanded, setExpanded] = useState(false);
  
  const handleOptionChange = (option:any) => {
    if (!isControlled) {
      setSelectedOption(option);
    }
    onChange && onChange(option);
    setExpanded(false);
  };

  const displayLabel = isControlled ? (value ? `${label || ""} ${value.label}` : label) : (selectedOption ? `${label || ""} ${selectedOption.label}` : label);

  
  return (
    <div
      className={`p-[1px] relative z-[1] w-fit flex justify-center items-center border-[1px] border-black bg-[linear-gradient(to_top,rgba(255,255,255,0.2),gray,white,gray,rgba(255,255,255,0.2))] rounded-[5px] ${containerClassName}`}
    >
      <div className="relative text-black flex items-center rounded-[5px] cursor-pointer bg-white">
        <div
            onClick={() => setExpanded(!expanded)}
            className="px-[2.5rem] py-[5px] duration-100 hover:bg-gray-100"
        >
           {displayLabel}
        </div>
        <div
            className={`absolute max-h-[300px] overflow-y-scroll shadow-[0px_5px_15px_rgba(0,0,0,0.2)] rounded-b-[5px] overflow-hidden duration-100 translate-y-[100%] bottom-0 left-0 w-full grid ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]" }`}
        >
            <div
                className="min-h-0"
            >
            {options.map((option: any) => (
                <div
                key={option.value}
                className="px-[10px] border-t-[1px] border-x-[1px] border-black/50 py-[5px] bg-white duration-100 hover:bg-gray-100"
                onClick={() => handleOptionChange(option)}
                >
                {option.label}
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
