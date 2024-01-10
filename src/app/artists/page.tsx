import BackgroundSection from "@/components/bgsection";
import BorderDecorations from "@/components/decoration/borderdecorations";
import Footer from "@/components/footer";
import HeaderSection from "@/components/headersection";
import BorderDivider from "@/components/ui/borderdivider";
import React from "react";
import ArtistCard from "@/components/ui/artistcard";
import { getArtists } from "@/actions/artists/getartists";
import { CategoriesFilter, FavoriteFilter, LocationFilter, SearchBarFilter, SortByFilter } from "./filters";
import SideBar from "./sidebar";

const Page = async ({ params, searchParams }: any) => {

  const artists = await getArtists({
    filter:searchParams
  });

  return (
    <div className="pb-[10px]">
      <HeaderSection>
        <div className="mb-[1rem]">
          <SearchBarFilter />
        </div>
        <div className="relative z-[20] flex flex-col gap-[1rem] md:gap-0 md:flex-row justify-between items-center">
          <div className="relative z-[20] flex gap-[2rem] items-center">
            <LocationFilter />
          </div>
          <div className="relative flex flex-col-reverse md:flex-row gap-[1rem] md:gap-[2rem] items-center">
            <FavoriteFilter />
            <SortByFilter />
          </div>
        </div>
      </HeaderSection>
      <BorderDivider />
      <div className="mx-[10px] bg-black">
        <BackgroundSection image="/images/bg_right_skull_design.png">
          <div className="relative overflow-hidden max-w-full min-h-[500px] flex items-stretch">
            <SideBar />
            <div className="flex-1 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.6),rgba(0,0,0,0.4))]">
              <div className="flex flex-wrap gap-[1rem] justify-center md:justify-start items-center p-[2rem] w-fit max-w-[1200px] mx-auto">
                {(artists && artists.length > 0) ? (
                  artists.map((artist: any,i:any) => (
                    <ArtistCard
                    key={i}
                      username={artist.username}
                      image={artist.profilePicture}
                      artistName={artist.firstName + " " + artist.lastName}
                      location="Location"
                      rating={artist.averageRating}
                      styles={artist.styles?.map((style: any) => ({ label: style }))}
                    />
                  ))
                ) : (
                  <div>No Artists Found</div>
                )}
              </div>
            </div>
          </div>
        </BackgroundSection>
        <Footer />
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic'

export default Page;
