import React from "react";

import { UserButton } from "@clerk/nextjs";
import MobilesideBar from "./Mobile-sideBar";
import { getApilimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
  const apiLimitCount = await getApilimitCount();
  const isPro = await checkSubscription();
  return (
    <div className="flex items-center p-4 ">
      <MobilesideBar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
