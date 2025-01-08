import React from 'react'
import BackgroundPattern from "../components/BackgroundPattern";
import { RecipesDisplay } from '../components/Blog/RecipesDisplay';


const page = () => {
  return (
    <div>
      <BackgroundPattern />
      <div className='px-12 pt-4 mt-[40px] md:mt-[80px] text-white'>  
        <h2 className='text-5xl md:text-7xl text-[#26BDDC] text-center md:text-left'>
          Przepisy
        </h2>
        <div className='my-5 rounded-xl p-10 bg-black/40'>
          <RecipesDisplay />
        </div>
      </div>
    </div>
  )
}

export default page
