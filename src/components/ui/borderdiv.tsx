import React from "react";

const BorderDiv = (props: any) => {
  const { children, className, contentClassName, ...rest } = props;
  return (
    <div {...rest} className={`${className}  p-[1px] bg-[linear-gradient(to_top,rgba(255,255,255,0.2),gray,white,gray,rgba(255,255,255,0.2))] flex justify-center rounded-[1rem] items-center`}>
      <div
        className={`${contentClassName} shadow-[0px_0px_5px_0px_rgba(0,0,0,0.5)_inset] border-[1px] border-black bg-white flex-1 min-h-[100%] rounded-[1rem] p-[10px] border-[rgba(0,0,0,0.5)] text-black duration-300`}
      >
        {children}
      </div>
    </div>
  );
};

export default BorderDiv;
