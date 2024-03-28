"use client";
import { addReview, getReviews } from "@/actions/artists/reviews";
import { BlockedAuthenticatedSection } from "@/components/authenticatedsection";
import Button from "@/components/ui/Button";
import ArtistTestimonial from "@/components/ui/artisttestimonial";
import ErrorMessage from "@/components/ui/errormessage";
import Rating from "@/components/ui/rating";
import TextArea from "@/components/ui/textarea";
import { modal } from "@/lib/utils/modal";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { ImQuotesLeft } from "react-icons/im";

const Reviews = (props: any) => {
  const { id } = props;
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const router = useRouter();
  const fetchReviews = async () => {
    const res: any = await getReviews(id);
    if (res?.error) {
      return;
    }
    setReviews(res || []);
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  const leaveReview = async () => {
    await modal({
      Element: ({ proceed }: any) => {
        const [rev, setRev] = useState<any>({
          artist: id,
        });
        const [errors, setErrors] = useState<any>();

        const submitReview = async () => {
          const { error } = await addReview(rev);
          if (error) {
            setErrors(error);
            return;
          }

          proceed(false);
          fetchReviews();
          router.refresh();
        };

        return (
          <div className="min-w-[300px]">
            <div className="absolute top-0 left-[50%] translate-y-[-50%] translate-x-[-50%] border-[2px] flex justify-center items-center border-white  w-[80px] h-[80px] rounded-full bg-gradient-to-b from-[#050505] to-[#2A2A2A]">
              <ImQuotesLeft className="text-[2.5rem] text-[#C7C7C7]" />
            </div>
            <div>
              <div className="font-bold text-[2rem] mb-[1rem] text-center">Leave a review</div>
            </div>
            <div className="mb-[1rem]">
              <Rating
                className="mx-auto"
                edit
                onChange={(rate: any) => {
                  setRev({ ...rev, rating: rate });
                }}
                rating={rev?.rating}
              />
              {errors?.rating && errors?.rating !== "" && <ErrorMessage className={``}>{errors?.rating}</ErrorMessage>}
            </div>
            <TextArea
              error={errors?.description}
              value={rev?.description}
              onChange={(e: any) => setRev({ ...rev, description: e.target.value })}
              containerClassName="w-full mb-[1rem]"
              inputClassName=" w-full h-[200px]"
            />
            <div className="mt-[1rem] flex justify-center items-center gap-[1rem] flex-wrap">
              <Button onClick={submitReview}>Submit</Button>
              <Button onClick={() => proceed(false)}>Cancel</Button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="px-[1rem]">
      <div className="font-bold text-[2rem] mb-[3rem] text-center">Reviews</div>
      <div className="w-fit max-w-full mx-auto overflow-hidden">
        <div
          className="duration-300 mb-[1rem] pt-[2.5rem] flex justify-start gap-[10px] items-center"
          style={{
            transform: `translateX(calc(-${currentIndex} * calc(250px + 1rem)))`,
          }}
        >
          {reviews?.map((review: any,i:any) => (
            <ArtistTestimonial key={i} rating={review.rating} username={review?.user?.firstName + " " + review?.user?.lastName} time={moment(review?.createdAt).fromNow()}>
              {review?.description}
            </ArtistTestimonial>
          ))}
        </div>
      </div>
      {reviews && reviews.length > 1 && (
        <div className="mb-[2rem] flex h-[40px] justify-center items-center gap-[1rem]">
          <FaCircleChevronLeft
            size={40}
            onClick={() => {
              if (currentIndex === 0) return;
              setCurrentIndex(currentIndex - 1);
            }}
            className="text-white opacity-[0.5] cursor-pointer duration-300 hover:opacity-[1]"
          />
          <FaCircleChevronRight
            size={40}
            onClick={() => {
              if (currentIndex === reviews.length - 1) return;
              setCurrentIndex(currentIndex + 1);
            }}
            className="text-white  opacity-[0.5] cursor-pointer duration-300 hover:opacity-[1]"
          />
        </div>
      )}
      <BlockedAuthenticatedSection className="w-fit mx-auto">
        <Button containerClassName="mx-auto" className="px-[4rem]" onClick={leaveReview}>
          Leave a review
        </Button>
      </BlockedAuthenticatedSection>
    </div>
  );
};

export default Reviews;
