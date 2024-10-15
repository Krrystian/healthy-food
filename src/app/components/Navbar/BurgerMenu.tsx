"use client";
import { motion } from "framer-motion";
import React from "react";

interface BurgerMenuProps {
  open: boolean;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ open }) => {
  return (
    <div className="absolute self-center top-0 origin-center -z-10">
      <motion.div
        className="xl:hidden h-1 w-screen bg-[#FBA100] z-40"
        initial={{ height: 0 }}
        animate={{
          height: open ? "100vh" : 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          delay: 0,
        }}
        exit={{
          height: 0,
          transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 },
        }}
      />
    </div>
  );
};

export default BurgerMenu;
