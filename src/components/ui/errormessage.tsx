import React from "react";
import { MdError } from "react-icons/md";

const ErrorMessage = (props: any) => {
  const { className, children,iconSize } = props;
  return (
    <div className={`${className} flex justify-start items-center text-start pl-[10px] text-red-400 font-['Helvetica'] text-[0.8rem]`}>
      <MdError size={iconSize} className="inline-block mr-[5px] text-[1.2rem]" />
      <div>{children}</div>
    </div>
  );
};

export default ErrorMessage;
