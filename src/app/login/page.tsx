//login-reset/page.tsx
"use client";
import HeaderSection from "@/components/headersection";
import Button from "@/components/ui/Button";
import BigTitle from "@/components/ui/bigtitle";
import BorderDivider from "@/components/ui/borderdivider";
import ErrorMessage from "@/components/ui/errormessage";
import Input from "@/components/ui/input";
import { signIn } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useRedirect } from "@/lib/utils/redirect/redirect";

const Page = () => {
  const [errors, setErrors] = useState<any>();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const {redirect} = useRedirect();

  const login = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    });

    if (result?.error) {
      setErrors({
        globalError: "Invalid username or password",
      });
    } else {
      router.refresh();
      redirect()
    }
  };

  return (
    <div className="min-h-[100vh]">
      <HeaderSection className="pt-[140px]"></HeaderSection>
      <BorderDivider />
      <BigTitle className="mt-[-60px] z-[10]">Login</BigTitle>
      <div className="flex flex-col items-center gap-[1rem] md:gap-0 mx-[10px] pt-[120px] mt-[-55px] min-h-[100%]">
        <div className="flex-1 flex flex-col gap-[1rem] justify-center items-center">
          <Input error={errors?.firstName} ref={usernameRef} className="w-[350px]" label="Username:"/>
          <Input type="password" error={errors?.lastName} ref={passwordRef} className="w-[350px]" label="Password:"/>
          <Button className="px-[2rem]" containerClassName="mx-auto mb-[10px]" onClick={login}>
            Login
          </Button>
          {errors?.globalError && <ErrorMessage>{errors?.globalError}</ErrorMessage>}

          <u><a href='/login-reset' style={{fontSize: "16px", color: "white", marginBottom: "20px"}}>Forgot password?</a></u>
        </div>
      </div>
    </div>
  );
};

export default Page;
