"use client";
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
    const {type} = useParams();
    const decodedType = decodeURIComponent(type as string).split(",");
    console.log(decodedType);
  return (
    <div>
      <h1>Dieta: {decodedType}</h1>
    </div>
  )
}

export default Page
