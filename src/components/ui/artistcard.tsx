'use client'
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdStar } from "react-icons/io";
import Rating from "./rating";

const ArtistCard = (props: any) => {
  const router = useRouter();
  const { artistName,image,username, location, styles, rating, containerClassName } = props;
  return (
    <div

      onClick={()=>{
        router.push(`/artists/${username}`)
      }}
      className={`cursor-pointer p-[1px] w-[250px] flex justify-center items-center border-[1px] border-black bg-[linear-gradient(to_top,rgba(255,255,255,0.2),gray,white,gray,rgba(255,255,255,0.2))] ${containerClassName}`}
    >
      <div className="flex flex-col flex-1 justify-start items-center">
        <img className="w-full h-[200px] object-cover" 
            src={image}
        />
        <div className="bg-white p-[10px] w-full">
          <div className="flex items-center gap-[10px] mb-[0.5rem]">
            <div className="border-b-[2px] flex-1 text-black border-black text-[1rem]">{artistName}</div>
            <div className="flex-1 flex justify-end items-center">
              <Rating rating={rating} size={20} />
            </div>
          </div>
          <div className="text-black/60 overflow-hidden font-['Helvetica'] text-[0.8rem] heading-[0.8rem] h-[80px]">
            <div>Location : {location}</div>
            <div
              className='line-clamp-3 overflow-hidden'
            >Styles : {styles?.map((style: any) => style.label).join(", ")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
