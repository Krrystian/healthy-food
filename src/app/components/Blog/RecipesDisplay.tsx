"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/legacy/image";
import { useRouter, useSearchParams } from "next/navigation";

export const RecipesDisplay = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const diets = decodeURIComponent(searchParams.get("diets") || "");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<
    {
      id: number;
      name: string;
      image: string;
      description: string;
      tags: string[];
    }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState(diets || ""); // Ustawienie stanu na podstawie parametrów URL
  const [searchBy, setSearchBy] = useState<"name" | "tag">(
    diets ? "tag" : "name"
  );

  const tagsOptions = [
    "wegetariańskie",
    "wegańskie",
    "pescowegetariańskie",
    "bezlaktozowe",
    "bezglutenowe",
    "niskotłuszczowe",
    "niskowęglowodanowe",
    "wysokobiałkowe",
    "śniadanie",
    "obiad",
    "kolacja",
    "lunch",
    "podwieczorek",
    "słodkie",
    "słone",
    "ostre",
  ];

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/admin/getRecipe`, {
        params: {
          [searchBy]: searchQuery,
        },
      });
      setRecipes(res.data.recipes);
    } catch (error) {
      console.error("Nie udało się pobrać przepisów:", error);
      setError("Nie udało się pobrać przepisów");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Inicjalizacja po odświeżeniu strony
    if (diets) {
      setSearchBy("tag");
      setSearchQuery(diets);
    }
    fetchData(); // Wywołanie zapytania
  }, [diets]);

  const handleSearch = () => {
    router.push(`?name=${encodeURIComponent(searchQuery)}`);
    fetchData();
  };

  const handleTagClick = (tag: string) => {
    setSearchBy("tag");
    const selectedTags = searchQuery.split(",").filter(Boolean);
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    const query = updatedTags.join(",");
    setSearchQuery(query);
    router.push(`?diets=${encodeURIComponent(query)}`);
    fetchData();
  };

  const clearFilters = () => {
    setSearchBy("name");
    setSearchQuery("");
    router.push("");
    fetchData();
  };

  const skeletons = Array(5)
    .fill(null)
    .map((_, index) => (
      <div
        key={index}
        className="bg-gray-800 animate-pulse rounded-lg p-4 h-48 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-4"
      ></div>
    ));

  return (
    <div className="container mx-auto px-4 py-0 lg:py-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-4 md:mb-0 items-center justify-center mr-4 text-xs lg:text-base">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Wyszukaj przepisy po nazwie..."
              value={searchBy === "name" ? searchQuery : ""}
              onChange={(e) => {
                setSearchBy("name");
                setSearchQuery(e.target.value);
              }}
              className="px-4 py-2 bg-gray-800 text-white rounded w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Szukaj
            </button>

            <div className="mb-4">
              <p className="text-s font-bold mt-2 lg:text-lg">Filtruj według tagów:</p>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-2 gap-1 gap-x-5">
                {tagsOptions.map((tag) => (
                  <label key={tag} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={searchQuery.split(",").includes(tag)}
                      onChange={() => handleTagClick(tag)}
                      className="mr-2 accent-[#FFB703]"
                    />
                    {tag}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full"
          >
            Wyczyść filtry
          </button>
        </div>

        <div className="w-full md:w-3/4">
          {isLoading ? (
            <div className="flex flex-wrap gap-4">{skeletons}</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : recipes.length === 0 ? (
            <div>
              <p>Brak pasujących przepisów.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {recipes.map((recipe) => (
                <Link
                  href={`/blog/recipe/${recipe.id}`}
                  key={recipe.id}
                  className=""
                >
                  <div className="bg-gray-800 text-white rounded-lg p-4 transform hover:scale-105 duration-300 transition-all flex flex-col h-full">
                    <div className="mb-4">
                      <Image
                        src={recipe.image}
                        alt={recipe.name}
                        width={300}
                        height={200}
                        className="object-cover rounded-lg w-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-lg font-bold mb-2">{recipe.name}</h2>
                      <p className="text-sm mb-4 line-clamp-4">{recipe.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {recipe.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#009E52] text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
