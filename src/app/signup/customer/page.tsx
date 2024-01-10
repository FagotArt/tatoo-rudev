"use client";
import { signUp, validateUser } from "@/actions/user/signup";
import BorderDecorations from "@/components/decoration/borderdecorations";
import HeaderSection from "@/components/headersection";
import Button from "@/components/ui/Button";
import BigTitle from "@/components/ui/bigtitle";
import BorderDivider from "@/components/ui/borderdivider";
import CheckBox from "@/components/ui/checkbox";
import ErrorMessage from "@/components/ui/errormessage";
import Input from "@/components/ui/input";
import { useRedirect } from "@/lib/utils/redirect/redirect";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const Page = () => {
  const [errors, setErrors] = React.useState<any>();
  const router = useRouter();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const newsletterRef = useRef<any>(null);
  const termsRef = useRef<any>(null);

  const {redirect} = useRedirect()

  const signup = async () => {
    if (!termsRef.current?.checked) {
      return setErrors((prev: any) => ({
        ...prev,
        globalError: "Please agree to the terms and conditions",
      }));
    }

    const { error, user, message } = await signUp({
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      username: usernameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      settings: {
        newsletter: newsletterRef.current?.checked,
      },
      role: "user",
    });

    if (error) {
      console.log(error);
      setErrors({
        ...error,
      });
    } else {
      console.log(user);
      await signIn("credentials", {
        redirect: false,
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });
      redirect()
    }
  };

  const handleInputChange = (name: any) => async (e: any) => {
    const { error, errormessage } = await validateUser({
      password: passwordRef.current?.value,
      [name]: e.target.value,
    });
    setErrors((prev: any) => ({ ...prev, [name]: error?.[name] }));
  };

  return (
    <div className="min-h-[100vh]">
      <HeaderSection className="pt-[140px]"></HeaderSection>
      <BorderDivider />
      <BigTitle className="mt-[-60px] z-[10]">Customer Sign up</BigTitle>
      <div className="flex mx-[10px] pt-[120px] mt-[-55px] min-h-[100%]">
        <div className="flex-1 flex flex-col gap-[1rem] justify-center items-center">
          <Input onChange={handleInputChange("firstName")} error={errors?.firstName} ref={firstNameRef} className="w-[90%] md:w-[350px]" label="First Name:" />
          <Input onChange={handleInputChange("lastName")} error={errors?.lastName} ref={lastNameRef} className="w-[90%] md:w-[350px]" label="Last Name:" />
          <Input onChange={handleInputChange("username")} error={errors?.username} ref={usernameRef} className="w-[90%] md:w-[350px]" label="Username:" />
          <Input onChange={handleInputChange("email")} error={errors?.email} ref={emailRef} className="w-[90%] md:w-[350px]" label="Email:" />
          <Input onChange={handleInputChange("password")} error={errors?.password} ref={passwordRef} type="password" className="w-[90%] md:w-[350px]" label="Password:" />
          <Input
            onChange={handleInputChange("confirmPassword")}
            error={errors?.confirmPassword}
            ref={confirmPasswordRef}
            type="password"
            className="w-[90%] md:w-[350px]"
            label="Confirm Password:"
          />
        </div>
        <div className="relative w-[300px] px-[2rem]">
          <CheckBox ref={termsRef} className="mb-[1rem] text-[0.9rem]" label="I agree to the terms and conditions" />
          <Button className="px-[2rem]" containerClassName="mx-auto mb-[10px]" onClick={signup}>
            Submit
          </Button>
          {errors?.globalError && <ErrorMessage>{errors?.globalError}</ErrorMessage>}
        </div>
      </div>
    </div>
  );
};

export default Page;
