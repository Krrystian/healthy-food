"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function Page() {
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
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
