"use client";
import { cn } from "@/app/lib/cn";
import { animatePageOut } from "@/app/lib/pageTransition";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
interface ButtonProps {
  text: string;
  className?: string;
  href: string;
}
const Button: React.FC<ButtonProps> = ({ text, className, href }) => {
  const [isHovered, setHovered] = React.useState<boolean>(false);
  const router = useRouter();
  const onClick = () => {
    animatePageOut();
    setTimeout(() => {
      router.push(href);
    }, 1000);
  };
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn(
        "relative text-2xl px-3 py-2 flex justify-center items-center cursor-pointer overflow-hidden shadow "
      )}
      style={{
        background: "linear-gradient(45deg, transparent 7%, #FFB701 7%)",
        boxShadow: "6px 0 0 0 #DC2525",
      }}
    >
      <motion.div
        className="absolute h-full bg-[#DC2525] right-0"
        initial={{ width: 0 }}
        animate={{
          width: isHovered ? 10 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      <p className="z-10">{text}</p>
    </motion.div>
  );
};

export default Button;
