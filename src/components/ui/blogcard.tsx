import Link from "next/link";
import React from "react";

interface BlogCardProps {
  title: string;
  href?: string;
  image?: string;
  children?: React.ReactNode;
}

const BlogCard = (props: BlogCardProps) => {

  const Container = (pr: any) => {
    if (pr.href) {
      return <Link href={pr.href}>{pr.children}</Link>;
    } else {
      return <>{pr.children}</>;
    }
  };

  return (
    <Container href={props.href}>
      <div
        className={
          "cursor-pointer overflow-hidden flex flex-col justify-end items-start w-[350px] h-[400px] rounded-[1rem] bg-white " +
          "[&>.content]:bg-white [&>.content]:flex-1 [&>.content>.expandable]:flex-1 [&>.content>.line]:bg-black [&>.content]:text-black [&>.content>.expandable]:grid-rows-[1fr] " +
          "max-[788px]:[&>.content]:bg-white max-[788px]:[&>.content]:flex-1 max-[788px]:[&>.content>.expandable]:flex-1 max-[788px]:[&>.content>.line]:bg-black max-[788px]:[&>.content]:text-black max-[788px]:[&>.content>.expandable]:grid-rows-[1fr]"
        }
        style={{
          background: `linear-gradient(to top,rgba(255,255,255,0.3),rgba(0,0,0,0.5)),url('${props.image || ""}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-[1rem] w-full content duration-300 max-h-[50%] flex flex-col">
          <div className="mb-[5px] text-[1.2rem]">{props.title}</div>
          <div className="h-[2px] w-[100px] bg-white mb-[10px] line duration-300"></div>
          <div className="grid overflow-hidden duration-200 grid-rows-[0fr] expandable">
            <div className="min-h-0 text-black/50 text-[0.9rem] leading-[1rem] max-h-[3rem] font-['Helvetica'] line-clamp-3">{props.children}</div>
          </div>
          <div className="font-['Helvetica'] text-[1.1rem]">Read More {">"}</div>
        </div>
      </div>
    </Container>
  );
};

export default BlogCard;
