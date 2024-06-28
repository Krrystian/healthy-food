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

  const blogContent = (
    <div className="w-64 bg-white p-6 shadow-xl">
      <div className="mb-3 space-y-3">
        <h3 className="font-semibold">For Individuals</h3>
        <a href="#" className="block text-sm hover:underline">
          Introduction
        </a>
        <a href="#" className="block text-sm hover:underline">
          Pay as you go
        </a>
      </div>
      <div className="mb-6 space-y-3">
        <h3 className="font-semibold">For Companies</h3>
        <a href="#" className="block text-sm hover:underline">
          Startups
        </a>
        <a href="#" className="block text-sm hover:underline">
          SMBs
        </a>
        <a href="#" className="block text-sm hover:underline">
          Enterprise
        </a>
      </div>
      <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
        Contact sales
      </button>
    </div>
  );
  return (
    <nav
      className={cn(
        "fixed w-full h-20 flex justify-center duration-300 transition-all text-[#023047] bg-transparent",
        scrollProgress > 100 && scrollDirection === "down"
          ? "translate-y-[-100%]"
          : "translate-y-0"
      )}
    >
      <motion.div
        className={cn(
          "h-full duration-300 transition-all px-2 bg-[#FFB703] relative",
          scrollProgress > 30 ? "w-[40vw] rounded-b-xl" : "w-[100vw] px-4"
        )}
      >
        <div className="flex flex-row justify-between items-center h-full">
          <p>Logo</p>
          <div className="flex flex-row items-center justify-center gap-2">
            <NavLink label="Kalkulatory" href="/" prefetch={true} />
            <NavLink
              label="Blog"
              href="/"
              prefetch={true}
              Content={() => blogContent}
            />
            <NavLink label="Dieta" href="/" prefetch={true} />
            <NavLink label="Produkty" href="/" prefetch={true} />
          </div>
          <div className="flex flex-row gap-8">
            <Link
              href="/login"
              prefetch={true}
              className="p-3 border-2 border-[#023047] rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-xl"
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
