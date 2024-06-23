import { cn } from "@/app/lib/cn";
import { motion } from "framer-motion";
import React from "react";

interface ButtonProps {
  label: string;
  labelSecondary?: string;
  type: "submit" | "button" | "reset" | undefined;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  type,
  onClick = () => {},
  className,
  labelSecondary,
  disabled,
}) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <button
      type={type}
      onClick={handleClick}
      className={cn(
        "text-2xl font-medium w-[50%] rounded-xl relative overflow-hidden flex justify-center items-center",
        className
      )}
      disabled={disabled}
    >
      <motion.div
        className="w-full h-full text-center relative"
        whileHover={{ top: "-100%" }}
      >
        <div className="relative text-center w-full bg-orange-500 p-2">
          {label}
        </div>
        <div className="w-full h-full absolute bg-black text-white text-center p-2 top-full">
          {labelSecondary ? labelSecondary : label}
        </div>
      </motion.div>
    </button>
  );
};

export default Button;
