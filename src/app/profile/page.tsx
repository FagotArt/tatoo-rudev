"use client";
import AuthenticatedSection from "@/components/authenticatedsection";
import BackgroundSection from "@/components/bgsection";
import BorderDecorations from "@/components/decoration/borderdecorations";
import Footer from "@/components/footer";
import Button from "@/components/ui/Button";
import BorderDiv from "@/components/ui/borderdiv";
import BorderDivider from "@/components/ui/borderdivider";
import Divider from "@/components/ui/divider";
import ProfilePicture from "@/components/ui/profilepicture";
import RoundedTitle from "@/components/ui/roundedtitle";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FavoriteArtist from "./favoriteArtist";
import { modal } from "@/lib/utils/modal";
import { getMyContacts } from "@/actions/user/unlock";
import Loader from "@/components/ui/loader";

import { MdAlternateEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { TfiUnlock } from "react-icons/tfi";

import Link from "next/link";

const page = () => {
  const router = useRouter();
  const session = useSession();
  const user: any = session?.data?.user;

  const myContactsList = async () => {
    await modal({
      Element: ({ proceed }: any) => {
        const [unlocks, setUnlocks] = useState<any>();
        const [loading, setLoading] = useState<boolean>(true);

        const fetchArtists = async () => {
          setLoading(true);
          const res = await getMyContacts();
          setUnlocks(res);
          setLoading(false);
        };

        useEffect(() => {
          fetchArtists();
        }, []);

        return (
          <div className="max-w-full max-h-[calc(100vh-100px)] overflow-auto">
            <div className="font-bold text-[2rem] mb-[1rem] text-center">My Artist Contact List</div>
            <div>
              {loading ? (
                <div className="w-full h-[200px] flex justify-center items-center">
                  <Loader color="black" />
                </div>
              ) : (
                unlocks?.map((unlock: any) => (
                  <Link
                    key={unlock._id}
                    href={unlock.unlockAll ? '/artists' : `/artists/${unlock?.artist?.username}`}
                    className="flex duration-300 hover:translate-y-[-5px] cursor-pointer mb-[1rem] border-[1px] border-black/10 items-center justify-start gap-[1rem] p-[1rem] rounded-[10px] shadow-lg"
                  >
                    <div>{unlock.unlockAll ? 
                    <div
                      className='w-[60px] flex justify-center'
                    >
                      <TfiUnlock size={50} />
                    </div>
                     : <ProfilePicture noBorder image={unlock?.artist?.profilePicture} className="w-[60px] h-[60px]" />}</div>
                    <div className="border-l-[1px] border-l-black/10 flex-1 pl-[1rem]">
                      {unlock.unlockAll ? (
                        <div className="font-bold ml-[0.5rem] text-[1.2rem] text-left">All Artists Are Unlocked</div>
                      ) : (
                        <>
                          <div className="font-bold ml-[0.5rem] text-[1rem] text-left">{unlock?.artist?.firstName + " " + unlock?.artist?.lastName}</div>
                          <div className="p-[0.5rem] text-[0.9rem] text-left">
                            <div>
                              <MdAlternateEmail className="inline-block mr-[5px]" />
                              {unlock?.artist?.contactInfo?.email}
                            </div>
                            <div>
                              <FaPhoneAlt className="inline-block mr-[5px]" />
                              {unlock?.artist?.contactInfo?.phone}
                            </div>
                            <div>
                              <FaFacebookF className="inline-block mr-[5px]" />
                              {unlock?.artist?.contactInfo?.facebook}
                            </div>
                            <div>
                              <FaInstagram className="inline-block mr-[5px]" />
                              {unlock?.artist?.contactInfo?.instagram}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="p-[10px]">
      <AuthenticatedSection className="pt-[150px]" user={user}>
        <BackgroundSection className="md:pt-[150px] flex flex-col md:flex-row items-stretch" image="/images/bg_right_skull_design.png">
          <div className="relative min-w-[200px] p-[2rem]">
            <BorderDecorations className="hidden md:block" rightBorder />
            <ProfilePicture noBorder image={user?.profilePicture} imageClassName="mx-auto relative" className="mx-auto w-[200px] h-[200px] mt-[20px] z-[10]" />
            <BorderDiv
              className="mb-[1rem] max-h-[200px] font-['Helvetica'] overflow-auto"
              contentClassName="text-white text-[0.9rem] p-[1rem] min-h-[100px] bg-[linear-gradient(to_bottom,#3B3B3B,#141414)]"
            >
              <div>
                <span className="font-bold">Name:</span>
                <span className="ml-[10px]">{user?.firstName + " " + user?.lastName}</span>
              </div>
              <div>
                <span className="font-bold">Email Address:</span>
                <span className="ml-[10px]">{user?.email}</span>
              </div>
              <div>
                <span className="font-bold">Phone Number:</span>
                <span className="ml-[10px]">{user?.phoneNumber}</span>
              </div>
            </BorderDiv>
            <Divider className="!mb-[1rem]" />
            <Button
              containerClassName="w-full"
              onClick={() => {
                router.push("/settings");
              }}
            >
              Edit Profile
            </Button>
          </div>
          <div className="flex-1">
            <div className="relative p-[1rem]">
              <div className="text-5xl mb-[0.5rem]">My Account</div>
              <div className="font-['Helvetica']">{user?.role}</div>
            </div>
            <BorderDivider className="w-[calc(100%-2px)] !mx-0 opacity-[0.5]" />
            <div className="p-[1rem] pl-0">
              <RoundedTitle className="mb-[2rem]">Favorites</RoundedTitle>
              <BorderDivider className="opacity-[0.5]" />
              <div className="p-[1rem]">
                <div className="font-['Helvetica'] text-[0.9rem] mb-[1rem]">Favorite Artists</div>
                <div className="flex gap-[1rem] items-center justify-start ">
                  {user?.favorites?.map((fav: any) => (
                    <FavoriteArtist id={fav} />
                  ))}
                </div>
              </div>
              <BorderDivider className="opacity-[0.5] mb-[1rem]" />
              <Button onClick={myContactsList} containerClassName="ml-[1rem]">
                My Artist Contact List
              </Button>
            </div>
          </div>
        </BackgroundSection>
      </AuthenticatedSection>
      <div className="mx-[3px]">
        <Footer />
      </div>
    </div>
  );
};

export default page;
