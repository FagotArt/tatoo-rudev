import BackgroundSection from "@/components/bgsection";
import Footer from "@/components/footer";
import HeaderSection from "@/components/headersection";
import Button from "@/components/ui/Button";
import BigTitle from "@/components/ui/bigtitle";
import BorderDivider from "@/components/ui/borderdivider";
import Divider from "@/components/ui/divider";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textarea";
import React from "react";

const page = () => {
  return (
    <div>
      <HeaderSection className="pt-[140px]"></HeaderSection>
      <BorderDivider />
      <BigTitle className="mt-[-60px] z-[10]">About Us</BigTitle>
      <BackgroundSection
        image="/images/bg_2_skull_design.png"
        imageStyle={{
          WebkitMaskImage: "linear-gradient(to bottom,rgba(0,0,0,0) ,rgba(0,0,0,1) 20%,rgba(0,0,0,1) 80%,rgba(0,0,0,0))",
          maskImage: "linear-gradient(to bottom,rgba(0,0,0,0) ,rgba(0,0,0,1) 20%,rgba(0,0,0,1) 80%),rgba(0,0,0,0)",
        }}
        containerClassName="mx-[10px]"
        className="mt-[-60px] pt-[100px]"
      >
        <div className="font-['Helvetica']  max-w-[min(90%,600px)] mx-auto mb-[2rem]">
          Safety and peace of mind is at the heart of the inspiration for Inkformed Tattoos. We are here to provide all the information you need to make an informed choice.
          <br />
          <br />
          Using our filters, you will be able to find the most suitable artist for you piece. And we connect you right to them!
          <br />
          <br />
          We provide information and guidance to create a complete and informed tattoo experience.
        </div>
        <div className="text-[1.5rem] text-center font-bold mb-[1rem]">Want to send us a message?</div>
        <Divider className="!mb-[1rem] w-[20rem]" />
        <form action={`https://formsubmit.co/${process.env.NEXT_PUBLIC_SUBMIT_EMAIL}`} method="POST">
          <Input type='text' name='name' label="Name" containerClassName="md:min-w-[400px] mb-[1rem] mx-auto" />
          <TextArea name='message' containerClassName="min-w-[350px] md:min-w-[400px] mb-[1rem] mx-auto" placeHolder="Message..." inputClassName="h-[200px]" />
          <Button type='submit' containerClassName="mx-auto" className="mx-auto px-[4rem]">
            Submit
          </Button>
        </form>
      </BackgroundSection>
      <div className="mx-[10px] ">
        <Footer />
      </div>
    </div>
  );
};

export default page;
