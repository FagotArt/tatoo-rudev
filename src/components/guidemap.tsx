import { modal } from "@/lib/utils/modal";
import useMediaQuery from "@/lib/utils/useMediaQuery";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { IoExpand } from "react-icons/io5";

const GuideMap = (props: any) => {
  const { containerClassName, width = 500, className } = props;
  const height = width * 0.5625;
  const mobile = useMediaQuery("(max-width: 640px)");
  const enlarge = async () => {
    //get current screen width and height
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    await modal({
      Element: ({ proceed }: any) => {
        return (
          <div className="w-full">
            <div
              className="flex-1 rounded-[1rem] overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: `
            <iframe
                width="${screenWidth}px"
                height="${mobile ? screenHeight * 0.7 : screenHeight}px"
              id="embedded-project-iframe"
              title="Inkformed Tattoos Country Guide"
              src="//my.visme.co/_embed/w49834dk-inkformed-tattoos-country-guide"
              style="border:0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowfullscreen=""
            ></iframe> 
            `,
              }}
            ></div>
          </div>
        );
      },
      raw: true,
      includeCloseButton: true,
    });
  };

  return (
    <div
      className={`w-fit flex justify-center items-center p-[1px] rounded-[1rem] border-[1px] border-black bg-[linear-gradient(to_top,rgba(255,255,255,0.2),gray,white,gray,rgba(255,255,255,0.2))] ${containerClassName}`}
    >
      <div
        className={`flex-1 relative shadow-[0px_0px_5px_0px_rgba(0,0,0,0.5)_inset] bg-white text-black border-[1px] border-black duration-100 hover:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)_inset] rounded-[1rem] flex justify-start items-center gap-[1rem] ${className}`}
      >
        <img src="/images/border_corner.png" className="absolute bottom-[-10px] left-[-10px] z-10 h-[30px] scale-y-[-1]" />
        <img src="/images/border_corner.png" className="absolute bottom-[-10px] right-[-10px] scale-x-[-1] scale-y-[-1] z-10 h-[30px]" />
        <Link
          target="_blank"
          href="https://my.visme.co/view/w49834dk-18r27veq3e3y26qz"
          className="absolute bottom-[-2.5rem] right-[50%] translate-x-[50%] z-20 cursor-pointer hover:opacity-80 duration-300"
        >
          <IoExpand className="text-white/80" size={25} />
        </Link>
        <div
          className="flex-1 rounded-[1rem] overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: `
            <iframe
                width="${width}px"
                height="${height}px"
              id="embedded-project-iframe"
              title="Inkformed Tattoos Country Guide"
              src="//my.visme.co/_embed/w49834dk-inkformed-tattoos-country-guide"
              style="border:0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowfullscreen=""
            ></iframe> 
            `,
          }}
        ></div>
      </div>
    </div>
  );
};

export default GuideMap;
