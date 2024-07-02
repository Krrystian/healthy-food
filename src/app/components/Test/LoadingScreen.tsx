import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

interface LoadingScreenProps {
  loading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loading }) => {
  const greetings = [
    "Hello",
    "Hola",
    "Bonjour",
    "Hallo",
    "Ciao",
    "Olá",
    "Здравствуйте",
    "你好",
    "こんにちは",
    "안녕하세요",
    "مرحبا",
    "नमस्ते",
    "হ্যালো",
    "Merhaba",
    "سلام",
    "Hej",
    "Hei",
    "Helló",
    "Ahoj",
    "Cześć",
    "Salut",
    "Здраво",
    "שלום ",
    "สวัสดี",
    "Xin chào",
    "Jambo",
  ];

  const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("ii");
      setCurrentGreeting((prevGreeting) => {
        const currentIndex = greetings.indexOf(prevGreeting);
        const nextIndex = (currentIndex + 1) % greetings.length;
        return greetings[nextIndex];
      });
    }, 2000);
    if (loading === false) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [greetings, loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: loading ? "0" : "-100%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="z-[999] w-screen h-screen fixed top-0 left-0 bg-black text-white flex justify-center items-center"
        >
          <p className="text-9xl font-black">{currentGreeting}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
