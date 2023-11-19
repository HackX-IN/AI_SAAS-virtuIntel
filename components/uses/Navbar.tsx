import React from "react";

import { UserButton } from "@clerk/nextjs";
import MobilesideBar from "./Mobile-sideBar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4 ">
      <MobilesideBar />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
