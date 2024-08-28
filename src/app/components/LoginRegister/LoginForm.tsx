"use client";
import { loginSchema } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
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
  React.useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, []);
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
      router.push("/");
    }
  };

  return (
    <>
      <Background loading={handleLoad} />
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
          <div className="flex flex-col w-full  items-center gap-4">
            <GoogleButton />
            <Button
              label="Don't have an account?"
              type="button"
              onClick={() => {
                animatePageOut("/register", router);
              }}
              className="w-[60%] border-2 border-black"
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
