"use client";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const CheckBox = forwardRef((props: any, ref: any) => {
  const { onChange,value, label, count,defaultValue, className, Box } = props;
  const isControlled = value !== undefined;
  const [checked, setChecked] = useState(defaultValue || false);
  const handleChange = () => {
    if (!isControlled) {
      setChecked(!checked);
    }
    onChange && onChange(!checked);
  };

  useEffect(() => {
    if (isControlled) {
      setChecked(value);
    }
  }, [value, isControlled]);

  useImperativeHandle(ref, () => ({
    checked: isControlled ? value : checked,
  }));

  return (
    <div className={`${className} flex items-center gap-[10px] font-['Helvetica']`}>
      {Box ? (
        <Box checked={checked} onClick={handleChange} />
      ) : (
        <div onClick={handleChange} className={`h-[20px] w-[20px] duration-300 ${checked ? "bg-[#F5F5F5]" : ""} border-[1px] border-white/70 cursor-pointer`}></div>
      )}
      <div>
        {label}
        {count && <span className="text-[0.85rem] text-gray-400 ml-[10px]">({count})</span>}
      </div>
    </div>
  );
});

CheckBox.displayName = "CheckBox";

export default CheckBox;
