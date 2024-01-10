"use client";
import { getArtistById } from "@/actions/artists/getartists";
import ArtistContact, { ArtistContactIcon, ArtistContactInfo } from "@/components/ui/artistcontact";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ContactUnlocker from "./contactUnlocker";

const Contact = ({ art }: any) => {
  const [artist, setArtist] = useState<any>(art);
  const session = useSession();

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const artistData = await getArtistById(art?._id);
        setArtist(artistData);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    fetchArtist();
  }, [art?._id, session]);
  return (
    <>
      <div className="mb-[2rem] flex flex-wrap max-w-[500px] mx-auto justify-center gap-[10px] items-center">
        {artist?.contactInfo?.instagram && (
          <ArtistContact>
            <ArtistContactIcon>
              <FaInstagram />
            </ArtistContactIcon>
            <ArtistContactInfo>{artist?.contactInfo?.instagram}</ArtistContactInfo>
          </ArtistContact>
        )}
        {artist?.contactInfo?.facebook && (
          <ArtistContact>
            <ArtistContactIcon>
              <FaFacebookF />
            </ArtistContactIcon>
            <ArtistContactInfo>{artist?.contactInfo?.facebook}</ArtistContactInfo>
          </ArtistContact>
        )}
        {artist?.contactInfo?.phone && (
          <ArtistContact>
            <ArtistContactIcon>
              <FaPhoneAlt />
            </ArtistContactIcon>
            <ArtistContactInfo>{artist?.contactInfo?.phone}</ArtistContactInfo>
          </ArtistContact>
        )}
        {artist?.contactInfo?.email && (
          <ArtistContact>
            <ArtistContactIcon>
              <MdEmail />
            </ArtistContactIcon>
            <ArtistContactInfo>{artist?.contactInfo?.email}</ArtistContactInfo>
          </ArtistContact>
        )}
      </div>
      {!artist?.unlocked && (artist?.contactInfo?.instagram || artist?.contactInfo?.facebook || artist?.contactInfo?.phone || artist?.contactInfo?.email) && (
        <ContactUnlocker artist={artist} />
      )}
    </>
  );
};

export default Contact;
