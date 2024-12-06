"use client";
import { useNameToRGB } from "@/app/hooks/useNameToRGB";
import { cn } from "@/app/lib/cn";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/legacy/image";

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
    <div className="w-full h-full bg-black/60 flex items-center flex-col gap-8 py-8 xl:col-span-3">
      <div className="flex-col flex items-center gap-2">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={session.data?.user?.image || ""}
            layout="fill"
            className="object-cover"
            alt="User Image"
          />
        </div>
        <p className="text-4xl font-medium text-white tracking-wider text-center">
          {session.data?.user?.name}
        </p>
      </div>
      <div className="w-full h-1 bg-white/30 rounded-xl" />
      <div className="xl:w-1/2 text-xl text-white tracking-wider flex xl:flex-col gap-4 xl:items-start items-center justify-center *:duration-300 *:transition-all">
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
            selected === "Recipes" ? "bg-[#019E52]" : "hover:bg-[#27BDDF]"
          )}
          onClick={() => changeSelection("Recipes")}
        >
          Przepisy
        </button>
        <button
          className={cn(
            "p-2 rounded-2xl px-4",
            selected === "Statistics" ? "bg-[#019E52]" : "hover:bg-[#27BDDF]"
          )}
          onClick={() => changeSelection("Statistics")}
        >
          Statystyki
        </button>
      </div>
    </div>
  );
};

export default Menu;
