"use client";

import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import Input from "../components/LoginRegister/Input";
import Button from "../components/LoginRegister/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../lib/zod";
import GoogleButton from "../components/LoginRegister/GoogleButton";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const Background = dynamic(
  () => import("../components/LoginRegister/Background"),
  {
    ssr: false,
  }
);

export default function Page() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoad = () => {
    setLoading(false);
  };
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setDisabled(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setDisabled(false);
    setLoading(false);
    if (result?.error) {
      console.log(result.error);
    } else {
      console.log("Sign in successful:", result);
      router.push("/");
    }
  };

  return (
    <div className="relative h-screen bg-[#023047]">
      {loading && <div className="bg-[#023047]">Loading...</div>}
      <Background loading={handleLoad} />
      {!loading && (
        <div className="absolute top-0 h-screen right-0 flex items-center z-20 w-[40vw]">
          <div className="px-16 w-full bg-[#FFB703]/90 rounded-l-3xl h-[80vh] flex flex-col items-center justify-center shadow-xl">
            <div className="w-full flex gap-4 items-center py-8">
              <div className="h-1 rounded-xl w-full bg-black" />
              <h1 className="text-5xl font-black">WELCOME</h1>
              <div className="h-1 rounded-xl w-full bg-black" />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-[60%] gap-10"
            >
              <Input
                placeholder="Email"
                type="email"
                register={register}
                name="email"
                disabled={disabled}
                autoComplete="email"
                error={errors.email?.message as string}
              />
              <Input
                placeholder="Password"
                type="password"
                register={register}
                name="password"
                disabled={disabled}
                autoComplete="password"
                error={errors.password?.message as string}
              />
              <div className="flex w-full justify-center">
                <Button
                  label="Login"
                  labelSecondary="We missed you!"
                  type="submit"
                  className="w-full border-2 border-black"
                  disabled={disabled}
                  classNameLabel="bg-[#FFB703]/90"
                />
              </div>
            </form>
            <div className="w-full flex gap-4 items-center py-6">
              <div className="h-1 rounded-xl w-full bg-black" />
              <h1 className="text-2xl font-black">OR</h1>
              <div className="h-1 rounded-xl w-full bg-black" />
            </div>
            <GoogleButton />
          </div>
        </div>
      )}
    </div>
  );
}
