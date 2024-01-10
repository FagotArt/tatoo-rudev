"use client";
import React, { useState, useEffect } from "react";
import { IoMdStar } from "react-icons/io";

const Rating = (props: any) => {
  const [ratingNumber, setRatingNumber] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { className, size,rating, edit, onChange, color } = props;

  useEffect(() => {
    setRatingNumber(rating);
  }, [rating]);

  const handleRating = (rate: any) => {
    setRatingNumber(rate);
    if (edit && onChange) {
      onChange(rate);
    }
  };

  const handleHover = (rate: any) => {
    setHoverRating(rate);
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div onMouseEnter={() => handleHover(i)} className="cursor-pointer" key={i} onClick={() => edit && handleRating(i)}>
          {i <= ratingNumber || (edit && i <= hoverRating) ? (
            <IoMdStar
            size={size ||25}
              key={i}
              className="text-[1.2rem]"
              style={{
                color: color || "black",
              }}
            />
          ) : (
            <IoMdStar
                size={size ||25}
              key={i}
              className="text-[1.2rem] opacity-[0.4]"
              style={{
                color: color || "black",
              }}
            />
          )}
        </div>
      );
    }
    return stars;
  };

  return (
    <div
      onMouseLeave={() => {
        if (edit) {
          handleHover(0);
        }
      }}
      className={`${className} flex w-fit`}
    >
      {renderStars()}
    </div>
  );
};

export default Rating;
