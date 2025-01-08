import BackgroundPattern from "../../../components/BackgroundPattern";
import React from 'react';
import RecipePage from '../../../components/Blog/RecipePage';


const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <BackgroundPattern />
      
      <RecipePage params={params} />

    </div>
  )
}

export default page
