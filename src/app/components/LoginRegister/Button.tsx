import { cn } from "@/app/lib/cn";
import { motion } from "framer-motion";
import React from "react";

interface ButtonProps {
  label: string;
  labelSecondary?: string;
  classNameLabel?: string;
  classNameLabelSecondary?: string;
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
  classNameLabel,
  classNameLabelSecondary,
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
        className="w-full h-full text-center relative tracking-wider"
        whileHover={{ top: "-100%" }}
      >
        <div
          className={cn(
            "relative text-center w-full bg-[#FB8500] p-2",
            classNameLabel
          )}
        >
          {label}
        </div>
        <div
          className={cn(
            "w-full h-full absolute bg-black text-white text-center p-2 top-full",
            classNameLabelSecondary
          )}
        >
          {labelSecondary ? labelSecondary : label}
        </div>
      </motion.div>
    </button>
  );
};

export default Button;
