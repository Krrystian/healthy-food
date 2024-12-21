"use client";
import BackgroundPattern from '@/app/components/BackgroundPattern';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Image from 'next/image';

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  const [tags, setTags] = React.useState<string[]>([]);
  const tagInputRef = React.useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const addTag = () => {
    if (
      tagInputRef.current &&
      tagInputRef.current.value.trim() !== '' &&
      !tags.includes(tagInputRef.current.value.trim())
    ) {
      const newTag = tagInputRef.current.value.trim();
      setTags((prevTags) => [...prevTags, newTag]);
      tagInputRef.current.value = '';
    }
  };

  const removeTag = (e: React.MouseEvent<HTMLDivElement>) => {
    const tag = e.currentTarget.textContent;
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <div className="w-screen min-h-screen xl:pt-[80px] relative flex flex-col items-center justify-center text-white">
      <BackgroundPattern />
      <form className="w-1/2 flex flex-col gap-4">
        <div className="flex gap-4 text-xl p-4 rounded-xl px-8 justify-center items-baseline bg-black/40">
          <label htmlFor="Title">Nazwa:</label>
          <input
            type="text"
            id="Title"
            className="bg-transparent border-2 border-transparent border-b-white/60 focus:outline-none focus:border-[#ffb703] text-[#ffb703] px-1 w-full"
          />
        </div>
        <div className="flex flex-col gap-4 text-xl py-4 rounded-xl px-8 justify-center items-baseline bg-black/40">
          <div className="w-full flex gap-4 items-baseline">
            <label htmlFor="Tag">Tagi:</label>
            <input
              type="text"
              id="Tag"
              ref={tagInputRef}
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
          <div className="flex flex-row flex-wrap gap-3">
            {tags.length === 0 ? (
              <div className="text-gray-500">Brak tagów</div>
            ) : (
              tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-[#ffb703] px-2 rounded-sm text-black hover:bg-red-500 cursor-pointer"
                  onClick={removeTag}
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
                    // setValue("image", file);
                    setImagePreview(URL.createObjectURL(file));
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
        <div className="flex gap-4 text-xl p-4 bg-[#023047] rounded-xl px-8 justify-center items-top">
          <label htmlFor="Preparation">Przepis:</label>
          <textarea
            id="Preparation"
              rows={5}
              className="bg-transparent border-2 border-transparent border-b-white/60 focus:outline-none focus:border-[#ffb703] px-1 resize-none w-full"
            />
        </div>
      </form>
    </div>
  );
};

export default Page;