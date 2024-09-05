import React from "react";
interface CardProps {
  title: string;
  children?: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-black/60 w-[40%] text-white select-none p-4 rounded-xl">
      <h4 className="text-4xl py-4 text-center w-full cursor-default">
        {title}
      </h4>
      <div className="">{children}</div>
    </div>
  );
};

export default Card;
