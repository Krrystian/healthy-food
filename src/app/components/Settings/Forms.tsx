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
const Loader = ({ text }: { text: string }) => {
  const status = text === "Ładowanie" ? "loading" : "success";
  return (
    <div className="absolute bg-black/70 rounded-xl z-10 h-full w-full flex items-center justify-center">
      <div className="flex items-center">
        <span className="text-3xl mr-4">{text}</span>
        {status === "loading" ? (
          <svg
            className="animate-spin h-8 w-8 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <svg
            className="h-8 w-8 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 21 7l-1.4-1.4z"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
};

export function ProfileFieldForm({
  fields,
  formType,
  schema,
  defaultValues = {},
}: {
  fields: { name: string; label: string; type: string }[];
  formType: keyof typeof profileSchemas;
  schema: any;
  defaultValues?: Record<string, string>;
}) {
  const [focused, setFocused] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const [loading, setLoading] = useState(true);
  const [loadingState, setLoadingState] = useState("Ładowanie");
  const values = watch();
  const submitData = useProfileForm(formType);
  const { data: session } = useSession();

  const onSubmit = async (data: Record<string, string>) => {
    setLoading(true);
    const schema = profileSchemas[formType as keyof typeof profileSchemas];
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error(result.error);
      setLoading(false);
      return;
    }
    const response = await submitData(result.data);
    if (response && response.status === 200 && session) {
      setLoading(false);
      setLoadingState("Za chwilę zostaniesz wylogowany");
      setTimeout(async () => {
        await signOut({ callbackUrl: "/login" });
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-between relative"
    >
      {loading && <Loader text={loadingState} />}
      <div className="flex flex-col gap-6 p-2">
        {fields.map(({ name, label, type }) => (
          <div key={name} className="relative">
            <motion.label
              htmlFor={name}
              className="text-white absolute cursor-text duration-200 transition-all text-white/70"
              style={{
                top:
                  focused === name || values[name]
                    ? type === "textarea"
                      ? "-5%"
                      : "-10%"
                    : type === "textarea"
                    ? "5%"
                    : "40%",
              }}
            >
              {label}
            </motion.label>
            {type === "textarea" ? (
              <motion.textarea
                {...register(name)}
                id={name}
                className="p-2 bg-transparent border-b-2 outline-none duration-200 mt-2 w-full"
                onFocus={() => setFocused(name)}
                onBlur={() => setFocused(null)}
                rows={7}
              />
            ) : (
              <motion.input
                {...register(name)}
                type={type}
                id={name}
                className="p-2 bg-transparent border-b-2 outline-none duration-200 mt-2 w-full"
                onFocus={() => setFocused(name)}
                onBlur={() => setFocused(null)}
              />
            )}
            {errors[name] && (
              <p className="text-red-500">{errors[name].message}</p>
            )}
          </div>
        ))}
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

export const ProfileNameForm = ({ defaultName }: { defaultName: string }) => (
  <ProfileFieldForm
    fields={[
      {
        name: "name",
        label: "Podaj swoją nową nazwę",
        type: "text",
      },
    ]}
    defaultValues={{ name: defaultName }}
    schema={profileSchemas.name}
    formType="name"
  />
);

export const ProfileDescriptionForm = ({
  defaultDescription,
}: {
  defaultDescription: string;
}) => (
  <ProfileFieldForm
    fields={[
      {
        name: "description",
        label: "Podaj swój nowy opis",
        type: "textarea",
      },
    ]}
    defaultValues={{ description: defaultDescription }}
    schema={profileSchemas.description}
    formType="description"
  />
);

// PRIVATE FORMS
export const ProfileEmailForm = () => (
  <ProfileFieldForm
    fields={[
      { name: "email", label: "Podaj swój nowy email", type: "text" },
      {
        name: "confirmEmail",
        label: "Wpisz ponownie swój nowy adres email",
        type: "text",
      },
    ]}
    formType="email"
    schema={profileSchemas.email}
  />
);

export const ProfilePasswordForm = () => (
  <ProfileFieldForm
    fields={[
      { name: "password", label: "Podaj swoje nowe hasło", type: "password" },
      {
        name: "confirmPassword",
        label: "Potwierdź nowe hasło",
        type: "password",
      },
    ]}
    formType="password"
    schema={profileSchemas.password}
  />
);

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
