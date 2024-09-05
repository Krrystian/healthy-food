"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";

type FormValues = {
  image: File | null;
};

export function ProfileImageForm() {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      image: null,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setImagePreview(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [imageFile]);

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  const onClick = () => {
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setValue("image", file); // Set the first file directly
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div
        className="h-[150px] border-dotted border-2 flex items-center justify-center hover:bg-white/10"
        onClick={onClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <input
          {...register("image")}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setValue("image", e.target.files[0]);
              setImagePreview(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
        {imagePreview ? (
          <div className="w-24 h-24 relative rounded-full overflow-hidden">
            <Image
              src={imagePreview}
              alt="Profile"
              className="object-cover"
              layout="fill"
            />
          </div>
        ) : (
          <p>Drop or upload your image</p>
        )}
      </div>
      <button type="submit" className="bg-white/10 p-2 rounded-xl">
        Submit
      </button>
    </form>
  );
}
