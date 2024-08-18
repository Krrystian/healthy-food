import { cn } from "@/app/lib/cn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import SplitType from "split-type";
interface TextAppearProps {
  className?: string;
  children: React.ReactNode;
  options?: {
    stagger?: number;
    start?: string;
    end?: string;
  };
}
const TextAppear: React.FC<TextAppearProps> = ({
  children,
  className,
  options = {
    stagger: 0.05,
    start: "top 70%",
    end: "bottom 50%",
  },
}) => {
  const ref = React.useRef<HTMLParagraphElement>(null);
  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (ref.current) {
      const splitText = new SplitType(ref.current, { types: "chars,words" });
      gsap.from(splitText.chars, {
        y: 50,
        opacity: 0,
        stagger: options.stagger,
        scrollTrigger: {
          trigger: ref.current,
          start: options.start,
          end: options.end,
          scrub: true,
          markers: true,
        },
      });
    }
  }, []);
  return (
    <p ref={ref} className={cn(className)}>
      {children}
    </p>
  );
};

export default TextAppear;
