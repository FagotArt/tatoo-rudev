import React from "react";

const BackgroundTitle = (props: any) => {
  const { children, className,containerClassName, ...rest } = props;
  return (
    <div
      className={`${containerClassName} p-[2px] flex justify-center items-center rounded-[1rem] border-[1px] border-black bg-[linear-gradient(to_top,rgba(255,255,255,0.2),gray,white,gray,rgba(255,255,255,0.2))]`}
      {...rest}
    >
      <div className={`${className} flex flex-1 justify-center items-center bg-gradient-to-b from-white to-[#C7C7C7] text-black rounded-[1rem] overflow-hidden px-[2rem] py-[5px]`}>{children}</div>
    </div>
  );
};

export default BackgroundTitle;
