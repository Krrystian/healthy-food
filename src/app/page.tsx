"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import useSmoothScroll from "./hooks/useSmoothScroll";
import BackgroundPattern from "./components/BackgroundPattern";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import TextAppear from "./components/MainPage/TextAppear";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Footer from "./components/Footer";
import Button from "./components/MainPage/Button";
import ImageHorizontal from "./components/MainPage/ImageHorizontal";
import { useSession } from "next-auth/react";

export default function Home() {
  useSmoothScroll();
  const session = useSession();
  console.log(session);

  const container = useRef<HTMLDivElement>(null);
  const stickyMask = useRef<HTMLDivElement>(null);
  const parallaxContainer = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: parallaxContainer.current,
          start: "top 80%",
          end: "bottom 30%",
          scrub: true,
          markers: false,
        },
      })
      .to(".leftLine", { y: "30%", opacity: 1 }, 0);

    return () => {
      tl.reverse();
    };
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
          start: "top 80%",
          end: "bottom 30%",
          scrub: true,
          markers: false,
        },
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const blogContainerRef = useRef<HTMLDivElement>(null);
  const dietaContainerRef = useRef<HTMLDivElement>(null);
  const przepisyContainerRef = useRef<HTMLDivElement>(null);
  const kalkulatoryContainerRef = useRef<HTMLDivElement>(null);
  const horizontalSections = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);
  const { scrollYProgress } = useScroll({
    target: horizontalSections,
    offset: ["start start", "end end"],
  });
  const xV = useTransform(scrollYProgress, [0, 1], [0, width * -0.75]);
  const x = useSpring(xV, { stiffness: 400, damping: 90 });
  useLayoutEffect(() => {
    const handleResize = () => {
      if (imagesRef.current) {
        setWidth(imagesRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imagesRef]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: blogContainerRef.current,
        start: "top 60%",
        end: "bottom 20%",
        scrub: false,
        markers: false,
      },
    });
    const tlDieta = gsap.timeline({
      scrollTrigger: {
        trigger: dietaContainerRef.current,
        start: "top 60%",
        end: "bottom 20%",
        scrub: false,
        markers: false,
      },
    });
    const tlPrzepisy = gsap.timeline({
      scrollTrigger: {
        trigger: przepisyContainerRef.current,
        start: "top 60%",
        end: "bottom 20%",
        scrub: false,
        markers: false,
      },
    });
    const tlKalkulatory = gsap.timeline({
      scrollTrigger: {
        trigger: kalkulatoryContainerRef.current,
        start: "top 60%",
        end: "bottom 20%",
        scrub: false,
        markers: false,
      },
    });

    tl.to(".blogBg", { width: "100%", duration: 0.7 }, 0)
      .to(".blogTitleBg", { width: "100%", duration: 0.7 }, 0.3)
      .to(".blogDescBg", { width: "100%", duration: 0.7 }, 0.6)
      .set(".blogImage", { opacity: 1 }, 0.8)
      .set(".blogTitle", { opacity: 1 })
      .set(".blogDesc", { opacity: 1 })
      .to(".blogBg", { width: "0%", duration: 0.7 }, 1)
      .to(".blogTitleBg", { width: "0%", duration: 0.6 }, 1.4)
      .to(".blogDescBg", { width: "0%", duration: 0.7 }, 1.2)
      .to(".blogButton", { translateY: "0", duration: 0.7 }, 1.6);

    tlDieta
      .to(".dietaBg", { width: "100%", duration: 0.7 }, 0)
      .to(".dietaTitleBg", { width: "100%", duration: 0.7 }, 0.3)
      .to(".dietaDescBg", { width: "100%", duration: 0.7 }, 0.6)
      .set(".dietaImage", { opacity: 1 }, 0.8)
      .set(".dietaTitle", { opacity: 1 }, 0)
      .set(".dietaDesc", { opacity: 1 })
      .to(".dietaBg", { width: "0%", duration: 0.7 }, 1)
      .to(".dietaTitleBg", { width: "0%", duration: 0.7 }, 1.2)
      .to(".dietaDescBg", { width: "0%", duration: 0.6 }, 1.4)
      .to(".dietaButton", { translateY: "0", duration: 0.7 }, 1.6);

    tlPrzepisy
      .to(".przepisyBg", { width: "100%", duration: 0.7 }, 0)
      .to(".przepisyTitleBg", { width: "100%", duration: 0.7 }, 0.3)
      .to(".przepisyDescBg", { width: "100%", duration: 0.7 }, 0.6)
      .set(".przepisyImage", { opacity: 1 }, 0.8)
      .set(".przepisyTitle", { opacity: 1 })
      .set(".przepisyDesc", { opacity: 1 })
      .to(".przepisyBg", { width: "0%", duration: 0.7 }, 1)
      .to(".przepisyTitleBg", { width: "0%", duration: 0.7 }, 1.2)
      .to(".przepisyDescBg", { width: "0%", duration: 0.6 }, 1.4)
      .to(".przepisyButton", { translateY: "0", duration: 0.7 }, 1.6);

    tlKalkulatory
      .to(".kalkulatoryBg", { width: "100%", duration: 0.7 }, 0)
      .to(".kalkulatoryTitleBg", { width: "100%", duration: 0.7 }, 0.3)
      .to(".kalkulatoryDescBg", { width: "100%", duration: 0.7 }, 0.6)
      .set(".kalkulatoryImage", { opacity: 1 }, 0.8)
      .set(".kalkulatoryTitle", { opacity: 1 })
      .set(".kalkulatoryDesc", { opacity: 1 })
      .to(".kalkulatoryBg", { width: "0%", duration: 0.7 }, 1)
      .to(".kalkulatoryTitleBg", { width: "0%", duration: 0.7 }, 1.2)
      .to(".kalkulatoryDescBg", { width: "0%", duration: 0.6 }, 1.4)
      .to(".kalkulatoryButton", { translateY: "0", duration: 0.7 }, 1.6);
  }, []);
  return (
    <main className="min-h-screen w-screen relative">
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
          <div
            ref={parallaxContainer}
            className="h-[125vh] w-[70%] top-1/2 flex gap-24 md:justify-between flex-col md:flex-row"
          >
            <div>
              <TextAppear className="leftLine text-4xl md:text-6xl text-center font-semibold flex flex-col">
                <span className="text-[#DC2528] text-7xl md:text-8xl xl:text-[192px] leading-[1]">
                  55%
                </span>{" "}
                <span>cierpi na</span>{" "}
                <span className="text-[#DC2528]">nadwagę</span>
              </TextAppear>
            </div>
            <div>
              <TextAppear className="rightLine text-4xl  md:text-6xl text-center font-semibold flex flex-col">
                <span className="text-[#DC2528] text-7xl md:text-8xl xl:text-[192px] leading-[1]">
                  09%
                </span>
                <span>choruje na</span>
                <span className="text-[#DC2528]">cukrzycę</span>
              </TextAppear>
            </div>
          </div>
        </div>
      </section>
      <section className="top-0 min-h-screen min-w-screen flex flex-col">
        <div className="md:h-screen h-[60vh] w-screen flex items-center justify-center">
          <p
            className="text-[#FFB701] w-[85%] md:w-[80%] text-3xl md:text-6xl font-bold text-justify about-us leading-tight"
            ref={aboutUsRef}
          >
            Jesteśmy zespołem pasjonatów zdrowego stylu życia, który stawia
            sobie za cel dostarczanie kompleksowych usług wspierających Twoje
            zdrowie i dobre samopoczucie. Nasza misja to inspirowanie i
            edukowanie, aby każdy mógł cieszyć się pełnią życia w zdrowiu.
          </p>
        </div>
        <div
          className="min-h-[400vh] relative overflow-x-clip flex"
          ref={horizontalSections}
        >
          <motion.div
            className="sticky h-screen items-center top-0 flex"
            ref={imagesRef}
            style={{ x }}
          >
            <div
              className="w-screen h-screen flex flex-col md:flex-row flex-shrink-0 md:p-20 gap-4 md:gap-12 items-center"
              ref={blogContainerRef}
            >
              <div className="w-full md:w-2/4 md:h-full h-[40%] relative flex-shrink-0 overflow-hidden">
                <div className="relative w-full opacity-0 h-full blogImage select-none">
                  <ImageHorizontal src="/sections/calculator.png" alt="kalkulatory" />
                </div>
                <div className="absolute top-0 h-full bg-[#019E52] blogBg z-10" />
              </div>
              <div className="w-[80%] md:w-full md:h-full h-[60%] flex flex-col gap-4 md:gap-12">
                <div className="relative">
                  <h2 className="text-5xl md:text-6xl xl:text-8xl font-black text-[#FFB706] blogTitle opacity-0">
                    Kalkulatory
                  </h2>
                  <div className="bg-[#DC2528] absolute top-0 left-0 h-[115%] z-10 blogTitleBg" />
                </div>
                <div className="relative">
                  <p className="text-white text-xl md:text-2xl xl:text-3xl flex-grow opacity-0 blogDesc text-justify md:w-full">
                  Chcesz lepiej zrozumieć swoje ciało i zadbać o zdrowie? Bez względu na to, czy dopiero zaczynasz swoją przygodę z fitnessem, 
                  czy jesteś doświadczonym ekspertem, nasze kalkulatory pomogą Ci osiągnąć Twoje cele. Śledź swoje postępy, bądź dumny z tego co wypracowałeś!
                  </p>
                  <div className="bg-[#27BDDA] absolute top-0 left-0 h-full z-10 blogDescBg" />
                </div>
                <div className="items-end justify-end flex h-full p-4 translate-y-[100%] blogButton">
                  <Button
                    text="Oblicz swoje BMI"
                    className="bg-[#DC2528] text-white"
                    href="/calculator/bmi"
                  />
                </div>
              </div>
            </div>

            <div className="w-screen h-screen flex flex-col md:flex-row flex-shrink-0 md:p-20 gap-4 md:gap-12 items-center">
              <div className="w-full md:w-2/4 md:h-full h-[40%] relative flex-shrink-0 overflow-hidden">
                <div className="relative w-full opacity-0 h-full dietaImage">
                  <ImageHorizontal src="/sections/diet.webp" alt="dieta" />
                </div>
                <div className="absolute top-0 h-full bg-[#019E52] dietaBg z-10" />
              </div>
              <div className="w-[80%] md:w-full md:h-full h-[60%] flex flex-col gap-4 md:gap-12">
                <div className="relative">
                  <h2 className="text-5xl md:text-6xl xl:text-8xl font-black text-[#FFB706] dietaTitle opacity-0">
                    Dieta
                  </h2>
                  <div className="bg-[#DC2528] absolute top-0 left-0 h-[115%] z-10 dietaTitleBg" />
                </div>
                <div className="relative">
                  <p className="text-white text-xl md:text-2xl xl:text-3xl flex-grow opacity-0 text-justify md:w-full dietaDesc">
                    Jeżeli jesteś osobą niezdecydowaną, albo wybór odpowiedniej diety stanowi przed tobą nielada wyzwanie
                    - nasz quiz pomoże Ci w podjęciu decyzji. Odpowiedz na kilka pytań, a my dobierzemy dla Ciebie spersonalizowany typ diety 
                    wraz z przykładowymi przepisami.
                  </p>
                  <div className="bg-[#27BDDA] absolute top-0 left-0 h-full z-10 dietaDescBg" />
                </div>
                <div className="items-end justify-end flex h-full p-4 translate-y-[100%] dietaButton">
                  <Button
                    text="Zacznij dietę"
                    className="bg-[#DC2528] text-white"
                    href="/diet/form"
                  />
                </div>
              </div>
            </div>
            <div className="w-screen h-screen flex flex-col md:flex-row flex-shrink-0 md:p-20 gap-4 md:gap-12 items-center">
              <div className="w-full md:w-2/4 md:h-full h-[40%] relative flex-shrink-0 overflow-hidden">
                <div className="relative w-full opacity-0 h-full przepisyImage">
                  <ImageHorizontal src="/sections/recipe.png" alt="przepisy" />
                </div>
                <div className="absolute top-0 h-full bg-[#019E52] przepisyBg z-10" />
              </div>
              <div className="w-[80%] md:w-full md:h-full h-[60%] flex flex-col gap-4 md:gap-12">
                <div className="relative">
                  <h2 className="text-5xl md:text-6xl xl:text-8xl font-black text-[#FFB706] przepisyTitle opacity-0">
                    Przepisy
                  </h2>
                  <div className="bg-[#DC2528] absolute top-0 left-0 h-[115%] z-10 przepisyTitleBg" />
                </div>
                <div className="relative">
                  <p className="text-white text-xl md:text-2xl xl:text-3xl flex-grow opacity-0 text-justify md:w-full przepisyDesc">
                  Może po prostu szukasz inspiracji na zdrowe posiłki? W naszym serwisie znajdziesz przepisy na dania, 
                  które zaspokoją Twoje podniebienie. Wyszukuj do woli, a z pewnością znajdziesz coś dla siebie!
                  </p>
                  <div className="bg-[#27BDDA] absolute top-0 left-0 h-full z-10 przepisyDescBg" />
                </div>
                <div className="items-end justify-end flex h-full p-4 translate-y-[100%] przepisyButton">
                  <Button
                    text="Znajdź przepis"
                    className="bg-[#DC2528] text-white"
                    href="/blog"
                  />
                </div>
              </div>
            </div>

            <div className="w-screen h-screen flex flex-col md:flex-row flex-shrink-0 md:p-20 gap-4 md:gap-12 items-center">
              <div className="w-full md:w-2/4 md:h-full h-[40%] relative flex-shrink-0 overflow-hidden">
                <div className="relative w-full opacity-0 h-full kalkulatoryImage">
                  <ImageHorizontal
                    src="/sections/product.png"
                    alt="produkty"
                  />
                </div>
                <div className="absolute top-0 h-full bg-[#019E52] kalkulatoryBg z-10" />
              </div>
              <div className="w-[80%] md:w-full md:h-full h-[60%] flex flex-col gap-4 md:gap-12">
                <div className="relative">
                  <h2 className="text-5xl md:text-6xl xl:text-8xl font-black text-[#FFB706] kalkulatoryTitle opacity-0">
                    Produkty
                  </h2>
                  <div className="bg-[#DC2528] absolute top-0 left-0 h-[115%] z-10 kalkulatoryTitleBg" />
                </div>
                <div className="relative">
                  <p className="text-white text-xl md:text-2xl xl:text-3xl flex-grow opacity-0 text-justify md:w-full kalkulatoryDesc">
                    Dzięki połączeniu zbioru produktów wraz z rozpoznawaniem kodów kreskowych, możesz bez problemu wyszukać informacje 
                    o składzie i wartościach odżywczych produktów, które znajdują się na Twoim talerzu lub w koszyku z zakupami.
                  </p>
                  <div className="bg-[#27BDDA] absolute top-0 left-0 h-full z-10 kalkulatoryDescBg" />
                </div>
                <div className="items-end justify-end flex h-full p-4 translate-y-[100%] kalkulatoryButton">
                  <Button
                    text="Wyszukaj produkt"
                    className="bg-[#DC2528] text-white"
                    href="/products"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          {/* widmo do animacji */}
          <div className="absolute -z-10">
            <div className="w-screen h-screen" />
            <div ref={dietaContainerRef} className="w-screen h-screen" />
            <div ref={przepisyContainerRef} className="w-screen h-screen" />
            <div ref={kalkulatoryContainerRef} className="w-screen h-screen" />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
