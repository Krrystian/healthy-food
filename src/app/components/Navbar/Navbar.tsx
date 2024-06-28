"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import NavLink from "./NavLink";

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [scrollDirection, setScrollDirection] = React.useState("up");

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > scrollProgress) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }

    setScrollProgress(currentScrollPos);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollProgress]);

  return (
    <nav
      className={cn(
        "fixed w-full h-20 flex justify-center duration-300 transition-all text-[#023047]",
        scrollProgress > 100 && scrollDirection === "down"
          ? "translate-y-[-100%]"
          : "translate-y-0"
      )}
    >
      <motion.div
        className={cn(
          "h-full duration-300 transition-all px-2 bg-[#FFB703]",
          scrollProgress > 30 ? "w-[40vw] rounded-b-xl" : "w-[100vw] px-4"
        )}
      >
        <div className="flex flex-row justify-between items-center h-full">
          <p>Logo</p>
          <div className="flex flex-row items-center justify-center gap-2">
            <NavLink label="Kalkulatory" href="/" prefetch={true} />
            <NavLink label="Blog" href="/" prefetch={true} />
            <NavLink label="Dieta" href="/" prefetch={true} />
            <NavLink label="Produkty" href="/" prefetch={true} />
          </div>
          <div className="flex flex-row gap-8">
            <Link
              href="/login"
              prefetch={true}
              className="p-4 border-2 border-[#023047] rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-xl"
            >
              Login
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
