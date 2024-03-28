import React from "react";

const Divider = (props: any) => {
  const { className } = props;
  return (
    <div className={`${className} max-w-[min(1500px,90%)] flex justify-center items-center mx-auto mb-[5rem] gap-[2rem]`}>
      <div className="bg-white/70 h-[2px] flex-1"></div>
      <div className="h-[15px] w-[15px] rounded-full border-[2px] border-white/80"></div>
      <div className="bg-white/70 h-[2px] flex-1"></div>
    </div>
  );
};

export default Divider;
