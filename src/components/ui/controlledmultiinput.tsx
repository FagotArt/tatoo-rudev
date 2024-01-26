"use client";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import BorderDiv from "./borderdiv";
import { IoClose } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import ErrorMessage from "./errormessage";
import DropDown from "./dropdown";

const ControlledMultiInput = forwardRef((props: any, ref: any) => {
  const { label, options, onInputChange, onChange, error, defaultValue, className, placeholder, contentOuterClassName, value, inputValue, contentInnerClassName, ...rest } = props;
  const [internalValue, setInternalValue] = useState<any>(defaultValue);
  const [internalInputValue, setInternalInputValue] = useState<any>("");
  const [inputSize, setInputSize] = useState<number>(1);
  const [focused, setFocused] = useState<boolean>(false);

  const prevValue = useRef<any>();

  useImperativeHandle(ref, () => ({
    value: internalValue,
  }));

  useEffect(() => {
    if (value !== undefined ) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (inputValue !== undefined) {
      setInternalInputValue(inputValue);
    }
  }, []);

  useEffect(() => {
    if (prevValue.current !== internalValue) {
      onChange && onChange(internalValue);
    }
    prevValue.current = internalValue;
  }, [internalValue]);

  const handleKeyDown = (e: any) => {
    if ((e.key === "Enter" || e.key === "Tab") && e.target.value && e.target.value.trim() !== "") {
      //if theres only 1 suggestion
      const filteredOptions = filterOptions(options);
      if (filteredOptions?.length === 1) {
        e.preventDefault();
        setInternalValue([...(internalValue || []), filteredOptions[0].value]);
        setInternalInputValue("");
        setInputSize(1);
      }
    }

    if (e.key === "Backspace" && !e.target.value) {
      e.preventDefault();
      if (internalValue?.length > 0) {
        setInternalValue(internalValue?.slice(0, -1));
      } else {
        setInternalValue([]);
      }
    }
  };

  const handleInputChange = (e: any) => {
    setInternalInputValue(e.target.value);
    onInputChange && onInputChange(e.target.value);
    setInputSize(e.target.value?.length > 0 ? e.target.value?.length : 1);
  };

  const filterOptions = (opt: any) => {
    if (!internalInputValue || internalInputValue === "") {
      return opt;
    }
    return opt?.filter((option: any) => {
      return (option.value || option.label)?.toLowerCase().includes(internalInputValue.toLowerCase());
    });
  };

  return (
    <>
      <div className="ml-[10px] mb-[5px] text-white ">{label}</div>
      <BorderDiv
        className={contentOuterClassName}
        contentClassName={`${contentInnerClassName} max-w-full flex-wrap flex justify-start flex-wrap gap-2 items-center font-['Helvetica'] text-[0.9rem]`}
      >
        {internalValue?.map((item: any, index: number) => {
          return (
            <div key={index} className="rounded-[5px] max-w-full break-words bg-black/10 border-black/10 text-black px-2 py-1">
              {item}
              <IoClose
                className="inline-block ml-[0.5rem] cursor-pointer"
                onClick={() => {
                  setInternalValue(internalValue?.filter((_: any, i: number) => i !== index));
                }}
              />
            </div>
          );
        })}
        <div
          className={`relative max-w-full rounded-[5px] duration-300 flex justify-start items-center flex-grow px-2 py-1 ${
            internalInputValue !== "" ? "bg-[rgba(0,0,0,0.02)] border-[1px] border-black/10" : ""
          }`}
        >
          <input
            {...rest}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setTimeout(() => {
                setFocused(false);
              }, 100);
            }}
            size={inputSize}
            className="bg-transparent max-w-full flex-grow outline-none min-w-0 w-fit"
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            value={internalInputValue}
            onChange={handleInputChange}
          />
          {options && options.length > 0 && ((internalInputValue && internalInputValue !== "") || focused) && (
            <div className="z-[10] max-h-[300px] overflow-y-auto top-[100%] left-0 absolute w-full shadow-md rounded-b-[5px] overflow-x-hidden duration-100">
              {filterOptions(options)?.map((option: any) => (
                <div
                  key={option.value}
                  className="px-[10px] border-t-[1px] border-x-[1px] cursor-pointer border-b-black/50 py-[5px] bg-white duration-100 hover:bg-gray-100"
                  onClick={() => {
                    setInternalValue([...(internalValue || []), option.value]);
                    setInternalInputValue("");
                    setInputSize(1);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
          {internalInputValue !== "" && (
            <IoIosAddCircle
              size={25}
              className="inline-block min-w-[25px] ml-[0.5rem] cursor-pointer"
              onClick={() => {
                setInternalValue([...(internalValue || []), internalInputValue.trim()]);
                setInternalInputValue("");
                setInputSize(1);
              }}
            />
          )}
        </div>
      </BorderDiv>
      {error && error !== "" && <ErrorMessage className={`${className} mt-[-10px]`}>{error}</ErrorMessage>}
    </>
  );
});
ControlledMultiInput.displayName = "ControlledMultiInput";

export default ControlledMultiInput;
