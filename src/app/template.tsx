"use client";

import React, { useRef, useEffect, useState } from "react";
import { animatePageIn, animatePageInForce } from "./lib/pageTransition";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false); // Flaga animacji

  const hideBannersInstantly = () => {
    const banners = document.querySelectorAll(
      "#banner-1, #banner-2, #banner-3, #banner-4"
    );
    banners.forEach((banner) => {
      (banner as HTMLElement).style.display = "none";
    });
  };

  const showBanners = () => {
    const banners = document.querySelectorAll(
      "#banner-1, #banner-2, #banner-3, #banner-4"
    );
    banners.forEach((banner) => {
      (banner as HTMLElement).style.display = "block";
    });
  };

  useEffect(() => {
    showBanners();
    if (previousPathname.current !== pathname) {
      if (pathname === "/") {
        animatePageInForce();
      } else {
        console.log("animate");
        animatePageIn();
      }
    }
    // bugfix: clear timeout
    // if (hideTimeout.current) {
    //   console.log("clear timeout");
    //   clearTimeout(hideTimeout.current);
    // }
    // hideTimeout.current = setTimeout(hideBannersInstantly, 3000);
    previousPathname.current = pathname;
    return () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, [pathname, hasAnimated]);

  return (
    <div>
      <div
        id="banner-1"
        className="h-screen bg-[#219ebc] z-50 fixed top-0 left-0 w-0 md:w-1/4"
      />
      <div
        id="banner-2"
        className="h-screen bg-[#219ebc] z-50 fixed top-0 left-1/4 w-0 md:w-1/4"
      />
      <div
        id="banner-3"
        className="h-screen bg-[#219ebc] z-50 fixed top-0 left-2/4 w-0 md:w-1/4"
      />
      <div
        id="banner-4"
        className="h-screen bg-[#219ebc] z-50 fixed top-0 left-3/4 w-0 md:w-1/4"
      />
      {children}
    </div>
  );
}
