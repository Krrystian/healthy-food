"use client";
import React, { useEffect, useRef } from "react";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { useSession } from "next-auth/react";
import BackgroundPattern from "./components/BackgroundPattern";

type ScrollableElement = HTMLDivElement | null;

export default function Home() {
  const session = useSession();
  useSmoothScroll();

  const container = useRef<ScrollableElement>(null);
  const stickyMask = useRef<HTMLDivElement>(null);

  const initialMaskSize = 0.5;
  const targetMaskSize = 27;
  const easing = 0.15;
  let easedScrollProgress = 0;

  useEffect(() => {
    const handleAnimationFrame = () => {
      if (stickyMask.current && container.current) {
        requestAnimationFrame(animate);
      }
    };
    handleAnimationFrame();
  }, []);

  const animate = () => {
    if (stickyMask.current && container.current) {
      const maskSizeProgress = targetMaskSize * getScrollProgress();
      stickyMask.current.style.maskSize =
        (initialMaskSize + maskSizeProgress) * 100 + "%";
      requestAnimationFrame(animate);
    }
  };

  const getScrollProgress = () => {
    if (container.current) {
      const scrollProgress =
        (window.scrollY - container.current.offsetTop) /
        (container.current.getBoundingClientRect().height - window.innerHeight);
      const delta = scrollProgress - easedScrollProgress;
      easedScrollProgress += delta * easing;
      return easedScrollProgress;
    }
    return 0;
  };

  return (
    <main className="min-h-screen w-screen">
      <BackgroundPattern />
      <div
        ref={container}
        className="w-screen h-[300vh] flex justify-center relative"
      >
        <div
          ref={stickyMask}
          className="sticky top-0 h-screen flex items-center justify-center overflow-hidden mask-video w-full"
        >
          <video className="h-full w-full object-cover" autoPlay muted loop>
            <source src="/background-video.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </main>
  );
}
