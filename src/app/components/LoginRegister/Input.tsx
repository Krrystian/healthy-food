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
  disabled?: boolean;
  error?: string | undefined;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  register,
  name,
  autoComplete,
  labelClassName,
  inputClassName,
  disabled,
  error,
}) => {
  return (
    <label
      className={cn(
        "flex flex-col text-xl font-medium relative",
        labelClassName
      )}
    >
      {label}
      <input
        className={cn(
          "bg-transparent border-b-4 border-l-4 rounded-bl-xl outline-none focus:border-blue-800 transition-colors duration-300 border-black px-4 py-1",
          inputClassName
        )}
        type={type}
        disabled={disabled}
        {...register(name)}
        autoComplete={autoComplete}
      />
      <div className="absolute text-red-700 font-medium bottom-0 translate-y-[100%]">
        {error}
      </div>
    </label>
  );
};

export default Input;
