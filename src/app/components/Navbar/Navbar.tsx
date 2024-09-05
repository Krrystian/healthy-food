"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import NavLink from "./NavLink";
import {
  BlogContent,
  DietaContent,
  KalkulatoryContent,
  KontoContent,
  PrzepisyContent,
} from "./NavLinkBody";
import { SignInButton } from "../SignInOut/SignInButton";
import Image from "next/legacy/image";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/app/lib/pageTransition";
import { useSession } from "next-auth/react";
import BurgerMenu from "./BurgerMenu";
import Link from "next/link";

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [scrollDirection, setScrollDirection] = React.useState("up");
  const [activeMenu, setActiveMenu] = React.useState("");
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

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
            "h-full duration-300 transition-all bg-[#FFB703] relative w-[100vw] px-4 md:block hidden",
            scrollProgress > 30 && "w-[50vw] rounded-b-xl px-2"
          )}
        >
          <div className="flex flex-row justify-between items-center h-full">
            <Image
              src="/logo.png"
              width={60}
              height={60}
              alt="logo"
              priority
              className="cursor-pointer"
              onClick={() => animatePageOut("/", router)}
            />
            <div className="flex flex-row items-center justify-center gap-1">
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
              <NavLink
                label="Przepisy"
                href="/"
                prefetch={true}
                Content={PrzepisyContent}
              />
              <NavLink label="Produkty" href="/" prefetch={true} />
            </div>
            <div className="flex flex-row gap-8">
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
          className="md:hidden bg-[#FBA100] rounded-full flex items-center self-center absolute right-4 h-14 w-14"
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
        <BurgerMenu open={isMenuOpen} />
        {isMenuOpen && (
          <div
            className={
              "w-screen h-screen flex justify-center items-center md:hidden"
            }
          >
            <div className="w-full p-8">
              <p className="border-b-black border-b-2 text-center text-2xl font-medium mb-8">
                Welcome
              </p>
              <div className="flex flex-col text-5xl gap-6">
                <div className="flex flex-col w-full items-center">
                  <div
                    className="flex justify-between w-full items-center"
                    onClick={() =>
                      setActiveMenu((prev: any) => {
                        return prev === "Calculator" ? "" : "Calculator";
                      })
                    }
                  >
                    <p className="">Kalkulatory</p>
                    <div className="relative h-10 w-10 self-end">
                      <Image
                        src={"/arrowMenu.svg"}
                        alt="arrow"
                        layout="fill"
                        className={
                          activeMenu === "Calculator"
                            ? "transform rotate-90"
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full h-full flex px-8 pt-4 relative gap-4 overflow-hidden">
                    {activeMenu === "Calculator" && (
                      <>
                        <div className="w-1 h-full bg-black absolute -translate-x-[400%]" />
                        <div className="flex flex-col gap-2 text-2xl font-medium">
                          <div>BMI</div>
                          <div>BMR</div>
                          <div>TDEE</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div>Blog</div>
                <div>Dieta</div>
                <div>Przepisy</div>
                <Link href="/">Produkty</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
