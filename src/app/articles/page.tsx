import { getArticles } from "@/actions/articles/articles";
import BackgroundSection from "@/components/bgsection";
import Footer from "@/components/footer";
import HeaderSection from "@/components/headersection";
import BlogCard from "@/components/ui/blogcard";
import BorderDivider from "@/components/ui/borderdivider";
import SearchBar from "@/components/ui/searchbar";
import React from "react";

const page = async ({ params }: any) => {
  const articles = await getArticles(params.search);

  return (
    <div className="pb-[5px]">
      <HeaderSection>
        <div className="text-[2rem] border-b-[3px] mb-[1rem] pr-[3rem] w-fit border-b-black">Articles</div>
        <div className="flex flex-col md:flex-row items-start justify-between gap-[2rem]">
          <div className="text-black/70 text-[0.9rem] max-w-[600px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit ipsa blanditiis obcaecati tempore ullam, ab voluptates labore animi fugit culpa quibusdam dolorum
            iste id! Impedit quidem veniam at enim incidunt!
          </div>
          <SearchBar text="Search" className="md:w-[300px]" />
        </div>
      </HeaderSection>
      <BorderDivider />
      <BackgroundSection
        image="/images/bg_2_skull_design.png"
        imageStyle={{
          WebkitMaskImage: "linear-gradient(to bottom,rgba(0,0,0,0) ,rgba(0,0,0,1) 20%,rgba(0,0,0,1) 80%,rgba(0,0,0,0))",
          maskImage: "linear-gradient(to bottom,rgba(0,0,0,0) ,rgba(0,0,0,1) 20%,rgba(0,0,0,1) 80%),rgba(0,0,0,0)",
        }}
        containerClassName="mx-[10px]"
        className="flex max-w-[1200px] mx-auto flex-wrap gap-[2rem] justify-center items-center py-[2rem]"
      >
        {articles?.map((article: any,i:any) => (
          <BlogCard key={i} href={`/articles/${article.slug}`} title={article.title} image={article?.image}>
            {article?.description}
          </BlogCard>
        ))}
      </BackgroundSection>
      <div className="m-[10px]">
        <Footer />
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic'

export default page;
