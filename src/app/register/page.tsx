"use client";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import React from "react";
import Input from "../components/LoginRegister/Input";

const Background = dynamic(
  () => import("../components/LoginRegister/Background"),
  {
    ssr: false,
  }
);

export default function Page() {
  const [loading, setLoading] = React.useState(true);
  const { register, handleSubmit } = useForm<FieldValues>({
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
    if (data.password !== data.confirm_password) {
      console.log(data);
      return alert("Passwords do not match");
    }
    const response = await axios.post("/api/auth/register", data);
    console.log(response);
    if (response.status === 201) {
      router.push("/login");
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
          <div className="p-16 w-full bg-yellow-300 rounded-l-xl h-[80vh] flex flex-col items-center justify-center">
            <div className="flex flex-col pb-6">
              <h1 className="text-5xl font-black text-center">Welcome</h1>
              <h2 className="text-2xl font-medium text-center italic text-black/40">
                Hope you will stay for longer!
              </h2>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-6"
            >
              <Input
                label="Name"
                type="text"
                register={register}
                name="name"
                autoComplete="name"
              />
              <Input
                label="Email"
                type="email"
                register={register}
                name="email"
                autoComplete="email"
              />
              <Input
                label="Password"
                type="password"
                register={register}
                name="password"
                autoComplete="new-password"
              />
              <Input
                label="Confirm password"
                type="password"
                register={register}
                name="confirm_password"
                autoComplete="new-password"
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
