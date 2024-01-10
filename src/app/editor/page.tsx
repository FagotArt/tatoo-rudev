import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Editor from "./editor";
import Notice from "@/components/ui/notice";

const page = async () => {
  const session = await getServerSession(authOptions);
  const user: any = session?.user;

  if (!user || user.role !== "admin") {
    return (
      <div className="py-[200px] flex justify-center items-center">
        <Notice>
          <div>
            <div className='font-bold'>Not Authorized</div>
            <div>Please contact an administrator</div>
          </div>
        </Notice>
      </div>
    );
  }

  return (
    <div className="py-[200px] px-[1rem]">
      <Editor />
    </div>
  );
};

export default page;
