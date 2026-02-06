"use client";

import { motion } from "motion/react";
import {
  RiMapPinLine,
  RiTimeLine,
  RiStarFill,
  RiArrowRightUpLine,
} from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";

const coolPlaces = [
  {
    id: "mount-bisoke",
    name: "Mount Bisoke",
    tagline: "Crater Lake Summit",
    location: "Volcanoes National Park",
    bestTime: "Jun - Sep",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1714669257443-51837247f0d2?w=1200&auto=format&fit=crop&q=90",
    highlights: [
      "Crater lake at summit",
      "6-hour challenging hike",
      "Panoramic views",
    ],
    color: "from-emerald-900/90 to-emerald-700/60",
  },
  {
    id: "lake-kivu",
    name: "Lake Kivu",
    tagline: "Jewel of the Rift",
    location: "Western Rwanda",
    bestTime: "Year-round",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1514547085879-968fe519da2c?q=90&w=1200&auto=format&fit=crop",
    highlights: [
      "Island hopping",
      "Coffee plantation tours",
      "Stunning sunsets",
    ],
    color: "from-blue-900/90 to-cyan-700/60",
  },
  {
    id: "nyungwe-forest",
    name: "Nyungwe Forest",
    tagline: "Ancient Rainforest",
    location: "Southwest Rwanda",
    bestTime: "Jun - Aug",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1489640818597-89b1edc97db5?w=1200&auto=format&fit=crop&q=90",
    highlights: ["Canopy walkway", "Chimpanzee tracking", "13 primate species"],
    color: "from-green-900/90 to-lime-700/60",
  },
  {
    id: "kigali-city",
    name: "Kigali City",
    tagline: "Africa's Cleanest Capital",
    location: "Central Rwanda",
    bestTime: "Year-round",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1648708511872-5426c0f29c27?q=90&w=1200&auto=format&fit=crop",
    highlights: ["Genocide Memorial", "Vibrant markets", "Art galleries"],
    color: "from-amber-900/90 to-orange-700/60",
  },
];

const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

export function CoolPlaces() {
  return (
    <section className="py-32 bg-[oklch(14%_0_0)]">
      <div className="container max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springTransition}
          className="text-center mb-16"
        >
          <span className="text-primary-light font-mono text-sm uppercase tracking-[0.3em] mb-4 block">
            Must-Visit Destinations
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Cool Places to Visit
          </h2>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
            Discover the hidden gems and iconic landmarks that make Rwanda a
            truly magical destination.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {coolPlaces.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: index * 0.1,
              }}
              className="group relative h-[300px] md:h-[350px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-white/80 text-sm backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-full">
                    <RiMapPinLine className="size-4" />
                    <span>{place.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-bold backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-full">
                    <RiStarFill className="size-4" />
                    <span>{place.rating}</span>
                  </div>
                </div>

                <div>
                  <span className="text-white/60 font-mono text-xs uppercase tracking-widest mb-2 block">
                    {place.tagline}
                  </span>

                  <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    {place.name}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {place.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="text-xs font-medium text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <RiTimeLine className="size-4" />
                      Best: {place.bestTime}
                    </div>

                    <Link href={`/plan-trip?destination=${place.id}`}>
                      <button
                        type="button"
                        className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-white/90"
                      >
                        Explore
                        <RiArrowRightUpLine className="size-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
