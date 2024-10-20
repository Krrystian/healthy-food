import Image from "next/image";
import * as React from "react";

interface EmailTemplateProps {
  title: string;
  children: React.ReactNode;
  button?: boolean;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  title,
  children,
  button = false,
}) => (
  <div className="w-[600px] text-black flex bg-[#FBA100] flex-col py-4 justify-center items-center">
    <div className="flex gap-4 items-center w-full px-8 py-4">
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <h1 className="text-6xl font-bold">Healthy You</h1>
    </div>
    <div className="bg-[#023047] w-full px-8 py-4 gap-4 flex flex-col">
      <h2 className="text-[#FBA100] text-3xl font-bold">{title}</h2>
      <p className="text-white/80">{children}</p>
      {button && (
        <a
          href="https://healthy-food-indol.vercel.app/"
          className="bg-[#FBA100] cursor-pointer text-[#023047] py-2 px-4 rounded-lg flex justify-center items-center font-medium"
        >
          Sprawdź nowości
        </a>
      )}
    </div>
    <div className="w-full grid grid-cols-5">
      <p className="text-white/50 italic bg-slate-700 w-full px-8 col-span-4 flex items-center">
        Proszę nie odpowiadaj na ten email.
      </p>
      <div className="flex flex-col items-center justify-center">
        <p className="font-semibold">Healthy You</p>
        <p className="italic">2024</p>
      </div>
    </div>
  </div>
);
