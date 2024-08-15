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
  const clipContainer = useRef<HTMLDivElement>(null);
  const alertContainer = useRef<HTMLDivElement>(null);

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
  const alertInView = useInView(alertContainer, { once: false });
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
          <div className="z-10 flex flex-col justify-center items-center fixed">
            <div className="overflow-hidden absolute translate-x-[100%]">
              <motion.p
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
                className="text-7xl font-bold py-2 flex gap-8 items-end"
                initial={{ translateY: "100%" }}
                animate={{ translateY: isInView ? "0%" : "100%" }}
                transition={{ duration: 0.5 }}
              >
                Ponad
                <span className="text-[164px] font-black text-[#BF3619] w-[350px]">
                  {isInView ? <Counter value={55} /> : 55}%
                </span>
                <span className="self-start">ma nadwagę</span>
              </motion.p>
            </div>

            <div className="overflow-hidden">
              <motion.p
                className="text-7xl font-bold py-2 flex gap-8"
                initial={{ translateY: "100%" }}
                animate={{ translateY: isInView ? "0%" : "100%" }}
                transition={{ duration: 0.5 }}
              >
                Około
                <span className="text-[164px] font-black text-[#BF3619] w-[370px]">
                  0{isInView ? <Counter value={9} /> : 9}%
                </span>
                <span className="self-end">ma cukrzycę</span>
              </motion.p>
            </div>
            <div className="overflow-hidden absolute w-[80vw] -rotate-12 text-center py-12 text-white rounded-xl">
              <motion.p
                className="text-7xl font-bold  bg-[#02A051] overflow-hidden py-12 rounded-xl"
                initial={{ translateY: "200%" }}
                animate={{ translateY: alertInView ? "0%" : "200%" }}
                transition={{ duration: 0.5 }}
              >
                Nie zwiększaj statystyk.
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
          className="h-[100vh] w-full absolute bottom-0 -z-10"
        >
          <div
            ref={alertContainer}
            className="absolute bottom-0 w-full h-[30vh]"
          />
        </div>
      </div>
      <div className="h-screen">
        <h2 className="text-[#FFB701] text-7xl font-bold">Oferujemy</h2>
      </div>
    </main>
  );
}
