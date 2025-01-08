import React from 'react';
import Link from "next/link";

const FormResult = ({ diets }: { diets: string[] }) => {
  
    const dietQuery = diets.join(",");

    return (
        <div className='my-5 rounded-xl p-5 bg-black/40 text-white justify-center'>
            <div className="container mx-auto p-5">
                <h2 className="text-xl font-bold mt-8">Najbardziej pasują do ciebie diety: {diets.join(", ")}</h2>
            </div>
            <Link 
                href={`/blog?diets=${encodeURIComponent(dietQuery)}`} 
                className='p-2 text-white border-2 border-white rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium w-fit'
            >
              Zobacz przykładowe przepisy do twoich diet!
            </Link>
        </div>
    );
}

export default FormResult;