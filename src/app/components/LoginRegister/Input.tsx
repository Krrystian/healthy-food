//REFORMATTED
import { cn } from "@/app/lib/cn";
import React from "react";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface InputProps<TFieldValues extends FieldValues> {
  label?: string;
  placeholder?: string;
  type: string;
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  autoComplete?: string;
  labelClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
  error?: string | undefined;
}

const Input = <TFieldValues extends FieldValues>({
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
}: InputProps<TFieldValues>) => {
  const [onFocus, setOnFocus] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <label
      htmlFor={name}
      className={cn("flex flex-col font-medium relative", labelClassName)}
    >
      {label && <span>{label}</span>}
      <div className="relative">
        <input
          className={cn(
            "bg-transparent w-full outline-none transition-colors duration-300 border-black py-1 text-xl",
            error ? "border-red-700" : "border-black",
            inputClassName
          )}
          id={name}
          type={type}
          disabled={disabled}
          {...register(name, {
            required: true,
            onChange: (e) => setValue(e.target.value),
          })}
          autoComplete={autoComplete}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        />
        <div className="absolute w-full h-1 bg-black" />
        <div
          className={cn(
            "absolute h-1 bg-blue-800 duration-300 transition-all",
            onFocus ? "w-full" : "w-0"
          )}
        />
        {placeholder && (
          <div
            className={cn(
              "absolute top-[15%] text-xl duration-300 transition-all cursor-text",
              onFocus || value
                ? "translate-y-[-100%] text-base"
                : "translate-y-0"
            )}
          >
            {placeholder}
          </div>
        )}
      </div>
      {error && (
        <div className="absolute text-red-700 font-medium bottom-0 translate-y-[100%] py-1">
          {error}
        </div>
      )}
    </label>
  );
};

export default Input;
