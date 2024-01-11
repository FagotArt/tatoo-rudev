"use client";
import GuideMap from "@/components/guidemap";
import Divider from "@/components/ui/divider";
import useMediaQuery from "@/lib/utils/useMediaQuery";
import React from "react";

const Section = ({ title, children }: any) => {
  return (
    <div
        className="max-w-[300px] md:max-w-[500px]"
    >
      <div className="p-[1rem] w-full border-b-[1px] border-white font-bold mb-[1rem] text-[1.2rem]">{title}</div>
      <div className="font-['Helvetica']">{children}</div>
    </div>
  );
};

const Page = () => {
  const mobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="py-[120px]">
      <div className="text-4xl mb-[2rem] text-center font-bold">Country Guide</div>
      <Divider className="max-w-[200px] !mb-[2rem]" />
      <GuideMap width={mobile ? 300 : 700} containerClassName="mx-auto mb-[3rem]" />
      <div className="max-w-[calc(1000px+2rem)] mx-auto flex justify-center items-start flex-wrap flex-col md:flex-row gap-[1rem] md:gap-[2rem]">
        <Section title="Tattoo Etiquette">Dos and don&apos;ts related to tattoos in various countries can help you to navigate your tattoo experiences respectfully.</Section>
        <Section title="Legal Considerations">
          Tattoo laws and regulations can vary from country to country.
          <br />
          Information on legal aspects, such as age restrictions and required consent, will help you comply with local regulations.
        </Section>
        <Section title="Pre-Travel Preparation">
          If you plan to get a tattoowhile traveling, this guide can help you be prepared, informed, and aware of what to expect in your destination country.
        </Section>
        <Section title="Respectful Engagement">
          Understanding cultural norms and customs can help clients engage with local artists and communities in a respectful and positive manner.
        </Section>
        <Section title="Cultural Exchange">
          Tattoo laws and regulations can vary from country to country. Information on legal aspects such as age restrictions and required consent, will help you comply with local
          regulations.
        </Section>
      </div>
    </div>
  );
};

export default Page;
