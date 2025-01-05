"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import HorizontalScrollCarousel from "../components/Diet/Carousel"
import BackgroundPattern from "../components/BackgroundPattern";
import useSmoothScroll from "../hooks/useSmoothScroll";

export default function Page() {
  useSmoothScroll();
  return (
    <div>
      <BackgroundPattern/>
      <div className='px-12 py-4 mt-[40px] md:mt-[80px]'>
        <h2 className='text-4xl md:text-7xl text-[#26BDDC] mb-3 text-center md:text-left'>Po co komu dieta?</h2>
      </div>
      <HorizontalScrollCarousel />
    </div>
  );
};

