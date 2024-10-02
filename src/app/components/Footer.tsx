import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative bottom-0 w-full h-[20vh] bg-slate-600 flex justify-center items-center">
      <h2 className="absolute top-4 md:left-4 md:bottom-4 text-2xl md:text-4xl xl:text-6xl text-white/40 font-black">
        HEALTHY YOU
      </h2>
      <h3 className="absolute md:right-4 bottom-4 md:text-xl xl:text-3xl text-white/40 font-bold">
        2024-2025 © Wszelkie prawa zastrzeżone.
      </h3>
      <div className="flex gap-4 md:gap-12 *:flex *:justify-center *:items-center">
        <Link
          className="relative rounded-xl p-2 flex hover:bg-white/40 hover:shadow-2xl duration-300"
          href="#"
        >
          <Image
            src="/footer/instagram.svg"
            alt="instagram"
            width={50}
            height={50}
          />
        </Link>
        <Link
          className="relative rounded-xl p-2 hover:bg-white/40 hover:shadow-2xl duration-300"
          href="#"
        >
          <Image
            src="/footer/facebook.svg"
            alt="facebook"
            width={50}
            height={50}
          />
        </Link>
        <Link
          className="relative rounded-xl p-2 hover:bg-white/40 hover:shadow-2xl duration-300"
          href="#"
        >
          <Image
            src="/footer/youtube.svg"
            alt="youtube"
            width={50}
            height={50}
          />
        </Link>
        <Link
          className="relative rounded-xl p-2 hover:bg-white/40 hover:shadow-2xl duration-300"
          href="#"
        >
          <Image src="/footer/tiktok.svg" alt="tiktok" width={50} height={50} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
