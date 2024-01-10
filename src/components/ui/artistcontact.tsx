import React from "react";

export const ArtistContactIcon = (props: any) => {
  const { children } = props;
  return <div className="p-[5px] text-[1.5rem] text-black bg-white rounded-full flex items-center justify-center">{children}</div>;
};

export const ArtistContactInfo = (props: any) => {
  const { children } = props;
  return <div className="flex-1 px-[1rem] text-[1.1rem] font-bold font-['Helvetica'] text-start">{children}</div>;
};

const ArtistContact = (props: any) => {
  const { className, children, containerClassName, Icon, ...rest } = props;
  return <div className={`${className} min-w-[200px] border-[2px] border-white rounded-[2rem] flex items-center`}>{children}</div>;
};

export default ArtistContact;
