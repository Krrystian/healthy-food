"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import BackgroundPattern from "../../components/BackgroundPattern";
import Diets from "@/app/components/Diet/TypesOfDiets";

export default function Page() {
  return (
    <div>
      <BackgroundPattern/>
      <div className='px-12 pt-4 mt-[80px]'>
        <h2 className='text-7xl text-[#26BDDC]'>Przeglądaj diety</h2>
        <Diets />
      </div>
      
    </div>
  );  
};