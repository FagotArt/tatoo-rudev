"use client";
import React from "react";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaUnlockAlt } from "react-icons/fa";
import { useRedirect } from "@/lib/utils/redirect/redirect";

const AuthenticatedSection = (props: any) => {
  const { children, className, user, ...rest } = props;
  const router = useRouter();
  const {updateRedirect} = useRedirect()

  if (!user || user.status === 401) {
    return (
      <div {...rest} className={`${className} p-[1rem] flex justify-center items-center`}>
        <div>
          <div className="mb-[2rem] text-center">
            <div className="text-3xl font-bold">You are not authenticated</div>
            <div className="text-xl">Please login to access this page</div>
          </div>
          <div className="flex items-center justify-center gap-[1rem]">
            <Button
              onClick={() => {
                updateRedirect(window.location.pathname)
                router.push("/login");
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                updateRedirect(window.location.pathname)
                router.push("/signup");
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const BlockedAuthenticatedSection = (props: any) => {
  const { children,className } = props;
  const session = useSession();
  const user: any = session?.data?.user;

  return (
    <div className={`${className} relative`}>
      {(!user || user.error) && (
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(black,transparent)] z-10 flex items-center justify-center">
          <div className="flex items-center">
            <FaUnlockAlt className="translate-y-[-0.1rem] mr-[5px] text-[1.2rem]" />
            <div>You must be logged in</div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default AuthenticatedSection;
