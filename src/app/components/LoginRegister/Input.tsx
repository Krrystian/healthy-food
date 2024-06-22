import { cn } from "@/app/lib/cn";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  autoComplete?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  register,
  name,
  autoComplete,
  labelClassName,
  inputClassName,
}) => {
  return (
    <label className={cn("flex flex-col text-2xl font-medium", labelClassName)}>
      {label}
      <input
        className={cn(
          "bg-transparent border-b-4 border-l-4 rounded-bl-xl outline-none border-black px-4 py-1",
          inputClassName
        )}
        type={type}
        {...register(name)}
        autoComplete={autoComplete}
      />
    </label>
  );
};

export default Input;
