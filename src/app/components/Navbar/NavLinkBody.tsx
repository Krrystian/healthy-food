import Image from "next/image";
import Link from "next/link";

export const BlogContent = () => {
  return (
    <div className="w-[400px] bg-white p-6 shadow-xl grid grid-cols-3 gap-4">
      <div className="flex flex-col col-span-2">
        <h3 className="py-2 font-semibold">Co nowego?</h3>
        <div className="flex flex-row gap-2 hover:bg-slate-300 rounded-xl duration-300 cursor-pointer">
          <Image
            src="/example.jpg"
            alt="Newest image"
            width={140}
            height={70}
            className="rounded-xl object-cover"
          />
          <div>
            <h4 className="font-medium">Mango z okularami</h4>
            <p className="text-xs">
              To niesamowity przypadek kiedy mango ma okulary xD!
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <h4 className="font-semibold py-2">Zajrzyj do nas</h4>
        <div className="text-sm font-medium text-center flex flex-col justify-center">
          <Link href="#" className="relative group py-1">
            Przeglądaj
            <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
          </Link>
          <Link href="#" className="relative group py-1">
            Dyskusje
            <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
          </Link>
          <Link href="#" className="relative group py-1">
            Wydarzenia
            <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
          </Link>
          <Link href="#" className="relative group py-1">
            Dodaj post
            <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const KalkulatoryContent = () => {
  return (
    <div className="w-52 bg-white flex flex-col p-6">
      {/* <div className="text-center">
        <Link href="#" className="relative group font-semibold py-1">
          Czym są kalkulatory?
          <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
        </Link>
      </div> */}
      <div className="text-center">
        <h3 className="font-semibold py-1 cursor-default">
          Dostępne wskaźniki
        </h3>
        <div className="flex flex-col text-sm">
          <Link href="/calculator/bmi" className="relative group py-1">
            BMI
            <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
          </Link>
          <Link href="/calculator/bmr" className="relative group py-1">
            BMR
            <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
          </Link>
          <Link href="/calculator/tdee" className="relative group py-1">
            TDEE
            <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const DietaContent = () => {
  return (
    <div className="w-52 bg-white flex flex-col p-6">
      <div className="text-center gap-2 flex flex-col">
        <Link href="/diet" className="relative group font-semibold py-1">
          Po co komu dieta?
          <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
        </Link>
        <Link href="#" className="relative group font-semibold py-1">
          Przeglądaj diety
          <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
        </Link>
        <div className="flex flex-col text-sm">
          <Link href="#" className="relative group pb-1">
            Wegetariańska
            <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
          </Link>
          <Link href="#" className="relative group py-1">
            Niskotłuszczowa
            <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
          </Link>
          <Link href="#" className="relative group py-1">
            Bezglutenowa
            <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
          </Link>
          <Link href="#" className="relative group py-1">
            Niskowęglowodanowa
            <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
          </Link>
        </div>
        <Link
          href="/diet/form"
          className="relative group py-1 border-2 rounded-xl border-black text-center flex items-center justify-center group overflow-hidden"
        >
          <p className="font-semibold group-hover:-translate-y-full duration-300">
            Poznaj swoją dietę
          </p>
          <p className="absolute translate-y-full font-semibold bg-black text-[#FFB703] w-full h-full flex justify-center items-center duration-300 group-hover:translate-y-0">
            Przystąp do quizu
          </p>
        </Link>
      </div>
    </div>
  );
};

export const PrzepisyContent = () => {
  return (
    <div className="w-52 bg-white flex flex-col p-6">
      <div className="text-center gap-2 flex flex-col">
        <Link href="#" className="relative group font-semibold py-1">
          Przeglądaj przepisy
          <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
        </Link>
        <Link href="#" className="relative group font-semibold py-1">
          Utwórz przepis
          <div className="absolute bottom-0 left-0 w-0 duration-300 transition-all h-1 rounded-xl bg-[#219EBC] group-hover:w-full" />
        </Link>
      </div>
    </div>
  );
};
