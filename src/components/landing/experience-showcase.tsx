"use client";

import { RiArrowRightUpLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    id: "bisate",
    name: "Bisate Lodge",
    location: "Volcanoes N.P.",
    description:
      "Nestled in the amphitheatre of an eroded volcanic cone, Bisate offers a luxurious base for gorilla trekking with sustainable architecture.",
    image:
      "https://images.unsplash.com/photo-1667504320745-eade6c25e053?q=90&w=1600&auto=format&fit=crop",
    color: "bg-[#2A3C35]",
  },
  {
    id: "magashi",
    name: "Magashi Camp",
    location: "Akagera N.P.",
    description:
      "A classic safari camp overlooking Lake Rwanyakazinga, offering exclusive access to Rwanda's only savannah big game area.",
    image:
      "https://images.unsplash.com/photo-1511284281977-10b7b4377cfc?q=90&w=1600&auto=format&fit=crop",
    color: "bg-[#8C6D46]",
  },
  {
    id: "nyungwe",
    name: "Nyungwe House",
    location: "Nyungwe Forest",
    description:
      "Set amidst the rich tea plantations on the edge of the ancient rainforest, offering wellness and chimpanzee trekking.",
    image:
      "https://images.unsplash.com/photo-1489640818597-89b1edc97db5?q=90&w=1600&auto=format&fit=crop",
    color: "bg-[#3E4A35]",
  },
];

function Card({
  data,
  index,
  progress,
  range,
  targetScale,
}: {
  data: (typeof experiences)[0];
  index: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{ scale, top: `calc(-10vh + ${index * 25}px)` }}
        className="relative flex flex-col md:flex-row h-[500px] w-full max-w-7xl rounded-3xl overflow-hidden origin-top"
      >
        <div className="md:w-[60%] h-full relative overflow-hidden">
          <motion.div style={{ scale: imageScale }} className="w-full h-full">
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div
          className={cn(
            "md:w-[40%] h-full p-8 flex flex-col justify-between text-white",
            data.color,
          )}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest opacity-80 border border-white/30 px-3 py-1 rounded-full">
              0{index + 1}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest opacity-80">
              {data.location}
            </span>
          </div>

          <div>
            <h3 className="text-4xl md:text-5xl font-black font-display uppercase leading-tight mb-6">
              {data.name}
            </h3>
            <p className="text-lg font-light leading-relaxed opacity-90 mb-8">
              {data.description}
            </p>
            <button
              type="button"
              className="flex items-center gap-2 group cursor-pointer text-sm font-bold uppercase tracking-widest"
            >
              View Lodge
              <span className="bg-white/20 p-2 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
                <RiArrowRightUpLine className="size-4" />
              </span>
            </button>
          </div>

          <div className="opacity-20 text-[10rem] font-black leading-none -mb-16 -ml-4 pointer-events-none">
            {index + 1}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ExperienceShowcase() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} className="bg-background relative">
      <div className="container max-w-7xl mx-auto px-5 mb-24 pt-32">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Curated Stays
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            Handpicked lodges that define luxury and sustainability.
          </p>
        </div>
      </div>

      <div className="pb-[50vh] px-5">
        {experiences.map((exp, i) => {
          const targetScale = 1 - (experiences.length - i) * 0.05;
          return (
            <Card
              key={exp.id}
              data={exp}
              index={i}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
