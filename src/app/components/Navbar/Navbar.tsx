"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/cn";
import NavLink from "./NavLink";
import {
  BlogContent,
  DietaContent,
  KalkulatoryContent,
  KontoContent,
} from "./NavLinkBody";
import { SignInButton } from "../SignInOut/SignInButton";
import Image from "next/legacy/image";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/app/lib/pageTransition";
import { useSession } from "next-auth/react";
import BurgerMenu from "./BurgerMenu";
import Link from "next/link";
import BurgerMenuItem from "./BurgerMenuItem";

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [scrollDirection, setScrollDirection] = React.useState("up");
  const [activeMenu, setActiveMenu] = React.useState("");
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const menuItemList = [
    {
      title: "Kalkulatory",
      items: [
        { name: "BMI", href: "/calculator/bmi" },
        { name: "BMR", href: "/calculator/bmr" },
        { name: "TDEE", href: "/calculator/tdee" },
      ],
    },
    {
      title: "Blog",
      items: [
        { name: "Latest Posts", href: "/blog/latest" },
        { name: "Popular Posts", href: "/blog/popular" },
        { name: "Categories", href: "/blog/categories" },
      ],
    },
    {
      title: "Dieta",
      items: [
        { name: "Po co komu dieta?", href: "/diet" },
        { name: "Przeglądaj diety", href: "/diet/diets" },
      ],
    },
  ];
  const handleScroll = () => {
    if (isMenuOpen) return;

    const currentScrollPos = window.scrollY;

    if (currentScrollPos > scrollProgress) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }

    setScrollProgress(currentScrollPos);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    router.prefetch("/login");
    router.prefetch("/register");

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollProgress]);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isMenuOpen]);

  const loggedIn = session.status === "authenticated";
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <nav
        className={cn(
          "fixed z-50 h-20 flex w-screen justify-center duration-300 transition-all text-[#023047] bg-transparent",
          scrollProgress > 100 && scrollDirection === "down" && !isMenuOpen
            ? "translate-y-[-100%]"
            : "translate-y-0"
        )}
      >
        <motion.div
          className={cn(
            "h-full duration-300 transition-all bg-[#FFB703] relative w-[100vw] px-4 xl:block hidden",
            scrollProgress > 30 && "w-[50vw] rounded-b-xl px-2"
          )}
        >
          <div className="relative flex flex-row justify-between items-center h-full">
            <Image
              src="/logo.png"
              width={60}
              height={60}
              alt="logo"
              priority
              className="cursor-pointer"
              onClick={() => animatePageOut("/", router)}
            />
            <div className="absolute flex flex-row items-center justify-center gap-1 w-full">
              <NavLink
                label="Kalkulatory"
                href="/calculator/bmi"
                prefetch={true}
                Content={KalkulatoryContent}
              />
              <NavLink
                label="Blog"
                href="/"
                prefetch={true}
                Content={BlogContent}
              />
              <NavLink
                label="Dieta"
                href="/"
                prefetch={true}
                Content={DietaContent}
              />
              <NavLink label="Produkty" href="/products" prefetch={true} />
            </div>
            <div className="flex flex-row gap-8 z-20">
              {loggedIn ? (
                <NavLink
                  label="Konto"
                  href="/"
                  prefetch={true}
                  Content={KontoContent}
                  account
                  underline={false}
                  className="px-8 border-2 rounded-xl border-black"
                />
              ) : (
                <SignInButton className="p-3 border-2 border-[#023047] rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-xl font-medium">
                  Login
                </SignInButton>
              )}
            </div>
          </div>
        </motion.div>
        <div
          className={cn(
            "xl:hidden bg-[#FBA100] rounded-full flex items-center self-center absolute right-4 h-14 w-14 z-50"
          )}
          onClick={(event: any) => {
            event.stopPropagation();
            setMenuOpen((prev: any) => !prev);
          }}
        >
          <div
            className={cn(
              "relative w-full flex justify-center items-center transition-all duration-300 z-50",
              "after:content-[''] after:block after:w-[50%] after:bg-white after:h-[2px] after:absolute after:top-1/2 after:transform after:translate-y-[5px] after:transition-all after:duration-300",
              "before:content-[''] before:block before:w-[50%] before:bg-white before:h-[2px] before:absolute before:top-1/2 before:transform before:-translate-y-[5px] before:transition-all before:duration-300",
              isMenuOpen &&
                "before:rotate-45 before:translate-y-0 after:rotate-[-45deg] after:translate-y-0"
            )}
          />
        </div>
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <div
              className={
                "w-screen h-screen flex justify-between flex-col items-center xl:hidden py-8 group"
              }
            >
              <BurgerMenu open={isMenuOpen} />
              <motion.div
                className="w-full p-8"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: -100,
                  transition: { delay: 0, duration: 0.2 },
                }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <motion.p
                  className="border-b-black border-b-2 text-center text-2xl font-medium mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  Welcome
                </motion.p>
                <motion.div
                  className="flex flex-col text-5xl gap-1"
                  transition={{
                    staggerChildren: 0.1,
                    delayChildren: 0.1,
                  }}
                >
                  {menuItemList.map((item, index) => (
                    <BurgerMenuItem
                      key={index}
                      title={item.title}
                      activeMenu={activeMenu}
                      setActiveMenu={setActiveMenu}
                      items={item.items}
                      setIsMenuOpen={setMenuOpen}
                    />
                  ))}
                  <Link href="/products" className="text-2xl">
                    Produkty
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex flex-col gap-4 w-full px-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: -20,
                  transition: { delay: 0, duration: 0.1 },
                }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Link
                  href="/diet/form"
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-medium tracking-wider text-white bg-[#023047] text-center w-full rounded-xl p-4"
                >
                  Wypełnij Quiz
                </Link>
                {session.status === "authenticated" ? (
                  <Link
                    href="/account/settings"
                    onClick={() => setMenuOpen(false)}
                    prefetch={true}
                    className="text-2xl text-black font-medium border-[#023047] border-4 text-center w-full rounded-xl p-4"
                  >
                    Profil
                  </Link>
                ) : (
                  <SignInButton className="text-2xl text-black font-medium border-[#023047] border-4 text-center w-full rounded-xl p-4">
                    Zaloguj / Zarejestruj się
                  </SignInButton>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
