'use client'
import { modal } from "@/lib/utils/modal";
import React, { useEffect, useRef, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoMdTrash } from "react-icons/io";
import ErrorMessage from "./errormessage";
import { FaCircleChevronRight } from "react-icons/fa6";
import { FaCircleChevronLeft } from "react-icons/fa6";

export const PortfolioPopup = (props: any) => {
  const { images, className, close, initialIndex } = props;
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex || 0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={`relative w-[90vw] max-w-[1200px] flex flex-col gap-[1rem] p-[2rem] h-[90vh] max-h-[800px] ${className}`}>
      <div className="w-[calc(100%-6rem)] mx-auto flex-1 relative overflow-hidden">
        {images?.map((image: any, index: number) => (
          <img
            key={index}
            src={image}
            className={`absolute w-full h-full object-contain transition-transform duration-300`}
            style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
          />
        ))}
      </div>
      <FaCircleChevronLeft
          size={40}
          onClick={goToPrevious}
          className="text-white absolute left-0 top-[40%] -translate-y-1/2 opacity-[0.5] cursor-pointer duration-300 hover:opacity-[1]"
        />
        <FaCircleChevronRight size={40} onClick={goToNext} className="text-white absolute right-0 top-[40%] -translate-y-1/2 opacity-[0.5] cursor-pointer duration-300 hover:opacity-[1]" />
      <div className="overflow-hidden flex justify-start gap-[1rem]">
        <div
          className="flex justify-center items-center gap-[1rem] duration-300"
          style={{
            transform: `translateX(calc(-${currentIndex} * calc(100px + 1rem)))`,
          }}
        >
          {images?.map((image: any, index: number) => (
            <PortfolioImage
              key={index}
              image={image}
              onClick={() => setCurrentIndex(index)}
              className={`w-[100px] h-[100px] duration-0 ${index === currentIndex ? "border-[2px] border-white" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const PortfolioImage = (props: any) => {
  const { image, edit, onRemove, error, className, onClick } = props;

  return (
    <>
      <div
        onClick={onClick}
        className={`${className} rounded-[1rem] relative duration-300 hover:bg-white/30 [&:hover>.plus-icon]:scale-[1.1] [&:hover>.remove-icon]:opacity-[1] cursor-pointer bg-white/20 flex items-center justify-center`}
      >
        {!image ? (
          <FaCirclePlus className="plus-icon scale-[1] duration-300" size={30} />
        ) : (
          <>
            {edit && (
              <IoMdTrash
                onClick={onRemove}
                size={30}
                className="remove-icon opacity-0 rounded-full z-[11] shadow-lg absolute top-0 right-0 cursor-pointer bg-red-500 duration-300 text-white hover:bg-red-400 p-[0.5rem] w-[40px] h-[40px] translate-y-[-30%] translate-x-[30%]"
              />
            )}
            <img className="w-full h-full object-cover rounded-[1rem]" src={image} />
          </>
        )}
      </div>
      {error && error !== "" && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

const PortfolioEditor = (props: any) => {
  const { images, onChange, errors, className } = props;
  const [internalImages, setInternalImages] = useState(images);
  const [internalImageSrc, setImageSrc] = useState<any>(images);
  const fileInputRef = useRef<any>(null);

  useEffect(() => {
    setInternalImages(images);
    setImageSrc(images);
  }, [images]);

  const handleAddImage = async () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleRemoveImage = (index: number) => (e: any) => {
    e.stopPropagation();
    const newImages = [...internalImages];
    const newImageSrc = [...internalImageSrc];
    newImages.splice(index, 1);
    newImageSrc.splice(index, 1);
    if (newImages.length === 0) {
      setInternalImages(null);
      setImageSrc(null);
      onChange && onChange(null);
    } else {
      setInternalImages(newImages);
      setImageSrc(newImageSrc);
      onChange && onChange(newImageSrc);
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0] as File;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        onChange &&
          onChange([
            ...(internalImageSrc || []),
            {
              type: "file",
              fileName: file.name,
              fileType: file.type,
              file: event.target.result,
            },
          ]);
        setImageSrc([
          ...(internalImageSrc || []),
          {
            type: "file",
            fileName: file.name,
            fileType: file.type,
            file: event.target.result,
          },
        ]);
        setInternalImages([...(internalImages || []), event.target.result]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  const handleImageClick = (index: any) => async () => {
    await modal({
      Element: ({ proceed }: any) => (
        <PortfolioPopup
          close={() => {
            proceed(false);
          }}
          images={internalImages}
          initialIndex={index}
        />
      ),
      raw: true,
      includeCloseButton: true,
    });
  };

  return (
    <div className={`${className} flex w-full flex-wrap justify-start items-center gap-[1rem]`}>
      <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/png, image/jpeg, image/jpg" />
      {internalImages?.map((image: any, index: number) => (
        <PortfolioImage
          error={errors?.[index]?.error}
          edit
          className="w-[200px] h-[300px]"
          onRemove={handleRemoveImage(index)}
          key={index}
          image={image}
          onClick={handleImageClick(index)}
        />
      ))}
      <PortfolioImage className="w-[200px] h-[300px]" edit onClick={handleAddImage} />
    </div>
  );
};

export default PortfolioEditor;
