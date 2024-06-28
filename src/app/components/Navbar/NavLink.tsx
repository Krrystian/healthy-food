import React from "react";
import Link from "next/link";
import { cn } from "@/app/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
interface NavLinkProps {
  className?: string;
  label: string;
  href: string;
  prefetch?: boolean;
  Content?: React.ElementType;
}
const NavLink: React.FC<NavLinkProps> = ({
  className,
  label,
  href,
  prefetch = true,
  Content,
}) => {
  const [open, setOpen] = React.useState(false);
  const show = Content && open;

  return (
    <div
      className="relative h-fit w-fit"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        prefetch={prefetch}
        className={cn(
          "px-4 py-2 duration-300 w-full h-full transition-all text-xl relative flex group",
          className
        )}
      >
        {label}
        <div
          className={cn(
            "absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC]",
            open && "w-full"
          )}
        />
      </Link>
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
    </div>
  );
};

export default NavLink;
