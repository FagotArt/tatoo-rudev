"use client";
import HeaderSection from "@/components/headersection";
import Button from "@/components/ui/Button";
import BigTitle from "@/components/ui/bigtitle";
import BorderDivider from "@/components/ui/borderdivider";
import ErrorMessage from "@/components/ui/errormessage";
import Input from "@/components/ui/input";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
  const [step, setStep] = useState<"email" | "reset">("email");
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>(null);
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const resetPassword = async () => {
    const email = emailRef.current?.value;

    // Проверка формата email с помощью регулярного выражения
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrors({ globalError: "Please enter a valid email address" });
      return;
    }

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (result.error) {
      setErrors({
        globalError: result.error,
      });
    } else {
      setErrors(null); // Сброс ошибок
      setSavedEmail(email); // Сохраняем email
      setStep("reset");
    }
  };

  const sendResetLink = async () => {
    const email = savedEmail;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!password || password !== confirmPassword) {
      setErrors({ globalError: "Passwords do not match" });
      return;
    }

    const response = await fetch("/api/auth/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (result.error) {
      setErrors({
        globalError: result.error,
      });
    } else {
      setErrors(null); // Сброс ошибок
      setMessage("Your password has been successfully reset.");
    }
  };

  return (
      <div className="min-h-[100vh]">
        <HeaderSection className="pt-[140px]"></HeaderSection>
        <BorderDivider />
        <BigTitle className="mt-[-60px] z-[10]">Reset Password</BigTitle>
        <div className="flex flex-col items-center gap-[1rem] md:gap-0 mx-[10px] pt-[120px] mt-[-55px] min-h-[100%]">
          <div className="flex-1 flex flex-col gap-[1rem] justify-center items-center">
            {step === "email" && (
                <>
                  <Input ref={emailRef} className="w-[350px]" label="Email:" />
                  <Button className="px-[2rem]" containerClassName="mx-auto mb-[10px]" onClick={resetPassword}>
                    Send Reset Link
                  </Button>
                </>
            )}
            {step === "reset" && (
                <>
                  <Input ref={passwordRef} type="password" className="w-[350px]" label="New Password:" />
                  <Input ref={confirmPasswordRef} type="password" className="w-[350px]" label="Confirm New Password:" />
                  <Button className="px-[2rem]" containerClassName="mx-auto mb-[10px]" onClick={sendResetLink}>
                    Update Password
                  </Button>
                </>
            )}
            {message && (
                <div className="text-center">
                  <p style={{ fontSize: "20px", color: "white", marginBottom: "20px" }}>{message}</p>
                  <Button className="px-[4rem]" containerClassName="mx-auto mb-[10px]" onClick={() => router.push("/login")}>
                    Go to Login
                  </Button>
                </div>
            )}
            {errors?.globalError && (
                <ErrorMessage>
                  <span style={{ fontSize: "20px", color: "red" }}>{errors.globalError}</span>
                </ErrorMessage>
            )}
          </div>
        </div>
      </div>
  );
};

export default ResetPasswordPage;
