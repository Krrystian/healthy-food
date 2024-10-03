"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { motion } from "framer-motion";
import { describe } from "node:test";

type FormValues = {
  image: File | null;
};

//PUBLIC FORMS
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
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const name = watch("name");
  const onSubmit = (data: { name: string }) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-between"
    >
      <div className="relative">
        <motion.label
          htmlFor="name"
          className="text-white absolute cursor-text duration-200 transition-all text-white/70"
          style={{ top: focused || name ? "-10%" : "40%" }}
        >
          Podaj swoją nową nazwę
        </motion.label>
        <motion.input
          {...register("name")}
          type="text"
          id="name"
          className="p-2 bg-transparent border-b-2 outline-none duration-200 mt-2 w-full"
          style={{
            borderBottomColor: focused ? "#3b82f6" : "white",
          }}
          onFocus={() => setFocused(() => true)}
          onBlur={() => setFocused(() => false)}
        />
      </div>
      <button type="submit" className="bg-white/10 p-2 rounded-xl">
        Zmień
      </button>
    </form>
  );
}

export function ProfileDescriptionForm() {
  const [focused, setFocused] = useState(false);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      description: "",
    },
  });
  const descrption = watch("description");
  const onSubmit = (data: { description: string }) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-between"
    >
      <div className="relative">
        <motion.label
          htmlFor="description"
          className="text-white absolute cursor-text duration-200 transition-all text-white/70"
          style={{ top: focused || descrption ? "-10%" : "0%" }}
        >
          Podaj swoją nową nazwę
        </motion.label>
        <motion.textarea
          {...register("description")}
          id="description"
          className="p-2 bg-transparent border-b-2 outline-none resize-none duration-200 w-full"
          rows={7}
          onBlur={() => setFocused(() => false)}
          onFocus={() => setFocused(() => true)}
          style={{
            borderBottomColor: focused ? "#3b82f6" : "white",
          }}
        />
      </div>
      <button type="submit" className="bg-white/10 p-2 rounded-xl">
        Zmień
      </button>
    </form>
  );
}

// PRIVATE FORMS
export function ProfileEmailForm() {
  const [focused, setFocused] = useState(false);
  const [focused2, setFocused2] = useState(false);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      email: "",
      confirmEmail: "",
    },
  });
  const email = watch("email");
  const confirmEmail = watch("confirmEmail");

  const onSubmit = (data: { email: string }) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-between"
    >
      <div className="flex flex-col gap-6">
        <div className="relative">
          <motion.label
            htmlFor="email"
            className="text-white absolute cursor-text duration-200 transition-all text-white/70"
            style={{ top: focused || email ? "-10%" : "40%" }}
          >
            Podaj swój nowy email
          </motion.label>
          <motion.input
            {...register("email")}
            type="text"
            id="email"
            className="p-2 bg-transparent border-b-2 outline-none duration-200 mt-2 w-full"
            style={{
              borderBottomColor: focused ? "#3b82f6" : "white",
            }}
            onFocus={() => setFocused(() => true)}
            onBlur={() => setFocused(() => false)}
          />
        </div>
        <div className="relative">
          <motion.label
            htmlFor="confirmEmail"
            className="text-white absolute cursor-text duration-200 transition-all text-white/70"
            style={{ top: focused2 || confirmEmail ? "-10%" : "40%" }}
          >
            Wpisz ponownie swój nowy adres email
          </motion.label>
          <motion.input
            {...register("confirmEmail")}
            type="text"
            id="confirmEmail"
            className="p-2 bg-transparent border-b-2 outline-none duration-200 mt-2 w-full"
            style={{
              borderBottomColor: focused2 ? "#3b82f6" : "white",
            }}
            onFocus={() => setFocused2(() => true)}
            onBlur={() => setFocused2(() => false)}
          />
        </div>
      </div>
      <button type="submit" className="bg-white/10 p-2 rounded-xl">
        Zmień
      </button>
    </form>
  );
}

export const ProfilePasswordForm = () => {
  const [focused, setFocused] = useState(false);
  const [focused2, setFocused2] = useState(false);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = (data: { password: string }) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-between"
    >
      <div className="flex flex-col gap-6">
        <div className="relative">
          <motion.label
            htmlFor="password"
            className="text-white absolute cursor-text duration-200 transition-all text-white/70"
            style={{ top: focused || password ? "-10%" : "40%" }}
          >
            Podaj swoje nowe hasło
          </motion.label>
          <motion.input
            {...register("password")}
            type="password"
            id="password"
            className="p-2 bg-transparent border-b-2 outline-none duration-200 mt-2 w-full"
            style={{
              borderBottomColor: focused ? "#3b82f6" : "white",
            }}
            onFocus={() => setFocused(() => true)}
            onBlur={() => setFocused(() => false)}
          />
        </div>
        <div className="relative">
          <motion.label
            htmlFor="confirmPassword"
            className="text-white absolute cursor-text duration-200 transition-all text-white/70"
            style={{ top: focused2 || confirmPassword ? "-10%" : "40%" }}
          >
            Wpisz ponownie swoje nowe hasło
          </motion.label>
          <motion.input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className="p-2 bg-transparent border-b-2 outline-none duration-200 mt-2 w-full"
            style={{
              borderBottomColor: focused2 ? "#3b82f6" : "white",
            }}
            onFocus={() => setFocused2(() => true)}
            onBlur={() => setFocused2(() => false)}
          />
        </div>
      </div>
      <button type="submit" className="bg-white/10 p-2 rounded-xl">
        Zmień
      </button>
    </form>
  );
};

export const ProfileNotificationForm = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center">
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toggle"
            type="checkbox"
            className="hidden"
            checked={checked}
            onChange={() => setChecked((prev) => !prev)}
          />
          {/* Tło przełącznika */}
          <motion.div
            className="block w-14 h-8 rounded-full"
            style={{
              backgroundColor: checked ? "#4b5563" : "#374151",
              transition: "0.2s",
            }}
          />
          {/* Kropka przełącznika */}
          <motion.div
            className="absolute top-1 bg-blue-500/70 w-6 h-6 rounded-full transition-transform duration-200"
            style={{
              left: checked ? "calc(100% - 1.5rem - 10%)" : "10%", //aby nie wyszła za obszar
              transition: "0.2s",
              backgroundColor: checked ? "#22c55e" : "#3b82f6",
            }}
          />
        </div>
      </label>
    </div>
  );
};
