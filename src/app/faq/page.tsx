import BackgroundSection from "@/components/bgsection";
import Footer from "@/components/footer";
import Card from "@/components/ui/card";
import Divider from "@/components/ui/divider";
import FaqSection from "@/components/ui/faqsection";
import SearchBar from "@/components/ui/searchbar";
import React from "react";
import { PiScrollDuotone } from "react-icons/pi";

const page = () => {
  return (
    <div>
      <BackgroundSection
        image="/images/bg_right_skull_design.png"
        containerClassName="pt-[200px] pb-[4rem]"
        imageStyle={{
          WebkitMaskImage: "linear-gradient(to top,rgba(0,0,0,0),rgba(0,0,0,1) 30%)",
          maskImage: "linear-gradient(to top,rgba(0,0,0,0),rgba(0,0,0,1) 30%)",
        }}
      >
        <div className="text-center text-[1.3rem]">Hi, How can we help you ?</div>
        <Divider className="max-w-[20rem] !mb-[2rem]" />
        <SearchBar text="Search" containerClassName="mx-auto md:min-w-[30rem] mb-[2rem]" />
        <div className="flex flex-wrap justify-center items-center gap-[1rem]">
          <Card className="flex flex-col justify-center items-center gap-[10px]" innerClassName="px-[3rem]">
            <PiScrollDuotone size={50} />
            Billing
          </Card>
          <Card className="flex flex-col justify-center items-center gap-[10px]" innerClassName="px-[3rem]">
            <PiScrollDuotone size={50} />
            Billing
          </Card>
          <Card className="flex flex-col justify-center items-center gap-[10px]" innerClassName="px-[3rem]">
            <PiScrollDuotone size={50} />
            Billing
          </Card>
          <Card className="flex flex-col justify-center items-center gap-[10px]" innerClassName="px-[3rem]">
            <PiScrollDuotone size={50} />
            Billing
          </Card>
          <Card className="flex flex-col justify-center items-center gap-[10px]" innerClassName="px-[3rem]">
            <PiScrollDuotone size={50} />
            Billing
          </Card>
        </div>
      </BackgroundSection>
      <BackgroundSection 
        imageStyle={{
            WebkitMaskImage: "linear-gradient(to bottom,rgba(0,0,0,0) ,rgba(0,0,0,1) 20%,rgba(0,0,0,1) 80%,rgba(0,0,0,0))",
            maskImage: "linear-gradient(to bottom,rgba(0,0,0,0) ,rgba(0,0,0,1) 20%,rgba(0,0,0,1) 80%),rgba(0,0,0,0)",
        }}
        image="/images/bg_2_skull_design.png" 
        className="flex justify-center items-center py-[2rem] px-[2rem] gap-[1rem]"
      >
        <div
        >
            <div
                className="text-[1.5rem] font-bold"
            >
                Frequently Asked Question
            </div>
            <div
                className="text-[0.9rem] text-white/70 font-['Helvetica']"
            >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur quia ab soluta delectus vel natus voluptatem voluptates aliquid officia animi molestiae dignissimos exercitationem facilis eos quibusdam, aperiam, similique unde blanditiis.
            </div>
        </div>
        <div>
          <FaqSection className="border-t-[1px] py-[10px] border-t-white" title="lorem ipsum dolor sit">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae illo voluptas suscipit, non est illum praesentium id dolores at. Consequuntur, earum suscipit tempore
            laborum magni doloremque quis ducimus veniam impedit!
          </FaqSection>
          <FaqSection className="border-t-[1px] py-[10px] border-t-white" title="lorem ipsum dolor sit">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae illo voluptas suscipit, non est illum praesentium id dolores at. Consequuntur, earum suscipit tempore
            laborum magni doloremque quis ducimus veniam impedit!
          </FaqSection>
          <FaqSection className="border-t-[1px] py-[10px] border-t-white" title="lorem ipsum dolor sit">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae illo voluptas suscipit, non est illum praesentium id dolores at. Consequuntur, earum suscipit tempore
            laborum magni doloremque quis ducimus veniam impedit!
          </FaqSection>
          <FaqSection className="border-t-[1px] py-[10px] border-t-white" title="lorem ipsum dolor sit">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae illo voluptas suscipit, non est illum praesentium id dolores at. Consequuntur, earum suscipit tempore
            laborum magni doloremque quis ducimus veniam impedit!
          </FaqSection>
          <FaqSection className="border-t-[1px] py-[10px] border-t-white" title="lorem ipsum dolor sit">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae illo voluptas suscipit, non est illum praesentium id dolores at. Consequuntur, earum suscipit tempore
            laborum magni doloremque quis ducimus veniam impedit!
          </FaqSection>
        </div>
      </BackgroundSection>
      <Footer />
    </div>
  );
};

export default page;
