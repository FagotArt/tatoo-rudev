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
import { Type, genders, styles, tattooThemes } from "@/lib/global/styles";
import { Locations } from "@/lib/global/locations";

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

  const formatField = (field: string, global: any) => {
    // global is an array of objects each containing 'label' and 'value', find the object with the matching value and return the label
    const found = global.find((item: any) => item.value === field);
    return found?.label || field;
  };

  return (
    <div className="pb-[10px]">
      <HeaderSection>
        <div className="flex justify-between gap-[10px] flex-wrap">
          <div className="md:max-w-[500px]">
            <div className="font-bold text-[2rem] mb-[1rem]">{
            artist?.obfuscatedName || artist?.firstName + " " + artist?.lastName + "'s Portfolio"}</div>
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
                  <span className="mr-[10px]">Ratings</span> <Rating rating={artist?.averageRating} size={20} color="white" />{" "}
                  <span className="ml-[10px] text-white/50">({artist?.totalRatings || 0})</span>
                </div>
                <div className="font-bold">
                  <Favorite id={artist?._id} />
                </div>
              </div>
              <Contact art={artist} />
            </div>
          </div>
          <div className="flex flex-col gap-[10px] px-[10px] min-w-[200px] md:min-w-[300px]">
            <BackgroundTitle containerClassName="flex-x-1">Styles :</BackgroundTitle>
            <div className="rounded-b-[1rem] bg-white/80 text-black py-[1rem] mt-[-1.5rem] w-full  pl-[1.5rem] text-[0.9rem]">
              {artist?.styles?.map((style: any, i: any) => (
                <div key={i} className="font-['Helvetica']">
                  &#x2022; {formatField(style, styles)}
                </div>
              ))}
            </div>
            <BackgroundTitle containerClassName="flex-x-1">Tattoo Themes :</BackgroundTitle>
            <div className="rounded-b-[1rem] bg-white/80 text-black py-[1rem] mt-[-1.5rem] w-full  pl-[1.5rem] text-[0.9rem]">
              {artist?.tattooThemes?.map((theme: any, i: any) => (
                <div key={i} className="font-['Helvetica']">
                  &#x2022; {formatField(theme, tattooThemes)}
                </div>
              ))}
            </div>
            <BackgroundTitle containerClassName="flex-x-1">Type :</BackgroundTitle>
            <div className="rounded-b-[1rem] bg-white/80 text-black py-[1rem] mt-[-1.5rem] w-full  pl-[1.5rem] text-[0.9rem]">
              {artist?.type?.map((type: any, i: any) => (
                <div key={i} className="font-['Helvetica']">
                  &#x2022; {formatField(type, Type)}
                </div>
              ))}
            </div>
            <BackgroundTitle containerClassName="flex-x-1">Artist Gender :</BackgroundTitle>
            <div className="rounded-b-[1rem] bg-white/80 text-black py-[1rem] mt-[-1.5rem] w-full  pl-[1.5rem] text-[0.9rem] font-['Helvetica']">
              {formatField(artist?.gender, genders)}
            </div>
            <BackgroundTitle containerClassName="flex-x-1">Location :</BackgroundTitle>
            <div className="rounded-b-[1rem] bg-white/80 text-black py-[1rem] mt-[-1.5rem] w-full  pl-[1.5rem] text-[0.9rem] font-['Helvetica']">
              {artist?.location?.map((loc: any, i: any) => (
                <div key={i} className="font-['Helvetica']">
                  &#x2022; {formatField(loc, Locations)}
                </div>
              ))}
            </div>
            <BackgroundTitle containerClassName="flex-x-1">Hourly Rate :</BackgroundTitle>
            <div className="rounded-b-[1rem] bg-white/80 text-black py-[1rem] mt-[-1.5rem] w-full  pl-[1.5rem] text-[0.9rem] font-['Helvetica']">
              {artist?.hourlyRate ? `£${artist?.hourlyRate} / hour` : "Not Available"}
            </div>
            <BackgroundTitle containerClassName="flex-x-1">Walk-ins Accepted :</BackgroundTitle>
            <div className="rounded-b-[1rem] bg-white/80 text-black py-[1rem] mt-[-1.5rem] w-full  pl-[1.5rem] text-[0.9rem] font-['Helvetica']">
              {artist?.walkInsAccepted ? "Yes" : "No"}
            </div>
          </div>
        </div>
        <Divider className="mb-[2rem]" />
        <Reviews id={artist?._id} />
      </BackgroundSection>
      <div className="mx-[10px]">
        <Footer />
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default page;
