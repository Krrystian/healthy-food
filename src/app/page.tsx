"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { useSession } from "next-auth/react";
import BackgroundPattern from "./components/BackgroundPattern";
import Counter from "./components/MainPage/Counter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import TextAppear from "./components/MainPage/TextAppear";

export default function Home() {
  const session = useSession();
  useSmoothScroll();

  // First and second section
  const container = useRef<HTMLDivElement>(null);
  const stickyMask = useRef<HTMLDivElement>(null);
  const parallaxContainer = useRef<HTMLDivElement>(null);
  const parallaxFirstLine = useRef<HTMLDivElement>(null);
  const parallaxSecondLine = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);

  const [mobile, setMobile] = React.useState(false);
  const initialMaskSize = mobile ? 1 : 0.5;
  const targetMaskSize = 27;
  const easing = 0.15;
  let easedScrollProgress = 0;

  const updateMaskSize = () => {
    const isMobile = window.innerWidth <= 768;
    setMobile(isMobile);
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

  // useEffect(() => {
  //   const tl = gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: parallaxFirstLine.current,
  //         start: "top 70%",
  //         end: "bottom 20%",
  //         scrub: true,
  //         markers: false,
  //       },
  //     })
  //     .to(parallaxFirstLine.current, { y: -200 }, 0)
  //     .to(parallaxSecondLine.current, { y: 150 }, 0);

  //   return () => {
  //     tl.reverse();
  //   };
  // }, []);

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

  // About us section
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (aboutUsRef.current) {
      const splitText = new SplitType(aboutUsRef.current, {
        types: "chars,words",
      });

      gsap.from(splitText.chars, {
        opacity: 0.2,
        stagger: 0.1,
        scrollTrigger: {
          trigger: aboutUsRef.current,
          start: "top 90%",
          end: "bottom 60%",
          scrub: true,
          markers: false,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen w-screen">
      <BackgroundPattern />
      <section
        ref={container}
        className="w-screen h-[300vh] flex justify-center relative"
      >
        <div
          ref={stickyMask}
          className="sticky top-0 h-screen flex items-center justify-center overflow-hidden mask-video w-full"
        >
          <video
            className="h-full w-full object-cover absolute"
            autoPlay
            muted
            loop
          >
            <source src="/background-video.webm" type="video/webm" />
          </video>
        </div>
        <div className="h-[300vh] w-full absolute bottom-0 flex justify-center items-end">
          <div ref={parallaxContainer} className="h-[125vh] top-1/2">
            <div ref={parallaxFirstLine}>
              <TextAppear className="text-7xl text-center font-semibold">
                Ponad <span className="text-[#DC2528] text-9xl">55%</span>{" "}
                cierpi na <span className="text-[#DC2528] ">nadwagę</span>
              </TextAppear>
            </div>
            <div ref={parallaxSecondLine}>
              <TextAppear className="text-7xl text-center font-semibold">
                Natomiast <span className="text-[#DC2528] text-9xl">09%</span>{" "}
                choruje na <span className="text-[#DC2528] ">cukrzycę</span>
              </TextAppear>
            </div>
          </div>
        </div>
      </section>
      <section className="min-h-screen flex flex-col items-center">
        <div className="h-screen flex items-center justify-center">
          <p
            className="text-[#FFB701] text-7xl font-bold text-justify w-[90%] about-us leading-tight"
            ref={aboutUsRef}
          >
            Jesteśmy zespołem pasjonatów zdrowego stylu życia, który stawia
            sobie za cel dostarczanie kompleksowych usług wspierających Twoje
            zdrowie i dobre samopoczucie. Nasza misja to inspirowanie i
            edukowanie, aby każdy mógł cieszyć się pełnią życia w zdrowiu.
          </p>
        </div>
        <div className="min-h-screen flex justify-center relative">
          <div className="flex flex-col items-center *:w-[90%]">
            <div className="h-screen text-7xl text-center bg-[#28B9DA]/30 rounded-t-xl">
              Blog
            </div>
            <div className="h-screen text-7xl text-center bg-[#DD242C]/30">
              Dieta
            </div>
            <div className="h-screen text-7xl text-center bg-[#28B9DA]/30">
              Przepisy
            </div>
            <div className="h-screen text-7xl text-center bg-[#02A051]/30 rounded-b-xl">
              Produkty
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
