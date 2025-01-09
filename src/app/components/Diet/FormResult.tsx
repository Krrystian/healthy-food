import React from 'react';
import Link from "next/link";
import Image from 'next/image';

const dietMappingDisplayName: { [key: string]: string } = {
    "wegetariańskie": "Wegetariańska",
    "wegańskie": "Wegańska",
    "pescowegetariańskie": "Pescowegetariańska",
    "bezlaktozowe": "Bezlaktozowa",
    "bezglutenowe": "Bezglutenowa",
    "niskotłuszczowe": "Niskotłuszczowa",
    "niskowęglowodanowe": "Niskowęglowodanowa",
    "wysokobiałkowe": "Wysokobiałkowa",
  };

const FormResult = ({ diets }: { diets: string[] }) => {
  
    const dietQuery = diets.join(",");
    const displayDiets = diets.map(diet => dietMappingDisplayName[diet] || diet).join(", ");

    return (
        <div className='my-5 rounded-xl p-5 bg-black/40 text-white flex flex-col justify-center items-center'>
            <div className="container pb-10 text-center">
                <h2 className="text-base lg:text-xl font-bold mt-8">Najbardziej pasuje/pasują do ciebie dieta/diety:<br/><span className='text-[#009E52] text-xl lg:text-3xl'>{displayDiets}</span></h2>
            </div>
            <div className="relative w-full h-72 mb-10">
                <Image src="/pexels-dietresult.jpg" alt="Diet Result Picture" layout="fill" objectFit="contain" className="rounded-lg" />
            </div>
            <Link 
                href={`/blog?diets=${encodeURIComponent(dietQuery)}`} 
                className='p-2 text-white border-2 border-white rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-base lg:text-lg font-medium w-fit'
            >
            Zobacz przykładowe przepisy do twoich diet!
            </Link>
        </div>
    );
}

export default FormResult;