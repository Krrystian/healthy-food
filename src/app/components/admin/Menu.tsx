"use client";
import { useNameToRGB } from "@/app/hooks/useNameToRGB";
import { cn } from "@/app/lib/cn";
import { useSession } from "next-auth/react";
import Image from "next/legacy/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Menu: React.FC = () => {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentMenu = searchParams.get("menu") || "Users";
  const [selected, setSelected] = React.useState<string>(currentMenu);

  const fallbackColor = useNameToRGB(session.data?.user?.email || "");
  const color = session.data?.user?.image ? "" : fallbackColor;

  const changeSelection = React.useCallback(
    (val: string) => {
      setSelected(val);
      router.push(`?menu=${val}`);
    },
    [router]
  );

  React.useEffect(() => {
    const menuItem = searchParams.get("menu");
    if (menuItem) {
      setSelected(menuItem);
    }
  }, [searchParams]);

  return (
    <div className="w-full h-full bg-black/60 flex items-center p-8 flex-col gap-8 col-span-3">
      <div className="flex-col flex items-center gap-2">
        <div className="relative w-16 h-16 rounded-full overflow-hidden"></div>
        <p className="text-4xl font-medium text-white tracking-wider">
          Cześć, {session.data?.user?.name}
        </p>
      </div>
      <div className="w-full h-1 bg-white/30 rounded-xl" />
      <div className="w-1/2 text-xl text-white tracking-wider flex flex-col gap-4 items-start *:duration-300 *:transition-all">
        <button
          className={cn(
            "p-2 rounded-2xl px-4",
            selected === "Users" ? "bg-[#019E52]" : "hover:bg-[#27BDDF]"
          )}
          onClick={() => changeSelection("Users")}
        >
          Użytkownicy
        </button>
        <button
          className={cn(
            "p-2 rounded-2xl px-4",
            selected === "Notifications" ? "bg-[#019E52]" : "hover:bg-[#27BDDF]"
          )}
          onClick={() => changeSelection("Notifications")}
        >
          Powiadomienia
        </button>
        <button
          className={cn(
            "p-2 rounded-2xl px-4",
            selected === "Products" ? "bg-[#019E52]" : "hover:bg-[#27BDDF]"
          )}
          onClick={() => changeSelection("Products")}
        >
          Produkty
        </button>
      </div>
    </div>
  );
};

export default Menu;
