"use client";
import { cn } from "@/app/lib/cn";
import React from "react";

interface BurgerMenuProps {
  open: boolean;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ open }) => {
  return (
    <div className="absolute self-center right-11 translate-x-1/2 -z-10">
      <div
        className={cn(
          "md:hidden h-1 w-1 bg-[#FBA100] duration-1000 transition-all rounded-full ease-in-out z-40 ",
          open && "h-[300vh] w-[300vw] rounded-none"
        )}
      ></div>
    </div>
  );
};

export default BurgerMenu;
