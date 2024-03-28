import React from "react";
import { ImQuotesLeft } from "react-icons/im";
import Rating from "./rating";

const ArtistTestimonial = (props: any) => {
  const { className,rating, username, time, children, containerClassName, ...rest } = props;
  return (
    <div
      className={`${containerClassName} p-[3px] w-fit flex justify-center items-center border-[1px] border-black bg-[linear-gradient(to_top,rgba(255,255,255,0.2),gray,white,gray,rgba(255,255,255,0.2))] rounded-[1rem] `}
    >
      <div className={`${className} relative pt-[40px] w-[250px] h-[200px] flex-1 bg-gradient-to-b from-white to-[#C7C7C7] text-black  rounded-[1rem]`}>
        <div
            className="absolute border-[2px] flex justify-center items-center border-white top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80px] h-[80px] rounded-full bg-gradient-to-b from-[#050505] to-[#2A2A2A]"
        >
            <ImQuotesLeft className="text-[2.5rem] text-[#C7C7C7]" />
        </div>
        <div className="text-center p-[1rem]">{children}</div>
        <div className="flex p-[1rem] gap-[1rem] justify-between items-center">
          <div>
            <div>{username}</div>
            <div className="text-[0.9rem] text-black/60">{time}</div>
          </div>
          <Rating 
            size={20}
            rating={rating}
          />
        </div>
      </div>
    </div>
  );
};

export default ArtistTestimonial;
