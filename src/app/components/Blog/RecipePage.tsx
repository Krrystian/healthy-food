"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const RecipePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<any>(null);

  const fetchRecipe = async (id: string) => {
    try {
      const res = await axios.get(`/api/admin/getRecipe`, {
        params: { id },
      });
      setRecipe(res.data.recipe);
    } catch (error) {
      console.error("Nie udało się pobrać przepisu:", error);
      setError("Nie udało się pobrać przepisu");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe(id);
  }, [id]);

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>Nie znaleziono przepisu.</div>;
  }

  return (
    <div className='px-12 pt-4 mt-[40px] md:mt-[80px] text-white'>  
        <h2 className='text-5xl md:text-7xl text-[#26BDDC] text-center md:text-left'>
        {recipe.name}
        </h2>
        <div className='my-5 rounded-xl p-5 bg-black/40'>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className="flex flex-wrap gap-2 pb-1 justify-center">
                  {recipe.tags.map((tag:any) => (
                    <span
                      key={tag}
                      className="bg-[#009E52] text-s px-3 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <img src={recipe.image} alt={recipe.name} className="w-full rounded-lg" />
              </div>

              <div className="md:w-2/3 md:pl-4">
                <p>{recipe.description}</p>
                <h2 className="text-xl font-bold mt-8">Składniki:</h2>
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((ingredient: any) => (
                    <li key={ingredient.id}>
                      {ingredient.name} - {ingredient.quantity} {ingredient.metric}
                    </li>
                  ))}
                </ul>

                <h2 className="text-xl font-bold mt-8">Sposób przygotowania:</h2>
                <ol className="list-decimal list-inside">
                  {recipe.instructions.map((instruction: string, index: number) => (
                    <li key={index} className="p-1">{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

        </div>
      </div>
    
  );
};

export default RecipePage;
