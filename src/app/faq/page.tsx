import BackgroundSection from "@/components/bgsection";
import Footer from "@/components/footer";
import Divider from "@/components/ui/divider";
import FaqSection from "@/components/ui/faqsection";
import React from "react";

const page = () => {
  return (
    <div>
      <BackgroundSection
        image="/images/bg_right_skull_design.png"
        containerClassName="pt-[200px]"
        imageStyle={{
          WebkitMaskImage: "linear-gradient(to top,rgba(0,0,0,0),rgba(0,0,0,1) 30%)",
          maskImage: "linear-gradient(to top,rgba(0,0,0,0),rgba(0,0,0,1) 30%)",
        }}
      >
        <div className="text-center text-[1.3rem]">Hi, How can we help you ?</div>
        <Divider className="max-w-[20rem] !mb-[2rem]" />
      </BackgroundSection>
      <BackgroundSection
        imageStyle={{
          WebkitMaskImage: "linear-gradient(to bottom,rgba(0,0,0,0) ,rgba(0,0,0,1) 20%,rgba(0,0,0,1) 80%,rgba(0,0,0,0))",
          maskImage: "linear-gradient(to bottom,rgba(0,0,0,0) ,rgba(0,0,0,1) 20%,rgba(0,0,0,1) 80%),rgba(0,0,0,0)",
        }}
        image="/images/bg_2_skull_design.png"
        className="flex justify-center items-stretch py-[2rem] px-[2rem] gap-[1rem]"
      >
        <div className="max-w-[400px]">
          <div className="text-[1.5rem] font-bold">Frequently Asked Questions</div>
        </div>
        <div className="max-w-[calc(100%-400px)]">
        <FaqSection className="border-t-[1px] py-[10px] border-t-white" title="How to Choose">
            Choosing an artist that is right for you is an underrated task. We have created this guide to help you to make an informed decision.
            <br />
            <br />
            You no longer have to search the internet for ratings then social media for the portfolio and then search up how to choose and read countless articles about your
            worries.
            <br />
            <br />
            You also have the option to choose artists that align with your values such as vegan studios or choose consciously to support communities such as the LGBTQ+ community
            or to support a POC.
            <br />
            <br />
            Everything you need is now all in one place!
          </FaqSection>
          <FaqSection className="border-t-[1px] py-[10px] border-t-white" title="Our Questions for You">
            What styles do you like? If you’re not sure what different styles are out there, then look at our styles guide.
            <br />
            <br />
            What Themes do you like the idea of? Maybe you already have an idea? If not, then browse the filters to see what takes your fancy.
            <br />
            <br />
            Do you just want a tattoo or an added experience? Maybe you’d like a stick and poke or a bamboo tattoo… or the good old traditional tattoo gun ☺ Maybe you’d be more
            comfortable with a Male artist or maybe you want to support an LGBTQ+ owned business. Whatever you want, you can find it here.
            <br />
            <br />
            How much would you like to spend? Please see our price guidance.
            <br />
            <br />
            Where do you want it? You can have an idea; you can have a few ideas; you can also speak to the professional and see where the artist thinks your design will be best
            placed. They know what they are doing and after all, you are already putting a lot of trust in that person. ☺
          </FaqSection>
          <FaqSection className="border-t-[1px] py-[10px] border-t-white" title="What Do People Worry About?">
            Will I become less employable?
            <br />
            <br />
            No, you won’t. Tattoos have become much more accepted and 26-40% of the British public have tattoos. This has risen from 16% back in 2012!
            <br />
            <br />
            Will it become infected?
            <br />
            <br />
            Between 0.5 and 6% of tattoos get infected. It is important to follow your tattoo artist aftercare guidance to prevent this.
            <br />
            <br />
            You can also check out our tattoo care guide.
            <br />
            <br />
            What if I regret it?
            <br />
            <br />
            This is why we created this tool. Making the right decision is really important! It is possible to regret a tattoo and consider a cover-up or removal, however, choosing
            the right artist who understands your vision and who will best advise is a great way to avoid regret.
          </FaqSection>
          <FaqSection className="border-t-[1px] py-[10px] border-t-white" title="Tattoo Themes">
            The theme and style of a tattoo are different things. If you are unsure what you want, it may be easier to think of a theme you would like. This will help to narrow
            down your search. Once you know what theme you want, you can look at what style you feel would best suit that theme.
            <div className="pl-[1rem]">
              <br />
              &#x2022; Nature
              <br />
              &#x2022; Animals
              <br />
              &#x2022; Fantasy
              <br />
              &#x2022; Skulls and Skeletons
              <br />
              &#x2022; Mythology
              <br />
              &#x2022; Celestial
              <br />
              &#x2022; Religious and Spiritual
              <br />
              &#x2022; Portraits
              <br />
              &#x2022; Pop Culture
              <br />
              &#x2022; Music
              <br />
              &#x2022; Travel
              <br />
              &#x2022; Quotes and Text
              <br />
              &#x2022; Sci-Fi
              <br />
              &#x2022; Steampunk
              <br />
              &#x2022; Sports
              <br />
              &#x2022; Horoscope and Zodiac
              <br />
              &#x2022; Food and Drink
              <br />
              &#x2022; Love and Relationships
              <br />
              &#x2022; Political and Social Statements
              <br />
            </div>
          </FaqSection>
          <FaqSection className="border-t-[1px] py-[10px] border-t-white" title="Tattoo Styles">
            It is important to research styles and know what kind of style you would like. Some people may choose to have multiple tattoos of different styles, others may choose
            one style and theme and continue to get tattoos that match this style and theme throughout their tattoo journey. Tattoo styles often have certain imagery typically
            associated with that style of tattoo. However, this doesn’t confine you to this style, nor does the image you want determine your style. Finding a talented artist will
            allow you to choose any design and theme in any style!
            <div className="pl-[1rem]">
              <br />
              &#x2022; Traditional (American Traditional or Old School)
              <br />
              &#x2022; Realism (Photorealism)
              <br />
              &#x2022; Watercolour
              <br />
              &#x2022; Blackwork
              <br />
              &#x2022; Dot work
              <br />
              &#x2022; Ornamental
              <br />
              &#x2022; Geometric
              <br />
              &#x2022; Neo-Traditional
              <br />
              &#x2022; Japanese (Irezumi)
              <br />
              &#x2022; Tribal
              <br />
              &#x2022; Polynesian
              <br />
              &#x2022; Maori
              <br />
              &#x2022; Celtic
              <br />
              &#x2022; Biomechanical
              <br />
              &#x2022; Surrealism
              <br />
              &#x2022; Abstract
              <br />
              &#x2022; Illustrative
              <br />
              &#x2022; Minimalist
              <br />
              &#x2022; Fine Line
              <br />
              &#x2022; Ignorant style
              <br />
              &#x2022; Chrome affect
              <br />
              &#x2022; Trash Polka
              <br />
              &#x2022; Black and Grey
              <br />
              &#x2022; Calligraphy
              <br />
              &#x2022; Graffiti
              <br />
              &#x2022; Neo-Japanese
              <br />
              &#x2022; New School
              <br />
              &#x2022; Chicano
              <br />
              &#x2022; Mandala
              <br />
              &#x2022; Comic Book Style
              <br />
              &#x2022; Large Scale
              <br />
              &#x2022; Engraved/wood cut
              <br />
              &#x2022; Glitch tattoos
              <br />
              &#x2022; Disney
              <br />
              &#x2022; Nordic
            </div>
          </FaqSection>
          <FaqSection className="border-t-[1px] py-[10px] border-t-white" title="Tattoo Types">
            Artists charge different hourly rates. It would be unfair to say “you get what you paid for” as there are many factors influencing the price such as:
            <div className="pl-[1rem]">
              <br />
              &#x2022; Location
              <br />
              &#x2022; Demand
              <br />
              &#x2022; Skill
              <br />
              &#x2022; Style
              <br />
              &#x2022; Experience
              <br />
              &#x2022; Type (e.g. a cover-up tattoo may cost more)
            </div>
            <br />
            Choosing a tattoo purely for the cheap cost might however be a bad idea. It is important to research an artist's portfolio, reviews, and qualifications before making a
            decision. That is why we have all of this information in one place for you! You should expect to pay around £50- £150 per hour. There are much more expensive tattoos
            and there are cheaper ones too. You will get discounted prices if you are being tattooed by an apprentice.
          </FaqSection>
        </div>
      </BackgroundSection>
      <Footer />
    </div>
  );
};

export default page;
