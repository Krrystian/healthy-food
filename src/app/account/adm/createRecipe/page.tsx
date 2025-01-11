"use client";
import BackgroundPattern from '@/app/components/BackgroundPattern';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useForm, FieldValues } from 'react-hook-form';
import axios from 'axios';
import { useS3Uploader } from '@/app/hooks/useS3Uploader';
import { createRecipeSchema } from '@/app/lib/zod';
import { z } from 'zod';
//TODO: dodać error message zamiast alert w wypadku kiedy nie jest to zrobione poprawnie
type Product = {
  name: string;
  quantity: string;
  metric: string;
};

type FormData = {
  title: string;
  tags: string[];
  products: Product[];
  image: string | null;
  description: string;
  preparation: string;
  tagInput: string;
  productName: string;
  productQuantity: string;
  productMetric: string;
};

const Page: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { uploadToS3 } = useS3Uploader();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      tags: [],
      products: [],
      image: null,
      description: '',
      preparation: '',
      tagInput: '',
      productName: '',
      productQuantity: '',
      productMetric: 'szklanka',
    },
  });

  const tags = watch('tags');
  const products = watch('products');
  const imagePreview = watch('image');

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  const addTag = (): void => {
    const tagInput = getValues('tagInput');
    if (tagInput && !tags.includes(tagInput.trim())) {
      setValue('tags', [...tags, tagInput.trim()]);
      setValue('tagInput', '');
    }
  };

  const removeTag = (tag: string): void => {
    setValue('tags', tags.filter((t) => t !== tag));
  };

  const addProduct = (): void => {
    const productName = getValues('productName');
    const productQuantity = getValues('productQuantity');
    const productMetric = getValues('productMetric');

    if (productName && productQuantity && productMetric) {
      const newProduct: Product = {
        name: productName,
        quantity: productQuantity,
        metric: productMetric,
      };

      if (products.some((product) => product.name === newProduct.name)) {
        alert('Produkt o tej nazwie już istnieje.');
        return;
      }

      setValue('products', [...products, newProduct]);
      setValue('productName', '');
      setValue('productQuantity', '');
    }
  };

  const removeProduct = (name: string): void => {
    setValue('products', products.filter((p) => p.name !== name));
  };

  const onSubmit = async (data: FormData) => {
    console.log('Form Data:', data);
    
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const path = 'recipe'; 
      const imageUrl = await uploadToS3(file, "", path, data.title);
      setValue('image', imageUrl);
      const { tagInput, productName, productQuantity, productMetric, ...filteredData } = data;
      const userId = session?.user?.id;

      try {
        createRecipeSchema.parse(filteredData);
        const response = await axios.post('/api/admin/createRecipe', {
          ...filteredData,
          image: imageUrl,
          userId,
        });
        console.log('Response:', response.data);
        reset();
        alert('Zapisano!');
    } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Validation failed:", error.errors);
          alert("Validation failed. Please check the form fields.");
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
  };

  return (
    <div className="w-screen min-h-screen xl:pt-[80px] relative flex flex-col items-center justify-center text-white">
      <BackgroundPattern />
      <form
        className="w-1/2 flex flex-col gap-4 py-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-8 gap-4 text-xl p-4 rounded-xl px-8 justify-center items-baseline bg-black/40">
          <label htmlFor="Title" className="col-span-1">Nazwa:</label>
          <input
            type="text"
            id="Title"
            {...register('title')}
            className="col-span-7 bg-transparent border-2 border-transparent border-b-white/60 focus:outline-none focus:border-[#ffb703] text-[#ffb703] px-1 w-full"
          />
        </div>

        <div className="flex flex-col gap-4 text-xl py-4 rounded-xl px-8 justify-center items-baseline bg-black/40">
          <div className="grid grid-cols-8 w-full gap-4 items-baseline">
            <label htmlFor="Tag">Tagi:</label>
            <div className="flex gap-4 col-span-7">
              <input
                type="text"
                id="Tag"
                {...register('tagInput')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="bg-transparent border-2 border-transparent border-b-white/60 focus:outline-none focus:border-[#ffb703] px-1 w-full text-[#ffb703]"
              />
              <button
                type="button"
                className="bg-blue-500/50 hover:bg-blue-500/70 duration-300 px-4 py-2 rounded text-white"
                onClick={addTag}
              >
                Dodaj
              </button>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-3">
            {tags.length === 0 ? (
              <div className="text-gray-500">Brak tagów</div>
            ) : (
              tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-[#ffb703] px-2 rounded-sm text-black hover:bg-red-500 cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                </div>
              ))
            )}
          </div>
        </div>

        <motion.div
          className="h-[200px] border-dotted border-2 flex items-center justify-center cursor-pointer bg-black/40"
          whileHover={{ backgroundColor: "rgba(255 255 255 0.1)" }}
          onClick={() => {
            const input = document.querySelector(
              'input[type="file"]'
            ) as HTMLInputElement;
            if (input) {
              input.click();
            }
          }}
        >
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setValue('image', URL.createObjectURL(file));
              }
            }}
          />
          {imagePreview ? (
            <div className="w-full h-full relative overflow-hidden">
              <Image
                src={imagePreview}
                alt="Image preview"
                className="object-cover"
                layout="fill"
              />
            </div>
          ) : (
            <p>Dodaj obrazek do przepisu</p>
          )}
        </motion.div>

        <div className="grid grid-cols-8 gap-4 text-xl p-4 bg-black/40 rounded-xl px-8 justify-center items-top row-span-2">
          <label htmlFor="Description">Opis:</label>
          <textarea
            id="Description"
            rows={5}
            {...register('description')}
            className="bg-transparent border-2 border-transparent border-b-white/60 focus:outline-none focus:border-[#ffb703] px-1 resize-none w-full col-span-7"
          />
        </div>

        <div className="grid grid-cols-8 gap-4 text-xl p-4 bg-black/40 rounded-xl px-8 justify-center items-top">
          <label htmlFor="Preparation">Instrukcja:</label>
          <textarea
            id="Preparation"
            rows={5}
            {...register('preparation')}
            className="bg-transparent border-2 border-transparent border-b-white/60 focus:outline-none focus:border-[#ffb703] px-1 resize-none w-full col-span-7"
          />
        </div>

        <div className="flex flex-col gap-4 text-xl py-4 rounded-xl px-8 justify-center items-baseline bg-black/40">
          <div className="w-full flex gap-4 items-baseline">
            <label htmlFor="ProductName">Produkt:</label>
            <input
              type="text"
              id="ProductName"
              {...register('productName')}
              className="bg-transparent border-2 border-transparent border-b-white/60 focus:outline-none focus:border-[#ffb703] px-1 w-full text-[#ffb703]"
            />
            <label htmlFor="ProductQuantity">Pojemność:</label>
            <input
              type="text"
              id="ProductQuantity"
              {...register('productQuantity')}
              className="bg-transparent border-2 border-transparent border-b-white/60 focus:outline-none focus:border-[#ffb703] px-1 w-full text-[#ffb703]"
            />
            <select
              {...register('productMetric')}
              className="px-4 py-2 bg-white/10 rounded text-white"
            >
              <option value="szklanka">Szklanka</option>
              <option value="lyzeczka">Łyżeczka</option>
              <option value="lyzka">Łyżka</option>
              <option value="ml">Mililitr</option>
              <option value="l">Litr</option>
              <option value="g">Gram</option>
              <option value="dag">Dekagram</option>
              <option value="kg">Kilogram</option>
              <option value="sztuka">Sztuka</option>
            </select>
            <button
              type="button"
              className="bg-blue-500/50 hover:bg-blue-500/70 duration-300 px-4 py-2 rounded text-white"
              onClick={addProduct}
            >
              Dodaj
            </button>
          </div>
          <div className="flex flex-row flex-wrap gap-3">
            {products.length === 0 ? (
              <div className="text-gray-500">Brak produktów</div>
            ) : (
              products.map((product) => (
                <div
                  key={product.name}
                  className="bg-[#ffb703] px-2 rounded-sm text-black hover:bg-red-500 cursor-pointer"
                  onClick={() => removeProduct(product.name)}
                >
                  {product.name} {product.quantity} {product.metric}
                </div>
              ))
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500/50 hover:bg-green-500/70 duration-300 px-6 py-3 rounded text-white text-xl mt-4"
        >
          Zapisz
        </button>
      </form>
    </div>
  );
};

export default Page;
