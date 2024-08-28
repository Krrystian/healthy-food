"use client";
import { useSession } from "next-auth/react";
import Image from "next/legacy/image";
import React from "react";

const Profie = () => {
  const session = useSession();

  return (
    <div className="w-full h-full bg-[#26BCDB]/40 flex items-center p-8 flex-col gap-8 col-span-3">
      <div className="flex-col flex items-center gap-2">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={session.data?.user?.image || ""}
            layout="fill"
            className=" object-cover"
          />
        </div>
        <p className="text-4xl font-medium text-white tracking-wider">
          {session.data?.user?.name}
        </p>
      </div>
      <div className="w-full h-1 bg-white/30 rounded-xl" />
      <div className="w-1/2 text-xl text-white tracking-wider flex flex-col gap-4 items-start">
        <button className="p-2 rounded-2xl px-4">Publiczne</button>
        <button className="p-2 rounded-xl px-4">Prywatne</button>
        <button className="p-2 rounded-xl px-4">Powiadomienia</button>
        <button className="p-2 rounded-xl px-4">Pomoc</button>
      </div>
    </div>
  );
};

export default Profie;
