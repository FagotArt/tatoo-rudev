"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import ErrorMessage from "./errormessage";


const ProfilePicture = (props: any) => {
  const { className, imageClassName, error, image, noBorder, edit, onImageChange, ...rest } = props;
  const fileInputRef = useRef<any>(null);
  const [imageSrc, setImageSrc] = useState<any>(image);

  useEffect(() => {
    setImageSrc(image);
  }, [image]);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0] as File;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        onImageChange({
          type: "file",
          fileName: file.name,
          fileType: file.type,
          file: event.target.result,
        });
        setImageSrc(event.target.result);
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
        {imageSrc ? (
          <img
            className={`${imageClassName} bg-[linear-gradient(to_bottom,#EFEFEF,#BFBFBF)] object-cover w-[85%] h-[85%] rounded-full absolute top-[1%] left-[1%]`}
            src={imageSrc}
          />
        ) : (
          <div className={`${imageClassName} bg-[linear-gradient(to_bottom,#EFEFEF,#BFBFBF)] object-cover w-[85%] h-[85%] rounded-full absolute top-[1%] left-[1%]`}></div>
        )}
      </div>
      {error && error !== "" && <ErrorMessage className={`${className} mt-[-10px]`}>{error}</ErrorMessage>}
    </>
  );
};

export default ProfilePicture;
