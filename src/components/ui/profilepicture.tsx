"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import ErrorMessage from "./errormessage";
import { modal } from "@/lib/utils/modal";
import AvatarEditor from "react-avatar-editor";
import Button from "./Button";
import RangeInput, { SingleRangeInput } from "./rangeinput";
import { FaCheck, } from "react-icons/fa";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";

const ProfilePicture = (props: any) => {
  const { className, imageClassName, error, image, noBorder, edit, onImageChange, ...rest } = props;
  const fileInputRef = useRef<any>(null);
  const [imageSrc, setImageSrc] = useState<any>(image);
  const avatarRef = useRef<any>();

  useEffect(() => {
    setImageSrc(image);
  }, [image]);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0] as File;
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event: any) => {
        //popout cropper
        const img = await modal({
          Element: ({ proceed }: any) => {
            const [zoom, setZoom] = useState([1]);
            return (
              <div>
                <div
                  className="mb-[1rem]"
                >
                  <AvatarEditor ref={avatarRef} image={event.target.result} width={250} height={250} borderRadius={150} scale={zoom?.[0]} rotate={0} />
                </div>
                <div
                  className="flex gap-[1rem] justify-between items-center"
                >
                  <div
                    className="flex-1"
                  >
                    <SingleRangeInput className='w-full' step={0.1} min={1} max={2} value={zoom} onChange={setZoom} />
                  </div>
                  <IoMdClose 
                  className='cursor-pointer text-[1.7rem]'
                    onClick={() => {
                      proceed(null);
                    }}
                  />
                  <IoMdCheckmark 
                    className='cursor-pointer text-[1.7rem]'
                    onClick={() => {
                      proceed(avatarRef.current.getImage().toDataURL())
                    }}
                  />
                </div>
              </div>
            );
          },
        });

        if (!img) {
          return;
        }

        onImageChange({
          type: "file",
          fileName: file.name,
          fileType: file.type,
          file: img,
        });
        setImageSrc(img);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  return (
    <>
      <div
        onClick={
          edit
            ? () => {
                fileInputRef.current && fileInputRef.current.click();
              }
            : undefined
        }
        className={` ${className} ${edit ? "cursor-pointer [&:hover>.image-selector]:opacity-[1] [&:hover>.image-remover]:opacity-[1]" : ""} relative rounded-full`}
        {...rest}
      >
        {edit && imageSrc && (
          <IoMdTrash
            onClick={(e: any) => {
              e.stopPropagation();
              onImageChange(null);
              setImageSrc(null);
            }}
            size={30}
            className="image-remover opacity-0 rounded-full z-[11]  shadow-lg absolute bottom-[20%] left-[10%] cursor-pointer bg-black duration-300 hover:bg-white hover:text-black p-[0.5rem] w-[40px] h-[40px]"
          />
        )}
        {edit && (
          <>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/png, image/jpeg, image/jpg" />
            <div className="image-selector absolute z-[10] top-[1%] left-[8%] w-[86%] rounded-full opacity-0 h-[85%] bg-black/50 duration-300 flex justify-center items-center">
              <FaCamera size={30} />
            </div>
          </>
        )}
        {!noBorder && <img src="/images/profile_picture_border.png" alt="profile picture border" className="absolute top-0 left-0 w-full h-full" />}
        {/* {imageSrc ? ( */}
        <img
          className={`${imageClassName} bg-[linear-gradient(to_bottom,#EFEFEF,#BFBFBF)] object-cover w-[85%] h-[85%] rounded-full absolute top-[1%] left-[1%]`}
          src={imageSrc || "/images/placeholder/person.png"}
        />
        {/* ) : (
          <div className={`${imageClassName} bg-[url('/images/placeholder/person.png')] bg-cover bg-center object-cover w-[85%] h-[85%] rounded-full absolute top-[1%] left-[1%]`}></div>
        )} */}
      </div>
      {error && error !== "" && <ErrorMessage className={`${className} mt-[-10px]`}>{error}</ErrorMessage>}
    </>
  );
};

export default ProfilePicture;
