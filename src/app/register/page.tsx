"use client";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function Page() {
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

  return (
    <form>
      <label>
        Name
        <input type="text" {...register("name", { required: true })} />
      </label>
      <label>
        Email
        <input type="email" {...register("email", { required: true })} />
      </label>
      <label>
        Password
        <input type="password" {...register("password", { required: true })} />
      </label>
      <label>
        Confirm password
        <input
          type="password"
          {...register("confirm_password", { required: true })}
        />
      </label>
      <button onClick={handleSubmit(onSubmit)}>Register</button>
    </form>
  );
}
