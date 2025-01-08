"use client";
import { useParams } from 'next/navigation'
import React from 'react'
import BackgroundPattern from "../../../components/BackgroundPattern";
import FormResult from '@/app/components/Diet/FormResult';


const Page = () => {
    const {type} = useParams();
    const decodedType = decodeURIComponent(type as string).split(",");
    console.log(decodedType);
  return (
    <div>
      <BackgroundPattern/>
      <div className='px-12 py-4 mt-[40px] md:mt-[80px]'>
        <h2 className='text-4xl md:text-7xl text-[#26BDDC] mb-3 text-center md:text-left'>Twoja dieta</h2>
      </div>
      <div>
      <FormResult diets={decodedType} />
              <h1>Dieta: {decodedType}</h1>
      </div>
      
    </div>
    
  )
}

export default Page
