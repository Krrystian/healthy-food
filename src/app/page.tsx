"use client";
import React, { useEffect, useRef } from "react";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { useSession } from "next-auth/react";
import BackgroundPattern from "./components/BackgroundPattern";
import { useInView, motion, useScroll, useTransform } from "framer-motion";
import Counter from "./components/MainPage/Counter";

type ScrollableElement = HTMLDivElement | null;

export default function Home() {
  const session = useSession();
  useSmoothScroll();

  const container = useRef<ScrollableElement>(null);
  const stickyMask = useRef<HTMLDivElement>(null);
  const firstLine = useRef<HTMLDivElement>(null);
  const secondLine = useRef<HTMLDivElement>(null);
  const clipContainer = useRef<HTMLDivElement>(null);

  const [mobile, setMobile] = React.useState(false);
  const initialMaskSize = mobile ? 1 : 0.5;
  const targetMaskSize = 27;
  const easing = 0.15;
  let easedScrollProgress = 0;

  const updateMaskSize = () => {
    const isMobile = window.innerWidth <= 768;
    setMobile(isMobile ? true : false);
  };

  useEffect(() => {
    updateMaskSize();
    window.addEventListener("resize", updateMaskSize);
    return () => {
      window.removeEventListener("resize", updateMaskSize);
    };
  }, []);

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
  const isInView = useInView(clipContainer, { once: false });

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
          <div className="absolute z-10 flex flex-col justify-center items-center">
            <div className="overflow-hidden absolute translate-x-[100%]">
              <motion.p
                ref={firstLine}
                className="text-7xl font-bold py-2 flex gap-8 items-end text-green-800"
                initial={{ translateY: "100%" }}
                animate={{ translateY: isInView ? "0%" : "100%" }}
                transition={{ duration: 0.5 }}
              >
                w Polsce
              </motion.p>
            </div>
            <div className="overflow-hidden w-full">
              <motion.p
                ref={firstLine}
                className="text-7xl font-bold py-2 flex gap-8 items-end"
                initial={{ translateY: "100%" }}
                animate={{ translateY: isInView ? "0%" : "100%" }}
                transition={{ duration: 0.5 }}
              >
                Ponad
                <span className="text-[164px] font-black text-[#BF3619] w-[350px]">
                  <Counter value={55} />%
                </span>
                <span className="self-start">ma nadwagę</span>
              </motion.p>
            </div>

            <div className="overflow-hidden">
              <motion.p
                ref={firstLine}
                className="text-7xl font-bold py-2 flex gap-8"
                initial={{ translateY: "100%" }}
                animate={{ translateY: isInView ? "0%" : "100%" }}
                transition={{ duration: 0.5 }}
              >
                Około
                <span className="text-[164px] font-black text-[#BF3619] w-[370px]">
                  0
                  <Counter value={9} />%
                </span>
                <span className="self-end">ma cukrzycę</span>
              </motion.p>
            </div>
          </div>

          <video
            className="h-full w-full object-cover absolute"
            autoPlay
            muted
            loop
          >
            <source src="/background-video.webm" type="video/webm" />
          </video>
        </div>
        <div
          ref={clipContainer}
          className="h-screen w-full absolute bottom-0 -z-10"
        ></div>
      </div>
      <div className="h-screen"></div>
    </main>
  );
}
