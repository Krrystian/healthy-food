import Image from "next/legacy/image";
import React from "react";
import { cn } from "../lib/cn";

interface BackgroundPatternProps {
  color?: string;
  className?: string;
}
const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  color = "#023047",
  className,
}) => {
  return (
    <div
      className={cn(
        `-z-10 h-screen w-screen top-0 fixed`,
        `bg-[${color}]`,
        className
      )}
    >
      <div className="relative bg-pattern w-full h-full mix-blend-color-burn opacity-10">
        <Image
          src="/pattern.svg"
          layout="fill"
          alt="background-pattern-image"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default BackgroundPattern;
