import React from 'react'
import BarcodeScanner from '../components/ProductsScanner/BarecodeScanner'
import BackgroundPattern from "../components/BackgroundPattern";

const Page = () => {
  return (
    <div>
      <BackgroundPattern />
      <div className='px-12 pt-4 mt-[40px] md:mt-[80px] text-white'>  
        <h2 className='text-5xl md:text-7xl text-[#26BDDC] text-center md:text-left'>
          Znajdź produkt
        </h2>
        <BarcodeScanner/>
      </div>
    </div>    
  )
}

export default Page
