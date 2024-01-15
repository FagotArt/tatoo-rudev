"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import ProfilePicture from "./ui/profilepicture";
import { confirm } from "@/lib/utils/modal";
import { useRedirect } from "@/lib/utils/redirect/redirect";

interface NavBarProps {
  children?: React.ReactNode;
  black?: Boolean;
}

const Profile = (props: any) => {
  const router = useRouter();
  const { user } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const logout = async () => {
    const result = await confirm({ confirmation: "Are you sure you want to log out?" });
    if (result) {
      await signOut({ redirect: false });
      router.refresh();
    }
  };

  return (
    <div ref={dropdownRef} className="relative cursor-pointer" onClick={toggleDropdown}>
      <ProfilePicture image={user?.profilePicture} className="w-[100px] h-[100px] mt-[20px] z-[10] mr-[-2rem]" />
      <div
        className={`absolute shadow-[0px_20px_25px_rgba(0,0,0,0.2)] overflow-hidden right-0 top-0 mt-[120px] min-w-[150px] z-20 duration-100 grid ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 relative font-['Helvetica']">
          <div className="absolute z-[-1] w-[20px] h-[20px] top-[5px] right-[15px] bg-white rotate-[45deg]"></div>
          <div className="bg-white overflow-hidden rounded-[5px] mt-[10px]">
            <Link href={`/profile`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 duration-100 border-b-[1px] border-[rgba(0,0,0,0.1)]">
              Profile
            </Link>
            <Link href={`/settings`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 duration-100 border-b-[1px] border-[rgba(0,0,0,0.1)]">
              Settings
            </Link>
            <div onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 duration-100 border-b-[1px] border-[rgba(0,0,0,0.1)]">
              Log Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavLink = (props: any) => {
  const { children, className, ...rest } = props;
  return (
    <Link {...rest} className={`${className}`}>
      {children}
    </Link>
  );
};

const HamMenu = (props: any) => {
  const { className, open, navbarColor, ...rest } = props;

  const bgColor = navbarColor === "white" ? "bg-white" : "bg-black";
  return (
    <div {...rest} className="relative z-[21]  flex flex-col justify-between items-center gap-[5px] w-[25px]">
      <div className={`h-[2px] duration-300 w-[25px] ${open ? `bg-white rotate-[45deg] translate-y-[7px]` : `${bgColor} opacity-[0.6]`} rounded-[5px]`}></div>
      <div className={`h-[2px] duration-300 w-[25px] ${open ? `bg-white opacity-[0]` : `${bgColor} opacity-[0.6]`} rounded-[5px]`}></div>
      <div className={`h-[2px] duration-300 w-[25px] ${open ? `bg-white rotate-[-45deg] translate-y-[-7px]` : `${bgColor} opacity-[0.6]`} rounded-[5px]`}></div>
    </div>
  );
};

const NavBar = (props: NavBarProps) => {
  const { data: session }: any = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { updateRedirect } = useRedirect();
  let navbarColor = "white";

  const blackNavBarPaths = ["/articles", "/about", "/artists", "/signup", "/login",'/styles-and-themes'];

  if (blackNavBarPaths.some((path) => pathname.startsWith(path))) {
    navbarColor = "black";
  }

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed md:absolute duration-300 ${
        scrolled ? "top-0 bg-black/30 backdrop-blur-[6px]" : `top-[5px]`
      } md:top-[10px] left-0 z-[100] w-full max-w-[100vw] h-20 flex justify-between items-center px-[2rem]  text-${navbarColor}`}
    >
      <div
        className='flex-1'
      >
      <div className="md:hidden">
        <HamMenu navbarColor={scrolled ? "white" : navbarColor} open={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div
        className={`${
          isOpen ? "opacity-[1] translate-y-[0] pointer-events-auto" : "opacity-[0] translate-y-[10px] pointer-events-none"
        } text-white  duration-300 md:hidden flex flex-col gap-[1rem] justify-center items-center text-[1.2rem] absolute top-[-10px] left-0 w-[100vw] h-[calc(100vh+10px)] bg-black/90 backdrop-blur-[8px] z-[20]`}
      >
        <NavLink onClick={() => setIsOpen(false)} href="/">
          Home
        </NavLink>
        <NavLink onClick={() => setIsOpen(false)} href="/artists">
          Explore Artists
        </NavLink>
        <NavLink onClick={() => setIsOpen(false)} href="/articles">
          Articles
        </NavLink>
        <NavLink onClick={() => setIsOpen(false)} href="/about">
          About Us
        </NavLink>
        <NavLink onClick={() => setIsOpen(false)} href="/country-guide">
          Country Guide
        </NavLink>
        <NavLink onClick={() => setIsOpen(false)} href="/faq">
          FAQ
        </NavLink>
      </div>
      <div className="hidden md:flex gap-[1rem] items-center justify-start">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/artists">Explore Artists</NavLink>
        <NavLink href="/articles">Articles</NavLink>
        <NavLink href="/about">About Us</NavLink>
      </div>
      </div>
      <div>
        <img src="/logo.png" className={`h-[70px] ${navbarColor === 'black' ? 'invert-[1]' : ''}`} />
      </div>
      <div className="flex-1 flex gap-[1rem] items-center justify-end">
        <NavLink className="hidden md:flex" href="/country-guide">
          Country Guide
        </NavLink>
        <NavLink className="hidden md:flex" href="/faq">
          FAQ
        </NavLink>
        {session ? (
          <Profile user={session?.user} />
        ) : (
          <div className="flex text-[0.8rem] md:text-[1rem] gap-[0.5rem] md:gap-[1rem] items-center justify-end">
            <Button
              onClick={() => {
                updateRedirect(window.location.pathname);
              }}
              href="/signup"
            >
              Sign Up
            </Button>
            <Button
              onClick={() => {
                updateRedirect(window.location.pathname);
              }}
              href="/login"
            >
              Log In
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
