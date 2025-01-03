"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/app/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/app/lib/pageTransition";
import Image from "next/legacy/image";

interface NavLinkProps {
  className?: string;
  label: string;
  href: string;
  prefetch?: boolean;
  Content?: React.ElementType;
  underline?: boolean;
  animate?: boolean;
  account?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  className,
  label,
  href,
  prefetch = true,
  Content,
  underline = true,
  animate = true,
  account = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const show = Content && open;
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };

  return (
    <div
      className="relative h-fit w-fit"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        prefetch={prefetch}
        onClick={handleClick}
        className={cn(
          "px-4 py-2 duration-300 w-full h-full transition-all text-xl relative flex group font-medium gap-2",
          className
        )}
      >
        {account && <Image src="/account.svg" width={24} height={24} />}
        {label}
        {underline && (
          <div
            className={cn(
              "absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC]",
              open && "w-full"
            )}
          />
        )}
      </Link>
      {animate && (
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={{ translateX: "-50%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-1/2 top-16 bg-white text-black"
            >
              <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
              <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
              <Content />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default NavLink;
