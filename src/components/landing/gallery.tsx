"use client";

import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2600&auto=format&fit=crop",
    alt: "Imigongo Art",
    caption: "Cultural Heritage",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1543832923-44667a44c804?q=80&w=2600&auto=format&fit=crop",
    alt: "Kigali Convention Center",
    caption: "Modern Kigali",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=2600&auto=format&fit=crop",
    alt: "Tea Plantation",
    caption: "Nyungwe Tea",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1628105658145-2b0444319808?q=80&w=2600&auto=format&fit=crop",
    alt: "Gorilla Trekking",
    caption: "Once in a Lifetime",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2600&auto=format&fit=crop",
    alt: "Safari Sunset",
    caption: "Golden Plains",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?q=80&w=2600&auto=format&fit=crop",
    alt: "Canopy Walk",
    caption: "Above the Trees",
  },
];

export function Gallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-background border-t border-border/50 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10 mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Captured Moments
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            See the world through the eyes of our travelers. From luxury stays
            to wild adventures.
          </p>
        </div>
        <Link href="/gallery">
          <Button variant="outline" className="gap-2 rounded-full px-6">
            View Full Gallery <RiArrowRightLine className="size-4" />
          </Button>
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <motion.div style={{ y: y1 }} className="flex flex-col gap-8 md:mt-12">
          {galleryImages.slice(0, 2).map((img, i) => (
            <GalleryCard key={i} img={img} className="aspect-[3/4]" />
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div style={{ y: y2 }} className="flex flex-col gap-8">
          {galleryImages.slice(2, 4).map((img, i) => (
            <GalleryCard key={i} img={img} className="aspect-[4/5]" />
          ))}
        </motion.div>

        {/* Column 3 */}
        <motion.div style={{ y: y3 }} className="flex flex-col gap-8 md:mt-24">
          {galleryImages.slice(4, 6).map((img, i) => (
            <GalleryCard key={i} img={img} className="aspect-[3/4]" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

function GalleryCard({
  img,
  className,
}: {
  img: GalleryImage;
  className?: string;
}) {
  return (
    <div
      className={`relative group overflow-hidden rounded-2xl cursor-pointer ${className}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
      <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <p className="text-white/80 font-mono text-xs uppercase tracking-widest mb-2">
          {img.caption}
        </p>
        <h3 className="text-white font-display text-2xl font-bold">
          {img.alt}
        </h3>
      </div>
    </div>
  );
}
