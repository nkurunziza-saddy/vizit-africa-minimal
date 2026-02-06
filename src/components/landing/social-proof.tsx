"use client";

import { partnerLogos } from "@/lib/dummy-data";
import { motion } from "framer-motion";

export function SocialProof() {
  return (
    <section className="bg-primary-subtle py-10 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-5 mb-8 text-center">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Trusted by global travelers & partners
        </p>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-primary-subtle to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-primary-subtle to-transparent z-10" />

        <motion.div
          className="flex gap-16 items-center whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {/* Loop twice for seamless infinite scroll */}
          {[
            ...partnerLogos,
            ...partnerLogos,
            ...partnerLogos,
            ...partnerLogos,
          ].map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              {/* Placeholder for Logo - using text for now but styled like a logo */}
              <span className="text-xl font-bold font-display text-foreground/80">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
