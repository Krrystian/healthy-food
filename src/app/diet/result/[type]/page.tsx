"use client";
import { useParams } from 'next/navigation'
import React from 'react'
import BackgroundPattern from "../../../components/BackgroundPattern";
import FormResult from '@/app/components/Diet/FormResult';


const dietMapping: { [key: string]: string } = {
  "wegetarianska": "wegetariańskie",
  "weganska": "wegańskie",
  "pescowegetarianska": "pescowegetariańskie",
  "bezlaktozowa": "bezlaktozowe",
  "bezglutenowa": "bezglutenowe",
  "niskotluszczowa": "niskotłuszczowe",
  "niskoweglowodanowa": "niskowęglowodanowe",
  "wysokobialkowa": "wysokobiałkowe",
};

const Page = () => {
  const { type } = useParams();
  const decodedType = decodeURIComponent(type as string).split(",");
  const mappedDiets = decodedType.map(diet => dietMapping[diet] || diet);
  return (
    <div>
      <BackgroundPattern />
      <div className='px-12 py-4 mt-[40px] md:mt-[80px]'>
        <h2 className='text-4xl md:text-7xl text-[#26BDDC] mb-3 text-center md:text-left'>Twoja dieta</h2>
        <FormResult diets={mappedDiets} /> 
      </div>
    </div>
  );
};

export default Page;
