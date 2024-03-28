"use client";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";

interface RedirectContextType {
  redirect: () => void;
  updateRedirect: (url: string) => void;
}

const RedirectContext = createContext<RedirectContextType>({
  redirect: () => {},
  updateRedirect: () => {},
});

export const useRedirect = () => useContext(RedirectContext);

export const RedirectProvider = ({ children }: any) => {
  const [redirectUrl, setRedirectUrl] = useState('/');
  const router = useRouter();

  useEffect(() => {
    const initialUrl = localStorage.getItem("redirectUrl") || "/";
    setRedirectUrl(initialUrl);
  }, []);

  useEffect(() => {
    localStorage.setItem("redirectUrl", redirectUrl);
  }, [redirectUrl]);


  const redirect = () => {
    router.push(redirectUrl);
    setRedirectUrl("/");
    localStorage.setItem("redirectUrl", "/");
  };

  const updateRedirect = (url: string) => {
    setRedirectUrl(url);
  };

  const value = {
    redirect,
    updateRedirect,
  };

  return <RedirectContext.Provider value={value}>{children}</RedirectContext.Provider>;
};
