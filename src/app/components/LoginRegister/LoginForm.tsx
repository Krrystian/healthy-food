"use client";
import { loginSchema } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import Button from "./Button";
import Input from "./Input";
import GoogleButton from "./GoogleButton";
import { animatePageOut } from "@/app/lib/pageTransition";

const Background = dynamic(() => import("./Background"), { ssr: false });

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLoad = () => setLoading(false);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setDisabled(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setDisabled(false);
    setLoading(false);

    if (!result || result.error || result.url == null) {
      setError("email", { type: "manual", message: "User not found" });
    } else {
      window.location.href = "/";
    }
  };

  return (
    <>
      <Background loading={handleLoad} />
      <div className="absolute top-0 h-screen md:right-24 flex items-center z-20 lg:w-[30vw] md:w-1/2 w-full">
        <div className="px-8 w-full bg-[#FFB703]/90 rounded-3xl min-h-[60vh] py-8 flex flex-col items-center justify-center shadow-xl">
          <Header title="WELCOME" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-10 items-center"
          >
            <div className="flex flex-col w-[80%] gap-10 justify-center items-center">
              <Input
                placeholder="Email"
                type="email"
                register={register}
                name="email"
                disabled={disabled}
                autoComplete="email"
                error={errors.email?.message}
              />
              <Input
                placeholder="Password"
                type="password"
                register={register}
                name="password"
                disabled={disabled}
                autoComplete="current-password"
                error={errors.password?.message}
              />
            </div>
            <div className="flex w-full justify-center">
              <Button
                label="Login"
                labelSecondary="We missed you!"
                type="submit"
                className="border-2 border-black text-xl w-[60%]"
                disabled={disabled}
                classNameLabel="bg-[#FFB703]/90"
              />
            </div>
          </form>
          <Divider text="OR" />
          <div className="flex flex-col w-full items-center gap-4">
            <GoogleButton />
            <div className="flex w-full justify-center">
              <Button
                label="Don't have an account?"
                type="button"
                className="border-2 border-black text-xl w-[60%]"
                onClick={() => animatePageOut("/register", router)}
                classNameLabel="bg-red-600"
                labelSecondary="Register now!"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Header = ({ title }: { title: string }) => (
  <div className="w-full flex gap-4 pb-4 items-center">
    <div className="h-[2px] rounded-xl w-full bg-black" />
    <h1 className="text-3xl font-black">{title}</h1>
    <div className="h-[2px] rounded-xl w-full bg-black" />
  </div>
);

const Divider = ({ text }: { text: string }) => (
  <div className="w-full flex gap-4 items-center py-6">
    <div className="h-[2px] rounded-xl w-full bg-black" />
    <h1 className="text-xl font-black">{text}</h1>
    <div className="h-[2px] rounded-xl w-full bg-black" />
  </div>
);

export default LoginForm;
