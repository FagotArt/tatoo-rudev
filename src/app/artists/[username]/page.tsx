import { getArtistByUsername } from "@/actions/artists/getartists";
import BackgroundSection from "@/components/bgsection";
import HeaderSection from "@/components/headersection";
import BackgroundTitle from "@/components/ui/backgroundtitle";
import BorderDivider from "@/components/ui/borderdivider";
import CheckBox from "@/components/ui/checkbox";
import ProfilePicture from "@/components/ui/profilepicture";
import React from "react";
import Divider from "@/components/ui/divider";
import ArtistTestimonial from "@/components/ui/artisttestimonial";
import Footer from "@/components/footer";
import Contact from "./contact";
import { PortfolioPopup } from "@/components/ui/portfolioeditor";
import Favorite from "./client";
import Reviews from "./reviews";
import Rating from "@/components/ui/rating";

const page = async ({ params }: any) => {
  const artist = await getArtistByUsername(params.username);

  if (!artist || artist?.error) {
    return (
      <div className="pb-[10px]">
        <HeaderSection>
          <div className="flex justify-between gap-[10px] flex-wrap">
            <div className="md:max-w-[500px]">
              <div className="font-bold text-[2rem] mb-[1rem]">{artist?.error || "Artist not found"}</div>
              <div className="font-['Helvetica'] text-black/60">{artist?.message || "The artist you are looking for does not exist."}</div>
            </div>
          </div>
        </HeaderSection>
      </div>
    );
  }
  return (
    <div className="pb-[10px]">
      <HeaderSection>
        <div className="flex justify-between gap-[10px] flex-wrap">
          <div className="md:max-w-[500px]">
            <div className="font-bold text-[2rem] mb-[1rem]">{artist?.firstName + " " + artist?.lastName}</div>
            <div className="font-['Helvetica'] text-black/60">{artist?.bio}</div>
          </div>
          <ProfilePicture image={artist?.profilePicture} className="mb-[-150px] translate-y-[50px] w-[250px] h-[250px] z-[10] mr-[-2rem]" />
        </div>
      </HeaderSection>
      <BorderDivider />
      <BackgroundSection containerClassName="mx-[10px]" image="/images/bg_2_skull_design.png">
        <div className="mb-[2rem] pt-[200px] px-[1rem] flex flex-wrap justify-center gap-[1rem]">
          <div className="flex-1">
            <div className="max-w-[800px] mx-auto">
              {/* <Image image={artist?.images?.[0]} containerClassName="w-full h-[300px] mb-[1rem]" />
              <div className="flex flex-wrap justify-between gap-[5px]">
                {artist?.images?.slice(1).map((image: any) => (
                  <Image image={image} containerClassName="w-[32%] h-[200px] mb-[1rem]" />
                ))}
              </div> */}
              {artist?.images && artist.images.length > 0 && (
                <>
                  <div className="flex justify-center items-start h-full max-w-[500px] md:max-w-[800px] relative">
                    <PortfolioPopup images={artist?.images} className="w-full max-w-[90vw] md:max-w-[500px]  px-0 !h-[500px] md:h-[500px]" />
                  </div>
                  <BorderDivider className="mb-[1rem]" />
                </>
              )}
              <div className=" flex mb-[2rem] justify-between items-center font-['Helvetica']">
                <div className="flex justify-start items-center">
                  <span className="mr-[10px]">Ratings</span> <Rating rating={artist?.averageRating} size={20} color='white' /> <span className="ml-[10px] text-white/50">({artist?.totalRatings || 0})</span>
                </div>
                <div className="font-bold">
                  <Favorite 
                    id={artist?._id}
                  />
                </div>
              </div>
              <Contact art={artist} />
            </div>
          </div>
          <div className="flex flex-col gap-[10px] px-[10px] min-w-[200px] md:min-w-[300px]">
            <BackgroundTitle containerClassName="flex-x-1">Styles :</BackgroundTitle>
            <div className="w-[250px] pl-[1.5rem] text-[0.9rem]">
              {artist?.styles?.map((style: any) => (
                <div className="font-['Helvetica']">{style}</div>
              ))}
            </div>
            <BackgroundTitle containerClassName="flex-x-1">Type :</BackgroundTitle>
            <div className="w-[250px] pl-[1.5rem] text-[0.9rem] font-['Helvetica']">{artist?.tattooType}</div>
            <BackgroundTitle containerClassName="flex-x-1">Artist Gender :</BackgroundTitle>
            <div className="w-[250px] pl-[1.5rem] text-[0.9rem] font-['Helvetica']">{artist?.gender === "m" ? "Male" : "Female"}</div>
            <BackgroundTitle containerClassName="flex-x-1">Location :</BackgroundTitle>
            <div className="w-[250px] pl-[1.5rem] text-[0.9rem] font-['Helvetica']">{artist?.location}</div>
            <BackgroundTitle containerClassName="flex-x-1">Hourly Rate :</BackgroundTitle>
            <div className="w-[250px] pl-[1.5rem] text-[0.9rem] font-['Helvetica']">{artist?.hourlyRate ? `$${artist?.hourlyRate} / hour` : "Not Available"}</div>
            <BackgroundTitle containerClassName="flex-x-1">Walk-ins Accepted :</BackgroundTitle>
            <div className="w-[250px] pl-[1.5rem] text-[0.9rem] font-['Helvetica']">{artist?.walkInsAccepted ? "Yes" : "No"}</div>
          </div>
        </div>
        <Divider className='mb-[2rem]' />
          <Reviews 
            id={artist?._id}
          />
      </BackgroundSection>
      <div className="mx-[10px]">
        <Footer />
      </div>
    </div>
  );
};

export default page;
