import HeaderSection from "@/components/headersection";
import StyleCard from "@/components/ui/stylecard";
import React from "react";

const Page = () => {
  return (
    <div>
      <HeaderSection>
        <div className="text-center mx-auto text-[2rem] mb-[1rem] w-fit">Styles and Themes</div>
      </HeaderSection>
      <div>
        <div className="relative z-10 py-[1rem]">
          <div className="text-center px-[2rem] text-4xl mb-[2rem] mx-auto font-bold">Styles</div>
          <div className="mb-[3rem] flex justify-center items-center flex-wrap gap-[2rem] relative p-[2rem] max-w-[1200px] mx-auto">
            <StyleCard href="/artists?styles=disney" title="Disney" image="/images/styles/disney.jpg" />
            <StyleCard href="/artists?styles=ornamental" title="Ornamental" image="/images/styles/ornamental.jpg" />
            <StyleCard href="/artists?styles=realism" title="Realism" image="/images/styles/realism.jpg" />
            <StyleCard href="/artists?styles=abstract" title="Abstract" image="/images/styles/abstract.jpg" />
            <StyleCard href="/artists?styles=dot-work" title="Dot Work" image="/images/styles/dot-work.png" />
            <StyleCard href="/artists?styles=black-and-gray" title="Black and Gray" image="/images/styles/black-and-gray.jpg" />
            <StyleCard href="/artists?styles=anime-comic-book" title="Anime/Comic Book" image="/images/styles/anime-comic-book.jpg" />
            <StyleCard href="/artists?styles=engraving-woodcut" title="Engraving Woodcut" image="/images/styles/engraving-woodcut.jpg" />
            <StyleCard href="/artists?styles=biomechanical" title="Biomechanical" image="/images/styles/biomechanical.jpg" />
            <StyleCard href="/artists?styles=traditional" title="Traditional" image="/images/styles/traditional.jpg" />
            <StyleCard href="/artists?styles=ignorant" title="Ignorant" image="/images/styles/ignorant.jpg" />
            <StyleCard href="/artists?styles=mandala" title="Mandala" image="/images/styles/mandala.jpg" />
            <StyleCard href="/artists?styles=nordic" title="Nordic" image="/images/styles/nordic.jpg" />
            <StyleCard href="/artists?styles=glitch" title="Glitch" image="/images/styles/glitch.jpg" />
            <StyleCard href="/artists?styles=large-scale" title="Large Scale" image="/images/styles/large-scale.jpg" />
            <StyleCard href="/artists?styles=chicano" title="Chicano" image="/images/styles/chicano.png" />
            <StyleCard href="/artists?styles=new-school" title="New School" image="/images/styles/new-school.png" />
            <StyleCard href="/artists?styles=neo-japanese" title="Neo Japanese" image="/images/styles/neo-japanese.jpg" />
            <StyleCard href="/artists?styles=japanese" title="Japanese" image="/images/styles/japanese.jpg" />
            <StyleCard href="/artists?styles=graffiti" title="Graffiti" image="/images/styles/graffiti.jpg" />
            <StyleCard href="/artists?styles=calligraphy" title="Calligraphy" image="/images/styles/calligraphy.png" />
            <StyleCard href="/artists?styles=trash-polka" title="Trash Polka" image="/images/styles/trash-polka.jpg" />
            <StyleCard href="/artists?styles=chrome-effect" title="Chrome Effect" image="/images/styles/chrom-effect.jpg" />
            <StyleCard href="/artists?styles=fine-line" title="Fine Line" image="/images/styles/fine-line.jpg" />
            <StyleCard href="/artists?styles=illustrative" title="Illustrative" image="/images/styles/illustrative.jpg" />
            <StyleCard href="/artists?styles=surrealism" title="Surrealism" image="/images/styles/surrealism.png" />
            <StyleCard href="/artists?styles=celtic" title="Celtic" image="/images/styles/celtic.jpg" />
            <StyleCard href="/artists?styles=maori" title="Maori" image="/images/styles/maori.jpg" />
            <StyleCard href="/artists?styles=polynesian" title="Polynesian" image="/images/styles/polynesian.jpg" />
            <StyleCard href="/artists?styles=tribal" title="Tribal" image="/images/styles/tribal.jpg" />
            <StyleCard href="/artists?styles=neo-traditional" title="Neo Traditional" image="/images/styles/neo-traditional.jpg" />
            <StyleCard href="/artists?styles=geometric" title="Geometric" image="/images/styles/geometric.jpg" />
            <StyleCard href="/artists?styles=black-work" title="Black Work" image="/images/styles/black-work.jpg" />
            <StyleCard href="/artists?styles=watercolour" title="Watercolour" image="/images/styles/watercolour.jpg" />
          </div>
          <div className="text-center px-[2rem] text-4xl mb-[2rem] mx-auto font-bold">Themes</div>
          <div className="flex justify-center items-center flex-wrap gap-[2rem] relative p-[2rem] max-w-[1200px] mx-auto">
            <StyleCard href="/artists?tattooThemes=animals" title="Animals" image="/images/styles/animals.jpg" />
            <StyleCard href="/artists?tattooThemes=nature" title="Nature" image="/images/styles/nature.jpg" />
            <StyleCard href="/artists?tattooThemes=fantasy" title="Fantasy" image="/images/styles/fantasy.jpg" />
            <StyleCard href="/artists?tattooThemes=skulls-and-skeletons" title="Skulls And Skeletons" image="/images/styles/skulls-and-skeletons.jpg" />
            <StyleCard href="/artists?tattooThemes=mythology" title="Mythology" image="/images/styles/mythology.jpg" />
            <StyleCard href="/artists?tattooThemes=celestial" title="Celestial" image="/images/styles/celestial.jpg" />
            <StyleCard href="/artists?tattooThemes=portrait" title="Portrait" image="/images/styles/portrait.png" />
            <StyleCard href="/artists?tattooThemes=religious-and-spiritual" title="Religious and Spiritual" image="/images/styles/religious-and-spiritual.jpg" />
            <StyleCard href="/artists?tattooThemes=pop-culture" title="Pop Culture" image="/images/styles/pop-culture.jpg" />
            <StyleCard href="/artists?tattooThemes=music" title="Music" image="/images/styles/music.png" />
            <StyleCard href="/artists?tattooThemes=travel" title="Travel" image="/images/styles/travel.jpg" />
            <StyleCard href="/artists?tattooThemes=quotes-and-text" title="Quotes and Text" image="/images/styles/quotes-and-text.jpg" />
            <StyleCard href="/artists?tattooThemes=sci-fi" title="Sci-Fi" image="/images/styles/sci-fi.jpg" />
            <StyleCard href="/artists?tattooThemes=steampunk" title="Steampunk" image="/images/styles/steampunk.jpg" />
            <StyleCard href="/artists?tattooThemes=sport" title="Sport" image="/images/styles/sport.jpg" />
            <StyleCard href="/artists?tattooThemes=horoscope-and-zodiac" title="Horoscope and Zodiac" image="/images/styles/horoscope-and-zodiac.jpg" />
            <StyleCard href="/artists?tattooThemes=food-and-drink" title="Food and Drink" image="/images/styles/food-and-drink.png" />
            <StyleCard href="/artists?tattooThemes=love-and-relationships" title="Love and Relationships" image="/images/styles/love-and-relationships.jpg" />
            <StyleCard href="/artists?tattooThemes=political-and-social-statements" title="Political and Social Statements" image="/images/styles/political-and-social-statements.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
