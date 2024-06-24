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

const Background = dynamic(
  () => import("../components/LoginRegister/Background"),
  {
    ssr: false,
  }
);

export default function Page() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [match, setMatch] = React.useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (processing) return;
      setProcessing(true);
      if (data.password !== data.confirm_password) {
        setMatch("Passwords do not match.");
        setProcessing(false);
        return null;
      }
      const response = await axios.post("/api/auth/register", data);
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
    <div className="relative h-screen bg-[#023047]">
      {loading && <div className="bg-[#023047]">Loading...</div>}
      <Background loading={handleLoad} />
      {!loading && (
        <div className="absolute top-0 h-screen right-0 flex items-center z-20 w-[40vw]">
          <div className="px-16 w-full bg-[#FFB703] rounded-l-3xl h-[80vh] flex flex-col items-center justify-center shadow-xl">
            <div className="w-full flex gap-4 items-center py-8">
              <div className="h-1 rounded-xl w-full bg-black" />
              <h1 className="text-5xl font-black">WELCOME</h1>
              <div className="h-1 rounded-xl w-full bg-black" />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-[60%] gap-8"
            >
              <Input
                placeholder="Name"
                type="text"
                register={register}
                name="name"
                autoComplete="name"
                disabled={processing}
                error={errors.name?.message as string}
              />
              <Input
                placeholder="Email"
                type="email"
                register={register}
                name="email"
                autoComplete="email"
                disabled={processing}
                error={errors.email?.message as string}
              />
              <Input
                placeholder="Password"
                type="password"
                register={register}
                name="password"
                autoComplete="new-password"
                disabled={processing}
                error={errors.password?.message as string}
              />
              <Input
                placeholder="Confirm password"
                type="password"
                register={register}
                name="confirm_password"
                autoComplete="new-password"
                disabled={processing}
                error={match}
              />
              <div className="flex w-full justify-center">
                <Button
                  label="Register"
                  labelSecondary="And change your life!"
                  type="submit"
                  className="w-full"
                  disabled={processing}
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
