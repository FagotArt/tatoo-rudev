import React from "react";

const StyleCard = (props:any) => {
  return (
    <div className={`relative text-[1.8rem] w-[350px] h-[220px] rounded-[1rem] cursor-pointer flex justify-center items-center`}
        style={{
            background: `linear-gradient(to top,rgba(0,0,0,0.3),rgba(0,0,0,0.5)),url('${props.image || ""}')`
        }}
    >
      {props.title}
      <div className="absolute font-['Helvetica'] bottom-0 right-0 text-[rgba(255,255,255,0.2)] font-bold text-[7rem] leading-[5rem]">{props.title.substring(0, 3)}</div>
    </div>
  );
};

export default StyleCard;
