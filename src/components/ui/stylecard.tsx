"use client";
import Link from "next/link";
import React from "react";

const StyleCard = (props: any) => {
  const { href } = props;

  const Container = (props: any) => {
    if (href) {
      return <Link href={href}>{props.children}</Link>;
    } else {
      return <>{props.children}</>;
    }
  };

  return (
    <Container className={props.className}>
      <div
        className={`relative text-center text-[1.8rem] w-[350px] h-[220px] rounded-[1rem] cursor-pointer flex justify-center items-center`}
        style={{
          background: `linear-gradient(to top,rgba(0,0,0,0.3),rgba(0,0,0,0.5)),url('${props.image || ""}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {props.title}
      </div>
    </Container>
  );
};

export default StyleCard;
