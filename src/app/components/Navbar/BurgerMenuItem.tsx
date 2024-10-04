import React from "react";
import Image from "next/legacy/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface BurgerMenuItemProps {
  title: string;
  items: { name: string; href: string }[];
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  setIsMenuOpen: (open: boolean) => void;
}

const BurgerMenuItem: React.FC<BurgerMenuItemProps> = ({
  title,
  items,
  activeMenu,
  setActiveMenu,
  setIsMenuOpen,
}) => {
  const isActive = activeMenu === title;

  return (
    <div className="flex flex-col text-2xl gap-6 group group:overflow-hidden">
      <div className="flex flex-col w-full items-center">
        <div
          className="flex justify-between w-full items-center cursor-pointer"
          onClick={() => setActiveMenu(isActive ? "" : title)}
        >
          <p>{title}</p>
          <div className="relative h-10 w-10 self-end">
            <Image
              src={"/arrowMenu.svg"}
              alt="arrow"
              layout="fill"
              className={isActive ? "transform rotate-90" : ""}
            />
          </div>
        </div>
        <motion.div
          className="w-full flex px-8  relative gap-4 overflow-hidden"
          style={{
            maxHeight: isActive ? "200" : "0px",
          }}
          animate={{
            maxHeight: isActive ? "200px" : "0px",
          }}
          transition={{ duration: 0.3, ease: "linear" }}
          exit={{ transition: { duration: 0, ease: "linear" } }}
        >
          <div className="w-1 h-full bg-black absolute -translate-x-[400%]" />
          <div className="flex flex-col gap-2 text-xl font-medium">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BurgerMenuItem;
