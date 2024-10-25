import React from 'react'
import BarcodeScanner from '../components/ProductsScanner/BarecodeScanner'
import BackgroundPattern from "../components/BackgroundPattern";

const Page = () => {
  return (
    
    <div>
      <BackgroundPattern />
      <div className='px-12 pt-4 mt-[80px] text-white'>  
        <h2 className='text-7xl text-[#26BDDC]'>Znajdź produkt</h2>
        <BarcodeScanner/>
      </div>
    </div>
  
    
  )
}

export default Page
