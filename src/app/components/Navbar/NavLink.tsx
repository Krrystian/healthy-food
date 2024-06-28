import React from "react";
import Link from "next/link";
import { cn } from "@/app/lib/cn";
interface NavLinkProps {
  className?: string;
  classNameBorder?: string;
  classNameBorderLeft?: string;
  classNameBorderRight?: string;
  classNameBorderTop?: string;
  classNameBorderBottom?: string;
  label: string;
  href: string;
  prefetch?: boolean;
}
const NavLink: React.FC<NavLinkProps> = ({
  className,
  classNameBorder,
  classNameBorderBottom,
  classNameBorderLeft,
  classNameBorderRight,
  classNameBorderTop,
  label,
  href,
  prefetch = true,
}) => {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={cn(
        "relative p-4 duration-300 w-full h-full transition-all text-xl group",
        className
      )}
    >
      <div
        className={cn(
          "absolute w-full h-0 border-l-2 rounded-md border-[#023047] top-0 left-0 group-hover:h-full duration-300",
          classNameBorder,
          classNameBorderLeft
        )}
      ></div>
      <div
        className={cn(
          "absolute w-full h-0 border-r-2 rounded-md border-[#023047] top-0 left-0 group-hover:h-full duration-300",
          classNameBorder,
          classNameBorderRight
        )}
      ></div>
      <div
        className={cn(
          "absolute w-0 h-full border-b-2 rounded-md border-[#023047] top-0 left-0 group-hover:w-full duration-300",
          classNameBorder,
          classNameBorderBottom
        )}
      ></div>
      <div
        className={cn(
          "absolute w-0 h-full border-t-2 rounded-md border-[#023047] top-0 left-0 group-hover:w-full duration-300",
          classNameBorder,
          classNameBorderTop
        )}
      ></div>
      {label}
    </Link>
  );
};

export default NavLink;
