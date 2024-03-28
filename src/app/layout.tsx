import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Inkformed",
  description: "Inkformed Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      <script src="//my.visme.co/visme-embed.js"></script>
      </head>
      <body className="relative min-h-[100vh] bg-[url('/images/smoke_bg.png')] bg-fixed">
        <Providers>
          <div className="relative overflow-hidden">
            <img src="/images/border_corner.png" className="absolute top-[5px] left-[5px] z-10 h-[30px]" />
            <img src="/images/border_corner.png" className="absolute top-[5px] right-[5px] scale-x-[-1] z-10 h-[30px]" />
            <img src="/images/line_border.png" className="absolute top-[15px] left-[10px] z-[9] rotate-[-90deg] w-[5px] h-[calc(100vw-40px)] origin-top-left" />
            <img src="/images/line_border.png" className="absolute top-[15px] left-[10px] z-[9] w-[5px] h-[calc(100%-40px)]" />
            <img src="/images/line_border.png" className="absolute top-[15px] right-[10px] z-[9] w-[5px] h-[calc(100%-40px)]" />
            <img src="/images/border_corner.png" className="absolute bottom-[5px] left-[5px] z-10 h-[30px] scale-y-[-1]" />
            <img src="/images/border_corner.png" className="absolute bottom-[5px] right-[5px] scale-x-[-1] scale-y-[-1] z-10 h-[30px]" />
            <img src="/images/line_border.png" className="absolute bottom-[15px] left-[10px] z-[9] rotate-[90deg] w-[5px] h-[calc(100vw-40px)] origin-bottom-left" />
            <NavBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
