import Image from "next/legacy/image";
import React from "react";

const BackgroundPattern = () => {
  return (
    <div className="bg-[#023047] -z-10 h-screen w-screen top-0 fixed">
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
