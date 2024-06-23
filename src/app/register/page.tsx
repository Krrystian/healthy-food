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
    <div className="relative h-screen bg-orange-300">
      {loading && <div className="bg-orange-300">Loading...</div>}
      <Background loading={handleLoad} />
      {!loading && (
        <div className="absolute top-0 h-screen right-0 flex items-center z-20 w-[40vw]">
          <div className="px-16 w-full bg-yellow-300 rounded-l-3xl h-[80vh] flex flex-col items-center justify-center shadow-xl">
            <div className="w-full flex gap-4 items-center pb-6">
              <h1 className="text-7xl font-black">WELCOME</h1>
              <div className="h-2 rounded-xl w-full bg-black" />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-10"
            >
              <Input
                label="Name"
                type="text"
                register={register}
                name="name"
                autoComplete="name"
                disabled={processing}
                error={errors.name?.message as string}
              />
              <Input
                label="Email"
                type="email"
                register={register}
                name="email"
                autoComplete="email"
                disabled={processing}
                error={errors.email?.message as string}
              />
              <Input
                label="Password"
                type="password"
                register={register}
                name="password"
                autoComplete="new-password"
                disabled={processing}
                error={errors.password?.message as string}
              />
              <Input
                label="Confirm password"
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
                  labelSecondary="Happy to see you!"
                  type="submit"
                  disabled={processing}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
