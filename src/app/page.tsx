import Footer from "@/components/footer";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/ui/blogcard";
import Card from "@/components/ui/card";
import Divider from "@/components/ui/divider";
import FaqSection from "@/components/ui/faqsection";
import StyleCard from "@/components/ui/stylecard";
import { HomeSearch } from "./homeclient";
import Link from "next/link";
import { getArticles } from "@/actions/articles/articles";

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className={`min-h-[100vh] w-full`}>
      <img
        className="w-full object-contain object-top"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0))",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0))",
        }}
        src="/images/hero_section.png"
      />
      <HomeSearch />
      <div className="w-[20rem] mx-auto mb-[2rem]">
        <div className="text-[1.3rem] font-bold font-['Helvetica']">I AM</div>
        <div className="font-bold text-5xl text-center">
          <strong className="bg-[linear-gradient(to_top,gray_40%,white_60%,gray)] bg-clip-text text-transparent">LOOKING</strong>
        </div>
      </div>
      <div className="text-center px-[2rem] font-['Helvetica'] mb-[4rem] max-w-[1000px] mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit qui earum, dolorem nulla odio aspernatur temporibus quia omnis, in assumenda alias ullam cumque consequatur
        dolor corporis culpa officia quasi facere!
      </div>
      <div className="px-[2rem] flex justify-center items-center flex-wrap gap-[3rem] mb-[5rem]">
        <Card href="/signup/customer" className="text-center max-w-[600px] cursor-pointer">
          <img src="/images/icons/looking_for_artist.png" className="h-[10rem] mb-[1rem] mx-auto" />
          <div className="text-[1.3rem] font-bold mb-[1rem]">i'm looking for an artist</div>
          <div className="font-['Helvetica'] text-[0.9rem]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda debitis ut nam eum accusantium amet, aut sequi et ab! A quam ipsam porro officiis molestias
            doloribus nobis similique necessitatibus fugiat.
          </div>
        </Card>
        <Card href="/signup/artist" className="text-center max-w-[600px] cursor-pointer">
          <img src="/images/icons/looking_for_costumer.png" className="h-[10rem] pt-[2rem]  mb-[1rem] mx-auto" />
          <div className="text-[1.3rem] font-bold mb-[1rem]">i'm an artist</div>
          <div className="font-['Helvetica'] text-[0.9rem]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda debitis ut nam eum accusantium amet, aut sequi et ab! A quam ipsam porro officiis molestias
            doloribus nobis similique necessitatibus fugiat.
          </div>
        </Card>
      </div>
      <div className="relative mb-[5rem]">
        <img
          src="/images/bg_2_skull_design_tb.png"
          className="absolute top-0 left-0 w-full h-full object-cover object-top"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,1) 20%,rgba(0,0,0,1) 80%, rgba(0,0,0,0))",
            maskImage: "linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,1) 20%,rgba(0,0,0,1) 80%, rgba(0,0,0,0))",
          }}
        />
        <div className="relative z-10">
          <div className="text-center px-[2rem] text-4xl mb-[2rem] mx-auto font-bold">Common Styles</div>
          <div className="flex justify-center items-center flex-wrap gap-[2rem] relative p-[2rem] max-w-[1200px] mx-auto">
            <StyleCard title="Geometric" image="/images/tattoo.jpg" />
            <StyleCard title="Dotwork" image="/images/tattoo.jpg" />
            <StyleCard title="Watercolor" image="/images/tattoo.jpg" />
            <StyleCard title="Anime" image="/images/tattoo.jpg" />
            <StyleCard title="Neotraditional" image="/images/tattoo.jpg" />
            <StyleCard title="Floral" image="/images/tattoo.jpg" />
          </div>
          <Link href="/artists" className="text-center text-[1.3rem] px-[2rem] font-['Helvetica'] mb-[2rem] mx-auto cursor-pointer flex items-center justify-center gap-[5px]">
            See More <span className="text-[0.8rem] font-bold">{">"}</span>
          </Link>
        </div>
      </div>
      <div className="mb-[5rem]">
        <div className="text-center px-[2rem] text-4xl mb-[3rem] mx-auto font-bold">Featured Blog Articles</div>
        <div className="mb-[2rem] max-w-[1200px] mx-auto flex flex-wrap gap-[1rem] justify-center items-center">
          {articles &&
            articles.length > 0 &&
            articles?.map((article) => (
              <BlogCard key={article.id} title={article.title} image={article.image}>
                {article.description}
              </BlogCard>
            ))}
        </div>
        <Link href="/articles" className="text-center text-[1.3rem] px-[2rem] font-['Helvetica'] mb-[2rem] mx-auto cursor-pointer flex items-center justify-center gap-[5px]">
          Read More Articles <span className="text-[0.8rem] font-bold">{">"}</span>
        </Link>
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-[2rem] mx-auto px-[2rem] max-w-[1500px] items-stretch mb-[5rem]">
        <div className="max-w-[500px] py-[2rem] min-w-[300px]">
          <div className="text-[2.3rem] font-bold">Frequently Asked Questions</div>
          <div className="text-white/50 leading-[1.2rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nobis necessitatibus officiis eius fugiat ipsam, odit amet magnam dolorem quia ea adipisci id aperiam
            dolores omnis quisquam voluptate, incidunt dolorum.
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
      </div>
      <Divider />
      <div className="flex flex-wrap md:flex-nowrap justify-center px-[2rem] mb-[5rem] max-w-[1500px] mx-auto gap-[2rem]">
        <div className="md:w-[50%] min-w-[300px]">
          <img src="/images/tattoo.jpg" className="ml-auto w-[400px] h-[400px] md:w-[500px] md:h-[600px] object-cover rounded-[1rem]" />
        </div>
        <div className="md:w-[50%] text-center md:text-start">
          <div className="text-[2.3rem] mb-[20px] font-bold">About Us</div>
          <div className="mb-[20px] text-white/90 font-['Helvetica'] leading-[1.2rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nobis necessitatibus officiis eius fugiat ipsam, odit amet magnam dolorem quia ea adipisci id aperiam
            dolores omnis quisquam voluptate, incidunt dolorum.
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sequi, corporis molestiae incidunt esse nulla, iste odit deleniti natus, vel dolorem? Reprehenderit
            atque doloribus ratione dolorem! Aut cupiditate ipsam nesciunt.
          </div>
          <div className="flex w-full justify-center md:justify-start">
            <Button href="/about" className="px-[2rem]">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      <div className="mb-[5rem]">
        <div className="text-center px-[2rem] text-4xl mb-[3rem] mx-auto font-bold">Country Guide</div>
      </div>
      <Footer />
    </div>
  );
}
