import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessMessage = (props: any) => {
  const { className, children ,iconSize} = props;
  return (
    <div className={`${className} flex justify-start text-start pl-[10px] text-green-400 font-['Helvetica'] text-[0.8rem]`}>
      <FaCheckCircle size={iconSize} className="inline-block mr-[5px] text-[1.2rem]" />
      <div>{children}</div>
    </div>
  );
};

export default SuccessMessage;
