import { cn } from "@/app/lib/cn";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label?: string;
  placeholder?: string;
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
  placeholder,
  type,
  register,
  name,
  autoComplete,
  labelClassName,
  inputClassName,
  disabled,
  error,
}) => {
  const [onFocus, setOnFocus] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <label className={cn("flex flex-col font-medium relative", labelClassName)}>
      {label}
      <div className="relative">
        <input
          className={cn(
            "bg-transparent w-full outline-none transition-colors duration-300 border-black py-1 text-xl",
            inputClassName
          )}
          type={type}
          disabled={disabled}
          {...register(name)}
          autoComplete={autoComplete}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className={cn("absolute w-full h-1 bg-black")} />
        <div
          className={cn(
            "absolute h-1 bg-blue-800 duration-300 transition-all",
            onFocus ? "w-full" : "w-0"
          )}
        />
        <div
          className={cn(
            "absolute top-[15%] text-xl duraiton-300 transition-all cursor-text",
            onFocus || value.length > 0
              ? " translate-y-[-100%] text-base"
              : " translate-y-0"
          )}
        >
          {placeholder}
        </div>
      </div>

      <div className="absolute text-red-700 font-medium bottom-0 translate-y-[100%] py-1">
        {error}
      </div>
    </label>
  );
};

export default Input;
