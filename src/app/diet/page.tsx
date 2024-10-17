"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import HorizontalScrollCarousel from "../components/Diet/Carousel"
import BackgroundPattern from "../components/BackgroundPattern";

export default function Page() {
  return (
    <div>
        <BackgroundPattern/>
      <div className='px-12 py-4 mt-[80px]'>
        <h2 className='text-7xl text-[#26BDDC] mb-3'>Po co komu dieta?</h2>
      </div>
      
      <HorizontalScrollCarousel />

      
    </div>
  );
};


//twoje ciało pokocha diete, a ty pokochasz swoje ciało
//chroni przed wieloma chorobami oraz zwiększa odporność organizmu
//wywiera pozytywny wpływ na flore jelitową
//kontrola wagi
//poprawa wyglądu zewnętrzengo (skóry, włosów, paznokci, sylwetki)
//zwiększenie energii i witalności
//lepsze funckjonowanie mózgu
//nawet spowolnienieprocesu starzenia!
