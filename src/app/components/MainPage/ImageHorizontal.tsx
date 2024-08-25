"use client";
import { cn } from "@/app/lib/cn";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import React from "react";
interface ImageHorizontalProps {
  src: string;
  alt: string;
}
const ImageHorizontal: React.FC<ImageHorizontalProps> = ({ src, alt }) => {
  const [isHovered, setHovered] = React.useState<boolean>(false);
  return (
    <motion.div
      className="w-full h-full overflow-hidden relative"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/*left*/}
      <div className="absolute w-full h-full z-10">
        <Image
          src={src}
          alt={alt}
          layout="fill"
          className={cn(
            "object-cover  duration-[1.6s]",
            isHovered && "-translate-x-[800px] skew-x-[40deg]"
          )}
          style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0% 100%)" }}
        />
      </div>
      {/*right*/}
      <div className="absolute w-full h-full z-10">
        <Image
          src={src}
          alt={alt}
          layout="fill"
          className={cn(
            "object-cover  duration-[1.6s]",
            isHovered && "translate-x-[800px] -skew-x-[40deg]"
          )}
          style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
        />
      </div>
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          layout="fill"
          className="object-cover invert"
        />
      </div>
    </motion.div>
  );
};

export default ImageHorizontal;
