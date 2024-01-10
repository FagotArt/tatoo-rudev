import React from "react";
import Loader from "./loader";

const LoadingMessage = (props: any) => {
  const { className, children } = props;
  return (
    <div className={`${className} flex justify-start text-start pl-[10px] font-['Helvetica'] text-[0.8rem]`}>
      <Loader className="inline-block mr-[5px] text-[1.2rem]" />
      <div>{children}</div>
    </div>
  );
};

export default LoadingMessage;
