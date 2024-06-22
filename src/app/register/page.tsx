"use client";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import React from "react";

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
    <div className="relative">
      {loading && <div>Loading...</div>}
      <Background loading={handleLoad} />
      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name
            <input
              type="text"
              {...register("name", { required: true })}
              autoComplete="name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              {...register("email", { required: true })}
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              {...register("password", { required: true })}
              autoComplete="new-password"
            />
          </label>
          <label>
            Confirm password
            <input
              type="password"
              {...register("confirm_password", { required: true })}
              autoComplete="new-password"
            />
          </label>
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
}
