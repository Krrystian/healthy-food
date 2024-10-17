"use client";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { motion } from "framer-motion";
import useProfileForm from "@/app/hooks/useProfileForm";
import { profileSchemas } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut, useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const submitData = useProfileForm("image", session?.user.email);

  const onSubmit = async (data: FormValues) => {
    const response = await submitData(data);

    if (response && response.status === 200 && session) {
      await signOut({ callbackUrl: "/login" });
    }
  };
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

  const onClick = () => {
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-between"
    >
      <motion.div
        className="h-[150px] border-dotted border-2 flex items-center justify-center cursor-pointer"
        onClick={onClick}
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
      <button
        type="submit"
        className="bg-white/10 p-2 rounded-xl duration-300 hover:bg-blue-500"
      >
        Zmień
      </button>
    </form>
  );
}

export function ProfileNameForm({ defaultName }: { defaultName: string }) {
  const [focused, setFocused] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchemas.name),
    defaultValues: {
      name: defaultName,
    },
  });

  const submitData = useProfileForm("name");
  const { data: session } = useSession();
  const onSubmit = async (data: { name: string }) => {
    const response = await submitData(data);

    if (response && response.status === 200 && session) {
      console.log("User name updated");
      await signOut({ callbackUrl: "/login" });
    }
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
          style={{ top: focused || !!defaultName ? "-10%" : "40%" }}
        >
          Podaj swoją nową nazwę
        </motion.label>
        <motion.input
          {...register("name")}
          type="text"
          id="name"
          className="p-2 bg-transparent border-b-2 outline-none duration-200 mt-2 w-full"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-white/10 p-2 rounded-xl duration-300 hover:bg-blue-500"
      >
        Zmień
      </button>
    </form>
  );
}

export function ProfileDescriptionForm({
  defaultDescription,
}: {
  defaultDescription: string;
}) {
  const [focused, setFocused] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchemas.description),
    defaultValues: {
      description: defaultDescription || "",
    },
  });

  const submitData = useProfileForm("description");
  const { data: session } = useSession();

  const onSubmit = async (data: { description: string }) => {
    const response = await submitData(data);

    if (response && response.status === 200 && session) {
      await signOut({ callbackUrl: "/login" });
    }
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
          style={{ top: "-10%" }}
        >
          Podaj swój nowy opis
        </motion.label>
        <motion.textarea
          {...register("description")}
          id="description"
          className="p-2 bg-transparent border-b-2 outline-none resize-none duration-200 w-full"
          rows={7}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-white/10 p-2 rounded-xl duration-300 hover:bg-blue-500"
      >
        Zmień
      </button>
    </form>
  );
}

// PRIVATE FORMS
export function ProfileEmailForm({ defaultEmail }: { defaultEmail: string }) {
  const [focused, setFocused] = useState(false);
  const [focused2, setFocused2] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchemas.email),
    defaultValues: {
      email: "",
      confirmEmail: "",
    },
  });
  const email = watch("email");
  const confirmEmail = watch("confirmEmail");

  const submitData = useProfileForm("email");
  const { data: session } = useSession();

  const onSubmit = async (data: { email: string; confirmEmail: string }) => {
    const response = await submitData(data);

    if (response && response.status === 200 && session) {
      await signOut({ callbackUrl: "/login" });
    }
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
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
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
            onFocus={() => setFocused2(true)}
            onBlur={() => setFocused2(false)}
          />
          {errors.confirmEmail && (
            <p className="text-red-500">{errors.confirmEmail.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-white/10 p-2 rounded-xl duration-300 hover:bg-blue-500"
      >
        Zmień
      </button>
    </form>
  );
}

export const ProfilePasswordForm = () => {
  const [focused, setFocused] = useState(false);
  const [focused2, setFocused2] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchemas.password),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const submitData = useProfileForm("password");
  const { data: session } = useSession();

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    const response = await submitData(data);

    if (response && response.status === 200 && session) {
      await signOut({ callbackUrl: "/login" });
    }
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
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="relative">
          <motion.label
            htmlFor="confirmPassword"
            className="text-white absolute cursor-text duration-200 transition-all text-white/70"
            style={{ top: focused2 || confirmPassword ? "-10%" : "40%" }}
          >
            Potwierdź nowe hasło
          </motion.label>
          <motion.input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className="p-2 bg-transparent border-b-2 outline-none duration-200 mt-2 w-full"
            onFocus={() => setFocused2(true)}
            onBlur={() => setFocused2(false)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-white/10 p-2 rounded-xl duration-300 hover:bg-blue-500"
      >
        Zmień
      </button>
    </form>
  );
};

export const ProfileNotificationForm = ({
  defaultNotifications,
  defaultAds,
}: {
  defaultNotifications: boolean;
  defaultAds: boolean;
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      notifications: defaultNotifications,
      ads: defaultAds,
    },
  });

  const submitData = useProfileForm("notifications");
  const { data: session } = useSession();

  const onSubmit = async (data: { notifications: boolean; ads: boolean }) => {
    const response = await submitData(data);

    if (response && response.status === 200 && session) {
      await signOut({ callbackUrl: "/login" });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-left flex-col justify-between h-full"
    >
      <div className="flex flex-col gap-4">
        <Controller
          name="notifications"
          control={control}
          render={({ field }) => (
            <label
              htmlFor="notifications-toggle"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  id="notifications-toggle"
                  type="checkbox"
                  className="hidden"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                <motion.div
                  className="block w-14 h-8 rounded-full"
                  style={{
                    backgroundColor: field.value ? "#4b5563" : "#374151",
                    transition: "0.2s",
                  }}
                />
                {/* Kropka przełącznika */}
                <motion.div
                  className="absolute top-1 bg-blue-500/70 w-6 h-6 rounded-full transition-transform duration-200"
                  style={{
                    left: field.value ? "calc(100% - 1.5rem - 10%)" : "10%",
                    transition: "0.2s",
                    backgroundColor: field.value ? "#22c55e" : "#3b82f6",
                  }}
                />
              </div>
              <span className="ml-3 text-white">
                Czy chcesz otrzymywać ogłoszenia na email
              </span>
            </label>
          )}
        />

        <Controller
          name="ads"
          control={control}
          render={({ field }) => (
            <label
              htmlFor="ads-toggle"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  id="ads-toggle"
                  type="checkbox"
                  className="hidden"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                {/* Tło przełącznika */}
                <motion.div
                  className="block w-14 h-8 rounded-full"
                  style={{
                    backgroundColor: field.value ? "#4b5563" : "#374151",
                    transition: "0.2s",
                  }}
                />
                {/* Kropka przełącznika */}
                <motion.div
                  className="absolute top-1 bg-blue-500/70 w-6 h-6 rounded-full transition-transform duration-200"
                  style={{
                    left: field.value ? "calc(100% - 1.5rem - 10%)" : "10%",
                    transition: "0.2s",
                    backgroundColor: field.value ? "#22c55e" : "#3b82f6",
                  }}
                />
              </div>
              <span className="ml-3 text-white">
                Czy chcesz otrzymywać reklamy na email
              </span>
            </label>
          )}
        />
      </div>
      <button
        type="submit"
        className="bg-white/10 p-2 rounded-xl duration-300 hover:bg-blue-500 mt-4"
      >
        Zapisz
      </button>
    </form>
  );
};
