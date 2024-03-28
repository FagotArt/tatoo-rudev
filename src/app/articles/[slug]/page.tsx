import { getArticle } from "@/actions/articles/articles";
import HeaderSection from "@/components/headersection";
import BorderDivider from "@/components/ui/borderdivider";
import Divider from "@/components/ui/divider";
import React from "react";
import "react-quill/dist/quill.snow.css";

const page = async ({ params }: any) => {
  const { slug } = params;

  const article = await getArticle(slug);

  if (!article) {
    <div>
      <HeaderSection>
        <div className="text-[2rem] border-b-[3px] mb-[1rem] pr-[3rem] w-fit border-b-black">Article not found</div>
        <div className="flex items-start justify-between gap-[2rem]">
          {/* <div className="text-black/70 text-[0.9rem] max-w-[600px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit ipsa blanditiis obcaecati tempore ullam, ab voluptates labore animi fugit culpa quibusdam dolorum
            iste id! Impedit quidem veniam at enim incidunt!
          </div> */}
        </div>
      </HeaderSection>
    </div>;
  }

  return (
    <div className="pb-[5rem]">
      <HeaderSection>
        <div className="text-[2rem] border-b-[3px] mb-[1rem] pr-[3rem] w-fit border-b-black font-bold">{article?.title}</div>
        <div className="flex items-start justify-between gap-[2rem]">
          <div className="text-black/70 text-[0.9rem] max-w-[600px]">{article?.description}</div>
        </div>
      </HeaderSection>
      <BorderDivider />
      <div className="max-w-[1000px] mx-auto md:py-[1rem]">
        <img src={article?.image} className="rounded-[1rem] overflow-hidden px-[12px] md:px-[2rem] mb-[2rem] mx-auto w-full object-cover object-center" />
        <div
          className={`ql-editor mx-auto mb-[2rem]
          [&>h1]:text-[2rem] md:[&>h1]:text-[3rem] [&>h1]:font-bold
          [&>h2]:text-[1.5rem] md:[&>h2]:text-[1.5rem] [&>h2]:font-bold
          [&>p]:font-['Helvetica']
          !px-[2rem]
        `}
          dangerouslySetInnerHTML={{
            __html: article?.content,
          }}
        ></div>
        <Divider className="mb-[4rem]" />
        <div className="flex justify-between items-center text-white px-[2rem]">
          <div className="text-[0.9rem] text-white/70">Published by {article?.author}</div>
          <div className="text-[0.9rem] text-white/70">{new Date(article?.createdAt).toDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default page;
