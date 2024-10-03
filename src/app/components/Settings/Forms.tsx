"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { motion } from "framer-motion";

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
    if (imageFile instanceof File) {
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
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-between"
    >
      <motion.div
        className="h-[150px] border-dotted border-2 flex items-center justify-center cursor-pointer"
        onClick={onClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        whileHover={{ backgroundColor: "rgba(255 255 255 0.1)" }}
      >
        <input
          {...register("image")}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              setValue("image", file);
              setImagePreview(URL.createObjectURL(file));
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
      </motion.div>
      <button type="submit" className="bg-white/10 p-2 rounded-xl">
        Zmień
      </button>
    </form>
  );
}

export function ProfileNameForm() {
  const [focused, setFocused] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: { name: string }) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-between"
    >
      <motion.input
        {...register("name")}
        type="text"
        className="p-2 bg-transparent border-b-2 outline-none duration-200 mt-2"
        placeholder="Podaj swoją nową nazwę"
        style={{
          borderBottomColor: focused ? "#3b82f6" : "white",
        }}
        onFocus={() => setFocused(() => true)}
        onBlur={() => setFocused(() => false)}
      />
      <button type="submit" className="bg-white/10 p-2 rounded-xl">
        Zmień
      </button>
    </form>
  );
}

export function ProfileDescriptionForm() {
  const [focused, setFocused] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = (data: { description: string }) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-between"
    >
      <motion.textarea
        {...register("description")}
        className="p-2 bg-transparent border-b-2 outline-none resize-none duration-200"
        rows={7}
        placeholder="Napisz coś o sobie"
        onBlur={() => setFocused(() => false)}
        onFocus={() => setFocused(() => true)}
        style={{
          borderBottomColor: focused ? "#3b82f6" : "white",
        }}
      />
      <button type="submit" className="bg-white/10 p-2 rounded-xl">
        Zmień
      </button>
    </form>
  );
}
