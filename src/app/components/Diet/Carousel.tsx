"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "../text-reveal-card";
import Mouse from "../Mouse";


export default function HorizontalScrollCarousel() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const targetOffset = `${-10 * (cards.length) - 30}%`;
  const x = useTransform(scrollYProgress, [0, 1], ["1%", targetOffset]);
  const sectionHeight = `calc(${cards.length * 100}vh )`;

  return (
    <section ref={targetRef} style={{ height: sectionHeight }} className="relative ">
      <div className="sticky top-0 flex h-screen">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
          <div>
              <CardScreen/>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};
  
const Card = ({ card }:{card:any}) => {
  const { scrollYProgress } = useScroll();
  const descriptionOpacity = useTransform(scrollYProgress, [0.1, 0.13], [0, 1]);
  return (
    <div
      key={card.id}
      className="group relative h-screen w-[400px] md:w-[550px] overflow-hidden bg-neutral-200 text-center"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 bg-white/10">
        <div className="mt-48 h-96 bg-gray-600 m-4 rounded-lg bg-opacity-75">
          <p className="p-8 text-3xl md:text-6xl font-black uppercase text-white">
            {card.title}
          </p>
          <div className="">
            <motion.p
              //style={{ opacity: descriptionOpacity }}
              className="text-base font-medium p-8 text-white text-justify"
            >
              {card.description}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};
{/*
const CardScreen = () => {
  return (
  
    <div className="h-screen w-screen flex flex-col justify-center items-center text-center">
      <TextRevealCard
        text="Twoje ciało pokocha naszą dietę"
        revealText="Ty pokochasz swoje ciało"
      >
      </TextRevealCard>
      
    <Link href="/diet/form" className='p-2 text-white  border-2 border-white rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium w-fit'>Wypełnij quiz, aby poznać dietę</Link>
      
    </div>
  );
};
*/}
  
const CardScreen = () => {
  return (
    <div>
      <Mouse/>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
      <motion.p 
        className="p-8 text-center text-4xl md:text-5xl font-semibold text-white cursor-default"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }} 
      >
        Twoje ciało <span className="text-[#DC2626]">pokocha naszą dietę</span>, a ty <span className="text-[#009E52]">pokochasz swoje ciało</span>!
      </motion.p>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/diet/form" className='p-2 text-white border-2 border-white rounded-md hover:bg-[#FB8500]/90 duration-300 transition-all text-lg font-medium w-fit'>
          Wypełnij quiz, aby poznać dietę
        </Link>
      </motion.div>
    </div>
    </div>
  );
}; 
 
const cards = [
    {
      url: "/dietPic/photo4.jpg",
      title: "Wzmocniona odporność",
      description: "Odpowiednia dieta - dzięki dostarczaniu organizmowi odpowiednich składników odżywczych - wzmacnia układ odpornościowy, a także zmniejsza ryzyko chorób przewlekłych, np. cukrzycy typu 2, chorób serca, otyłości czy nadciśnienia.",
      id: 1,
    },
    {
      url: "/dietPic/photo5.jpg",
      title: "Poprawa trawienia",
      description: "Odpowiednie ilości błonnika pokarmowego i nawodnienie wspierają prawidłowe funkcjonowanie układu trawiennego. Dieta dostosowana do potrzeb organizmu może łagodzić objawy takich problemów jak wzdęcia, zaparcia czy zgaga, dzięki czemu zmniejsza dolegliwości żołądkowe.",
      id: 2,
    },
    {
      url: "/dietPic/photo6.jpg",
      title: "Kontrola wagi",
      description: "Dopasowana dieta pozwala na kontrolę wagi, co jest kluczowe dla zdrowia i dobrego samopoczucia. Pozwala także spalaniu nadmiaru tłuszczu, jednocześnie zachowując masę mięśniową. Dieta dostosowana do indywidualnych potrzeb pozwala osiągność zamierzone efekty.",
      id: 3,
    },
    {
      url: "/dietPic/photo7.jpg",
      title: "Poprawa wyglądu",
      description: "Dieta bogata w witaminy i minerały wpływa korzystnie na kondycję skóry, włosów i paznokci. Przyczynia się również do utrzymanie właściwej masy ciała, a co za tym idzie, do atrakcyjnego wyglądu i pewności siebie.",
      id: 4,
    },
    {
      url: "/dietPic/photo8.jpg",
      title: "Zwiększenie energii",
      description: "Regularne spożywanie odpowiednich posiłków dostarcza energii potrzebnej do codziennych aktywności, a także pomaga w stabilizacji poziomu cukru we krwi, co przekłada się na lepsze samopoczucie i mniejszą drażliwość.",
      id: 5,
    },
    {
      url: "/dietPic/photo2.jpg",
      title: "Lepsza praca mózgu",
      description: "Składniki odżywcze, takie jak kwasy omega-3, wspierają funkcje poznawcze, poprawiając koncentrację i pamięć. Odpowiednia dieta może także zmniejszyć ryzyko wystąpienia chorób neurodegeneracyjnych, takich jak choroba Alzheimera.",
      id: 6,
    },
    {
      url: "/dietPic/photo3.jpg",
      title: "Spowolnienie starzenia",
      description: "Antyoksydanty obecne w zdrowej diecie pomagają w walce z wolnymi rodnikami, co może opóźniać procesy starzenia. Odpowiednie żywienie przyczynia się zatem do dłuższego życia w dobrym zdrowiu i kondycji.",
      id: 7,
    },
  ];