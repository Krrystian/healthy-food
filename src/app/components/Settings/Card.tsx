import { cn } from "@/app/lib/cn";
import React from "react";
interface CardProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}
const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div
      className={cn(
        `bg-black/60 w-full text-white select-none p-4 rounded-xl flex flex-col`,
        className
      )}
    >
      <h4 className="text-4xl py-4 text-center w-full cursor-default">
        {title}
      </h4>
      <div className="h-full">{children}</div>
    </div>
  );
};

export default Card;
