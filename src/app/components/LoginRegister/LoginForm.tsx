"use client";
import { loginSchema } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import GoogleButton from "./GoogleButton";
import { animatePageOut } from "@/app/lib/pageTransition";
import dynamic from "next/dynamic";

const Background = dynamic(() => import("./Background"), {
  ssr: false,
});

const LoginForm = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session.status, router]);

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

  const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
    event?.preventDefault();
    setDisabled(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setDisabled(false);
    setLoading(false);
    if (result?.error) {
      console.log(result.error);
    } else if (result?.ok) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <Background loading={handleLoad} />
      <div className="absolute top-0 h-screen right-24 flex items-center z-20 w-[30vw]">
        <div className="px-8 w-full bg-[#FFB703]/90 rounded-3xl min-h-[60vh] py-8 flex flex-col items-center justify-center shadow-xl">
          <div className="w-full flex gap-4 pb-4 items-center ">
            <div className="h-[2px] rounded-xl w-full bg-black" />
            <h1 className="text-3xl font-black">WELCOME</h1>
            <div className="h-[2px] rounded-xl w-full bg-black" />
          </div>
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
            </div>
            <div className="flex w-full justify-center">
              <Button
                label="Login"
                labelSecondary="We missed you!"
                type="submit"
                className=" border-2 border-black text-xl w-[60%]"
                disabled={disabled}
                classNameLabel="bg-[#FFB703]/90"
              />
            </div>
          </form>
          <div className="w-full flex gap-4 items-center py-6">
            <div className="h-[2px] rounded-xl w-full bg-black" />
            <h1 className="text-xl font-black">OR</h1>
            <div className="h-[2px] rounded-xl w-full bg-black" />
          </div>
          <div className="flex flex-col w-full  items-center gap-4">
            <GoogleButton />
            <Button
              label="Don't have an account?"
              type="button"
              onClick={() => {
                animatePageOut("/register", router);
              }}
              className="w-[60%] border-2 border-black text-xl"
              classNameLabel="bg-red-600"
              labelSecondary="Register now!"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
