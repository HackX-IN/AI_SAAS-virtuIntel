import React from "react";
import Navbar from "../../components/uses/Navbar";
import { Sidebar } from "../../components/uses/sideBar";
import { getApilimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashBoardlayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApilimitCount();
  const isPro = await checkSubscription();
  // const isPro = false;
  return (
    <div className="h-full  relative">
      <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0  bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashBoardlayout;
