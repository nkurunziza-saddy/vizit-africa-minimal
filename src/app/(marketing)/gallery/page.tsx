"use client";

import { useState } from "react";
import { RiCloseLine, RiZoomInLine, RiFilter3Line } from "@remixicon/react";
import { Navbar } from "@/components/shared";
import { Footer } from "@/components/landing";
import { motion, AnimatePresence } from "framer-motion";

// Real high-quality images for gallery
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2600&auto=format&fit=crop",
    alt: "Imigongo Art",
    caption: "Cultural Heritage",
    category: "culture",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1543832923-44667a44c804?q=80&w=2600&auto=format&fit=crop",
    alt: "Kigali Convention Center",
    caption: "Modern Kigali",
    category: "urban",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=2600&auto=format&fit=crop",
    alt: "Tea Plantation",
    caption: "Nyungwe Tea",
    category: "nature",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1628105658145-2b0444319808?q=80&w=2600&auto=format&fit=crop",
    alt: "Gorilla Trekking",
    caption: "Once in a Lifetime",
    category: "wildlife",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2600&auto=format&fit=crop",
    alt: "Safari Sunset",
    caption: "Golden Plains",
    category: "wildlife",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?q=80&w=2600&auto=format&fit=crop",
    alt: "Canopy Walk",
    caption: "Above the Trees",
    category: "adventure",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1565355866173-d5d140e69818?q=80&w=2600&auto=format&fit=crop",
    alt: "Lake Kivu",
    caption: "Serene Waters",
    category: "relax",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=2600&auto=format&fit=crop",
    alt: "Mount Bisoke",
    caption: "Volcanic Views",
    category: "adventure",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1552423316-6950337c8651?q=80&w=2600&auto=format&fit=crop",
    alt: "Giraffes",
    caption: "Akagera Giants",
    category: "wildlife",
  },
];

const categories = [
  "all",
  "wildlife",
  "nature",
  "culture",
  "adventure",
  "relax",
  "urban",
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages =
    activeTab === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeTab);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-neutral-50 pt-20">
        <section className="bg-primary-subtle py-16 md:py-24 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-white/40" />
          <div className="mx-auto max-w-7xl px-5 md:px-10 text-center relative z-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Explore the beauty of Rwanda through our lens. From the misty
              mountains to the vibrant city life.
            </p>
          </div>
        </section>

        <section className="py-4 border-b border-border bg-white/80 backdrop-blur-md sticky top-16 z-30 shadow-sm">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="flex items-center gap-2 mr-4 text-muted-foreground hidden md:flex">
                <RiFilter3Line className="size-5" />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              {categories.map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-5 md:px-10 max-w-7xl mx-auto min-h-[50vh]">
          <motion.div
            layout
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ duration: 0.4 }}
                  key={img.id}
                  className="group relative overflow-hidden rounded-2xl bg-muted break-inside-avoid cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                  onClick={() => setSelectedImage(img.src)}
                >
                  <div className="w-full relative">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <RiZoomInLine className="size-6 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    <p className="text-white text-lg font-bold font-display">
                      {img.caption}
                    </p>
                    <p className="text-white/80 text-xs font-mono uppercase tracking-widest mt-1">
                      {img.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>
      <Footer />

      {/* Improved Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full z-50"
              onClick={() => setSelectedImage(null)}
            >
              <RiCloseLine className="size-8" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-6xl w-full max-h-[90vh] rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full size preview"
                className="w-full h-full object-contain max-h-[90vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
