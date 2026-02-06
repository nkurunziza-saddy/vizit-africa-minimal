"use client";

import { RiArrowRightUpLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const regions = [
  {
    id: "volcanoes",
    name: "Volcanoes",
    subtitle: "The Kingdom of Gorillas",
    image:
      "https://images.unsplash.com/photo-1664303847960-586318f59035?q=80&w=2600&auto=format&fit=crop",
    desc: "Mist-covered peaks and rare encounters in the Virunga Massif.",
  },
  {
    id: "akagera",
    name: "Akagera",
    subtitle: "Savannah Wilderness",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2600&auto=format&fit=crop",
    desc: "Where the Big Five roam free across golden plains.",
  },
  {
    id: "nyungwe",
    name: "Nyungwe",
    subtitle: "Ancient Rainforest",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2600&auto=format&fit=crop",
    desc: "A primate paradise suspended in the clouds.",
  },
  {
    id: "kivu",
    name: "Lake Kivu",
    subtitle: "Inland Sea",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2600&auto=format&fit=crop",
    desc: "Serene waters, islands, and the singing fishermen.",
  },
];

export function Destinations() {
  const [activeId, setActiveId] = useState<string | null>("volcanoes");

  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-5 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Regions
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            From the mist-covered Virunga volcanoes to the golden savannah of
            Akagera.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row h-[80vh] w-full gap-2 md:gap-4">
          {regions.map((region) => {
            const isActive = activeId === region.id;
            return (
              <motion.div
                key={region.id}
                layout
                onClick={() => setActiveId(region.id)}
                className={cn(
                  "relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  isActive ? "flex-[10]" : "flex-[2] hover:flex-[3]",
                )}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={region.image}
                    alt={region.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 transition-colors duration-500",
                      isActive
                        ? "bg-black/20"
                        : "bg-black/50 group-hover:bg-black/30",
                    )}
                  />
                </div>

                {/* Inactive State: Vertical Text */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                    isActive ? "opacity-0 pointer-events-none" : "opacity-100",
                  )}
                >
                  <h3 className="text-2xl font-bold font-display uppercase text-white tracking-widest [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                    {region.name}
                  </h3>
                </div>

                {/* Active State: Rich Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent"
                    >
                      <div className="max-w-xl">
                        <motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="inline-block px-3 py-1 mb-4 text-xs font-mono uppercase tracking-widest text-white border border-white/30 rounded-full backdrop-blur-md"
                        >
                          {region.subtitle}
                        </motion.span>
                        <h3 className="text-5xl md:text-7xl font-black font-display uppercase text-white tracking-tighter mb-6 leading-[0.9]">
                          {region.name}
                        </h3>
                        <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed mb-8">
                          {region.desc}
                        </p>
                        <button
                          type="button"
                          className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white/90 transition-colors"
                        >
                          Explore Region
                          <RiArrowRightUpLine className="size-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
