"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Image from "next/legacy/image";

export default function Diets() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  return (
    <div ref={ref} className="items-center py-16">
      {diets.map((diet, index) => {
        const isLeft = index % 2 === 0; 
        return (
          <motion.div
            key={diet.id}
            className={`flex flex-col xl:flex-row ${isLeft ? "" : "xl:flex-row-reverse"} items-center mb-3 xl:mb-12`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <div className="relative h-[250px] w-[300px] md:h-[320px] md:w-[400px] xl:h-[500px] xl:w-[600px]">
                <Image src={diet.url} alt={diet.title} layout="fill" className="object-contain rounded-lg shadow-lg" />
            </div>
            <div className={`xl:w-1/2 xl:pl-8 h-full flex flex-col justify-center text-white/85 ${isLeft ? "" : "xl:pr-8"}`}>
              <h2 className="text-2xl xl:text-4xl font-bold mb-4 text-center xl:text-left">{diet.title}</h2>
              <p className="text-white/85 text-justify">{diet.description}</p>
              
              <div className="text-sm pt-10">
                <h3 className="font-semibold text-xl xl:text-2xl text-[#009E52]">{diet.recipeTitle}</h3>
                <div className="grid grid-cols-1 xl:grid-cols-2">
                    <div className="w-full">
                        <ul className="list-disc list-inside text-white/85 mb-4">
                            {diet.recipeIng.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full ">
                        <p className="text-justify">{diet.recipeDesc}</p>
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );  
}


const diets = [
    {
      url: "/typeOfDiets/gluten-free.jpg",
      title: "Bezglutenowa",
      description: "Dieta eliminująca gluten, czyli białko występujące w pszenicy, życie, jęczmieniu i owsie (chyba że jest specjalnie oznaczony jako bezglutenowy). Stosowana głównie przez osoby z celiakią lub nadwrażliwością na gluten.",
      id: 1,
      recipeTitle: "Muffinki czekoladowe bezglutenowe",
      recipeIng: [
        "1 duży banan", "140 g jogurtu naturalnego", "1 jajko", "4 łyżki miodu", "1½ szklanki mielonych migdałów", "2 łyżki mąki ryżowej BEZGLUTENOWEJ",
        "1 łyżeczka sody oczyszczonej", "2 łyżki kakao", "4 łyżki wiórków kokosowych", "4 łyżki posiekanych orzechów włoskich",
        "50 g czekolady mlecznej lub gorzkiej"
    ],
      recipeDesc: "Piekarnik nagrzewamy do 175 stopni. Formę na muffinki wypełniamy 9 papilotkami. W misce rozgniatamy jednego dużego banana z jogurtem naturalnym. Dodajemy 1 jajko, miód i mieszamy całość. W drugiej misce mieszamy mielone migdały, mąkę ryżową, 1 łyżeczkę sody oczyszczonej, kakao, wiórki kokosowe i posiekane orzechy włoskie. Do suchych składników dodajemy mokre i mieszamy całość tylko do połączenia składników. Ciasto nakładamy do papilotek, posypujemy posiekaną czekoladą (pół tabliczki na wszystkie muffiny) i pieczemy około 25 minut. Środek muffinek może się trochę zapaść – nie przejmujemy się tym.",
    },
    {
      url: "/typeOfDiets/lactose-free.jpg",
      title: "Bezlaktozowa",
      description: "Dieta eliminująca laktozę, cukier mleczny, który może powodować problemy trawienne u osób z nietolerancją laktozy. Produkty mleczne są zastępowane alternatywami bezlaktozowymi.",
      id: 2,
      recipeTitle: "Ciasto truskawkowe bez laktozy",
      recipeIng: [
        "1 szklanka mąki kukurydzianej certyfikowanej",
        "0,5 szklanki mąki ryżowej certyfikowanej",
        "1/3 szklanki (100 g) brązowego cukru trzcinowego nierafinowego",
        "1 opakowanie cukru cytrynowego bez glutenu (nie jest to konieczne)",
        "1 czubata łyżeczka bezglutenowego proszku do pieczenia",
        "5 jajek klasy M z wolnego wybiegu",
        "szczypta soli",
        "1/3 szklanki 1,5% mleka bez laktozy",
        "20 sztuk mrożonych truskawek bez glutenu",
        "trochę więcej niż 0,5 szklanki oleju rzepakowego",
        "dodatkowo forma silikonowa średniej wielkości oraz cukier puder, którym można posypać ciasto"
      ],
      recipeDesc: "Do misy robota kuchennego wbij białka i wraz ze szczyptą soli ubij na sztywną pianę. Pod koniec miksowania wsyp oba cukry i zaraz potem pojedynczo żółtka, mąki oraz proszek do pieczenia. Masa jest gęsta i dlatego powoli dolej mleko i na samym końcu olej. Miksuj dłużej, aby było puszyste. Po zmiksowaniu ciasto wyszło rzadsze, lecz takie ma być. Przelej je do formy silikonowej i ułóż w dowolnej kombinacji truskawki lekko dociskając. Ciasto wstaw do nagrzanego piekarnika na 180 stopni na funkcji termoobieg i piecz do 30 minut. Po wystudzeniu posyp cukrem pudrem i pokrój w kawałki.",
    },
    {
      url: "/typeOfDiets/low-fat.jpg",
      title: "Niskotłuszczowa",
      description: "Dieta, która ogranicza spożycie tłuszczów, szczególnie tych nasyconych. Często zalecana w przypadku problemów z sercem lub nadwagą.",
      id: 3,
      recipeTitle: "Bruchetta z pomidorami i mozarellą",
      recipeIng: [
        "1 sztuka bagietki",
        "200 g pomidorów koktajlowych",
        "200 g mozzarelli",
        "2 ząbki czosnku",
        "2 łyżki oliwy z oliwek",
        "1 szczypta soli",
        "1 łyżeczka świeżo mielonego różowego pieprzu",
        "świeża bazylia do dekoracji"
      ],
      recipeDesc: "Pokrój bagietkę w grubsze plastry – ale krój ją pod kątem, aby uzyskać większe kromki. Rozgrzej piekarnik do 200 C, na blasze do pieczenia ułóż pokrojoną bagietkę i skrop oliwą z oliwek każdą kromkę. Piecz przez około 5 minut, aż pieczywo będzie przyrumienione. Pokrój pomidorki i mozzarellę w kostkę, przełóż do miski, posól i dokładnie wymieszaj. Natrzyj przekrojonymi ząbkami czosnku każdą kromkę bagietki, póki będą jeszcze ciepłe. Rozłóż pomidory z mozzarellą i udekoruj listkami bazylii oraz dopraw świeżo mielonym różowym pieprzem. Podawaj od razu po przygotowaniu, gdyż to właśnie ciepła bruschetta smakuje najlepiej. ",
    },
    {
      url: "/typeOfDiets/low-carbohydrate.jpg",
      title: "Niskowęglowodanowa",
      description: "Ddieta, która ogranicza spożycie węglowodanów, koncentrując się na białkach i tłuszczach. Często stosowana w celu redukcji wagi lub stabilizacji poziomu cukru we krwi.",
      id: 4,
      recipeTitle: "Piersi z kurczaka z cukinią, pieczarkami i nasionami sezamu",
      recipeIng: ["500 g piersi kurczaka",
        "1 łyżka oleju kokosowego",
        "400 g pieczarek",
        "1 duża cukinia",
        "5 łyżek sosu sojowego",
        "2 łyżki octu balsamicznego",
        "4 ząbki czosnku",
        "1/2 łyżeczki mielonego imbiru",
        "2 łyżki ziaren sezamu"
    ],
      recipeDesc: "    Potnij piersi z kurczaka na mniejsze kawałki. Rozgrzej olej kokosowy w głębokiej patelni i lekko podsmaż kawałki kurczaka, po 5 minut na stronę. Gdy kurczak jest gotowy, przełóż go na talerz. Połóż na patelni umytą i pokrojoną cukinię oraz pieczarki. Smaż warzywa aż do zarumienienia, około 5-8 minut. Pod koniec dodaj do warzyw zmiażdżony czosnek i mielony imbir. Do warzyw dodaj kurczaka i ziarna sezamu, polej wszystko sosem sojowym i octem balsamicznym. Gotuj przed kolejne 3 minuty. Podaj danie z brązowym ryżem, warzywami, kuskusem, kaszą jaglaną lub komosą.",
    },
    {
      url: "/typeOfDiets/pesco.jpg",
      title: "Pescowegetariańska",
      description: "Odmiana diety wegetariańskiej, w której wyklucza się mięso, ale dopuszcza spożywanie ryb i owoców morza obok produktów roślinnych.",
      id: 5,
      recipeTitle: "Zapiekanka rybna z sandaczem i brokułami",
      recipeIng: [
        "500 g filetu z sandacza albo innej białej ryby",
        "1.5 łyżeczki przyprawy do ryb",
        "150 g makaronu",
        "1 sztuka brokułu",
        "3 sztuki pomidorów",
        "4 jajka",
        "200 ml śmietanki 12%",
        "50 g sera żółtego",
        "15 g gałki muszkatołowej",
        "20 g masła",
        "50 ml oliwy z oliwek"
      ],
      recipeDesc: "Filety z sandacza umyj, osusz i podziel na mniejsze kawałki. Wymieszaj 2 łyżki przyprawy Knorr z oliwą i polej nimi sandacza. Następnie rybę wstaw do lodówki na 30 minut. Makaron ugotuj, następnie schłodź w zimnej wodzie. Brokuły sparz w lekko osolonym wrzątku, po czym hartuj w wodzie z lodem, aby nie straciły koloru. Pomidory pokrój w cząstki, ser zetrzyj na tarce. Rozbij jajka i połącz je ze śmietanką oraz startym serem. Dopraw całość gałką muszkatołową. Naczynie żaroodporne wysmaruj oliwą. Ułóż w nim warstwami makaron, pomidory oraz brokuły. Połóż na nich kawałki zamarynowanej ryby. Całość zalej śmietanką i jajkami. Piecz przez około 40 minut w piekarniku rozgrzanym do 170ºC.",
    },
    {
      url: "/typeOfDiets/vegetarian.jpg",
      title: "Wegetariańska",
      description: "Dieta, w której wyklucza się mięso i ryby, ale wciąż można spożywać produkty pochodzenia zwierzęcego, takie jak jajka i nabiał.",
      id: 6,
      recipeTitle: "Pieczone bataty ze szpinakiem i mozzarellą",
      recipeIng: [
        "2 bataty",
        "szpinak (u mnie mrożony)",
        "1 łyżka śmietany",
        "ser mozzarella (nie w kulce, ponieważ ma dużo wody w sobie)",
        "czosnek",
        "granat",
        "sól i pieprz",
        "oliwa do smażenia"
    ],
      recipeDesc: "Bataty dokładnie umyj szorstką gąbeczką. Przekrój je na pół i nakłuj miąższ widelcem. Następnie wyłóż je na papierze do piekarnika nagrzanego do 200 stopni, w funkcji góra-dół na około 45 minut. Czas pieczenia uzależniony jest od wielkości batatów, więc może być on dłuższy. Bataty będą gotowe kiedy bez problemu włożysz widelec do miąższu batata. Na patelni rozgrzej oliwę i ułóż mrożony szpinak. Kiedy w całości się rozmrozi przypraw go obficie solą, pieprzem i świeżym czosnkiem przeciśniętym przez praskę. Dodaj łyżkę śmietany i wymieszaj całość na patelni. Na upieczone bataty ułóż szpinak i mozzarellę, którą wcześniej zetrzyj na małych oczkach tarki. Następnie włóż bataty ponownie do piekarnika do momentu, aż ser się rozpuści. Każdy ziemniak posyp pestkami granatu.",
    },
    {
      url: "/typeOfDiets/vege.jpg",
      title: "Wegańska",
      description: "Dieta eliminująca wszystkie produkty pochodzenia zwierzęcego, w tym mięso, nabiał, jajka oraz produkty takie jak miód. Opiera się na spożywaniu roślin, warzyw, owoców, ziaren i roślin strączkowych.",
      id: 7,
      recipeTitle: "Kuskus z cukinią i tofu",
      recipeIng: [
        "150 g kaszy kuskus (½ standardowego opakowania)",
        "1 kostka tofu (180 g)",
        "1 cukinia (ok. 300 g)",
        "1 nieco większy pomidor (200 g) albo ½ puszki krojonych pomidorów",
        "1 duży ząbek czosnku",
        "2 łyżki oleju (rzepakowy, oliwa lub sezamowy)",
        "2 łyżki sosu sojowego",
        "1 łyżka cukru (polecam trzcinowy, muscovado lub kokosowy)",
        "1 łyżeczka przyprawy 5 smaków (lub przyprawy chińskiej lub curry)",
        "opcjonalne doprawienie: po ⅓ łyżeczki soli, ostrej papryki, kurkumy",
        "do podania: 1 łyżka sezamu, garść posiekanych listków bazylii (lub szczypiorek lub kolendra)"
      ],
      recipeDesc: "Zagotuj wodę do zalania kuskusu. Kuskus zalej wrzątkiem w misce lub garnku 1cm ponad poziom kaszy i odstaw na 5 minut. Cukinię umyj i pokrój na kawałki. Tofu i pomidora krój w kostkę. Czosnek posiekaj drobno. Na patelni na średnim ogniu rozgrzej 2 łyżki oleju i wrzuć cukinię, smaż 2-3 minuty. Cukinię przesuń na bok i wsyp czosnek i tofu, zalej je sosem sojowym i smaż 2 minuty. Na patelnię dodaj pokrojonego pomidora, wsyp przyprawy: przyprawę pięciu smaków (lub przyprawę kuchni chińskiej/curry), cukier i opcjonalnie dodatkowe przyprawy (kurkumę, sól, ostrą paprykę). Wymieszaj i smaż całość przez 2-3 minuty, pomidor zacznie się rozpadać i połączy wszystkie składniki. Na patelnię wsyp namoczony we wrzątku kuskus i wymieszaj całość. Danie posyp sezamem i posiekaną bazylią (albo inną zieleniną).",
    },
    {
      url: "/typeOfDiets/high-protein.jpg",
      title: "Wysokobiałkowa",
      description: "Dieta bogata w białko, która może wspierać budowanie masy mięśniowej oraz wspomagać utratę tłuszczu. Źródła białka to mięso, ryby, jaja, produkty mleczne oraz rośliny strączkowe.",
      id: 8,
      recipeTitle: "Placuszki z serka wiejskiego",
      recipeIng: [
        "2 jajka",
        "0.5 opakowania budyniu o smaku waniliowym bez cukru",
        "200 g serka wiejskiego",
        "0.5 szklanki mąki pszennej",
        "1 łyżeczka proszku do pieczenia",
        "trochę oleju roślinnego do smażenia",
        "masło orzechowe",
        "ewentualnie dowolny dżem",
        "ulubione owoce, np. banan, truskawki, maliny"
      ],
      recipeDesc: " Oddziel żółtka od białek i umieść je w dwóch osobnych miseczkach. Do żółtek dodaj 1 opakowanie serka wiejskiego (200 g) i dokładnie wymieszaj. Dodaj ½ opakowania budyniu waniliowego bez cukru oraz ½ szklanki mąki pszennej i 1 łyżeczkę proszku do pieczenia, a następnie dokładnie wymieszaj wszystkie składniki na jednolitą masę. Ubij białka na sztywną pianę. Delikatnie wmieszaj ubite białka do masy serkowej. Rozgrzej olej na patelni. Smaż placuszki na złoty kolor z obu stron. Po usmażeniu odkładaj placuszki na papierowy ręcznik, aby pozbyć się nadmiaru tłuszczu. Posmaruj masłem orzechowym, dżemem oraz posyp ulubionymi owocami.",
    },
  ];