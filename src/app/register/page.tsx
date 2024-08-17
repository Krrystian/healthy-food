"use client";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import React from "react";
import Input from "../components/LoginRegister/Input";
import Button from "../components/LoginRegister/Button";
import GoogleButton from "../components/LoginRegister/GoogleButton";
import { animatePageOut } from "../lib/pageTransition";

const Background = dynamic(
  () => import("../components/LoginRegister/Background"),
  {
    ssr: false,
  }
);

export default function Page() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [match, setMatch] = React.useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nameReg: "",
      emailReg: "",
      passwordReg: "",
      confirm_passwordReg: "",
    },
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (processing) return;
      setProcessing(true);
      if (data.passwordReg !== data.confirm_passwordReg) {
        setMatch("Passwords do not match.");
        setProcessing(false);
        return null;
      }
      const response = await axios.post("/api/auth/register", {
        name: data.nameReg,
        email: data.emailReg,
        password: data.passwordReg,
      });
      if (response.status === 201) {
        router.push("/login");
      }
      if (response.status === 400) {
        alert(response.data);
      }
      setProcessing(false);
    } catch (error: any) {
      setMatch(error.response.data);
      setProcessing(false);
    }
  };
  const handleLoad = () => {
    setLoading(false);
  };
  return (
    <div className="relative z-[60] h-screen bg-[#023047]">
      <Background loading={handleLoad} />
      {!loading && (
        <div className="absolute top-0 h-screen right-0 flex items-center z-20 w-[40vw]">
          <div className="px-16 w-full bg-[#FFB703]/90 rounded-l-3xl h-[90vh] flex flex-col items-center justify-center shadow-xl">
            <div className="w-full flex gap-4 items-center pb-8">
              <div className="h-1 rounded-xl w-full bg-black" />
              <h1 className="text-5xl font-black">WELCOME</h1>
              <div className="h-1 rounded-xl w-full bg-black" />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-[60%] gap-10"
            >
              <Input
                placeholder="Name"
                type="text"
                register={register}
                name="nameReg"
                autoComplete="name"
                disabled={processing}
                error={errors.name?.message as string}
              />
              <Input
                placeholder="Email"
                type="email"
                register={register}
                name="emailReg"
                autoComplete="email"
                disabled={processing}
                error={errors.email?.message as string}
              />
              <Input
                placeholder="Password"
                type="password"
                register={register}
                name="passwordReg"
                autoComplete="new-password"
                disabled={processing}
                error={errors.password?.message as string}
              />
              <Input
                placeholder="Confirm password"
                type="password"
                register={register}
                name="confirm_passwordReg"
                autoComplete="new-password"
                disabled={processing}
                error={match}
              />
              <div className="flex w-full justify-center">
                <Button
                  label="Register"
                  labelSecondary="Change your life!"
                  type="submit"
                  className="w-full border-2 border-black"
                  disabled={processing}
                  classNameLabel="bg-[#FFB703]/90"
                  classNameLabelSecondary=""
                />
              </div>
            </form>
            <div className="w-full flex gap-4 items-center py-6">
              <div className="h-1 rounded-xl w-full bg-black" />
              <h1 className="text-2xl font-black">OR</h1>
              <div className="h-1 rounded-xl w-full bg-black" />
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
              <GoogleButton />
              <Button
                label="Have an account?"
                type="button"
                onClick={() => {
                  animatePageOut("/login", router);
                }}
                className="w-[60%] border-2 border-black"
                classNameLabel="bg-red-600"
                labelSecondary="Login now!"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
