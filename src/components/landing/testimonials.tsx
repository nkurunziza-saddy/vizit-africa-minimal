"use client";

import { RiDoubleQuotesL, RiStarFill } from "@remixicon/react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

// Enhanced testimonials with Unsplash photos
const testimonials = [
  {
    id: "t-1",
    name: "Sarah Mitchell",
    role: "Adventure Traveler",
    country: "United Kingdom",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content:
      "Vizit Africa made our gorilla trekking dream come true. The logistics were flawless, and our guide Jean-Pierre was incredibly knowledgeable. Highly recommended!",
    rating: 5,
  },
  {
    id: "t-2",
    name: "John Davis",
    role: "Business Traveler",
    country: "USA",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content:
      "I needed a quick car rental and hotel for a conference in Kigali. Their team arranged everything within hours. Professional, reliable, and excellent service.",
    rating: 5,
  },
  {
    id: "t-3",
    name: "Aisha Mohammed",
    role: "Family Vacation",
    country: "Kenya",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
    content:
      "Traveling with kids can be stressful, but Vizit Africa handled everything. The Lake Kivu resort they suggested was perfect for our family. We'll be back!",
    rating: 5,
  },
  {
    id: "t-4",
    name: "Marcus Chen",
    role: "Solo Explorer",
    country: "Singapore",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content:
      "As a solo traveler, safety was my priority. Their local guides made me feel completely at ease while showing me hidden gems I'd never find on my own.",
    rating: 5,
  },
  {
    id: "t-5",
    name: "Emma Laurent",
    role: "Photographer",
    country: "France",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    content:
      "The golden hour at Akagera was magical. They knew exactly where to position us for the best shots. My portfolio has never looked better!",
    rating: 5,
  },
];

export function Testimonials() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-muted/50 text-foreground border-t border-border/50 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10 mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground text-center">
          Traveler Stories
        </h2>
        <p className="text-muted-foreground text-lg font-light text-center max-w-2xl mx-auto">
          Real stories from real trips. See why thousands of adventurers choose
          Vizit Africa.
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-zinc-50 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-zinc-50 to-transparent z-10" />

        {/* Row 1 - Left */}
        <motion.div style={{ x: x1 }} className="flex gap-6 mb-6 w-max px-4">
          {[...testimonials, ...testimonials].map((testimonial, i) => (
            <TestimonialCard key={`row1-${i}`} testimonial={testimonial} />
          ))}
        </motion.div>

        {/* Row 2 - Right */}
        <motion.div
          style={{ x: x2 }}
          className="flex gap-6 w-max px-4 -ml-[400px]"
        >
          {[...testimonials, ...testimonials]
            .reverse()
            .map((testimonial, i) => (
              <TestimonialCard key={`row2-${i}`} testimonial={testimonial} />
            ))}
        </motion.div>
      </div>
    </section>
  );
}

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  country: string;
  avatar: string;
  content: string;
  rating: number;
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <div className="shrink-0 w-[380px] p-6 bg-white rounded-2xl border border-border/40 transition-all duration-300 group">
      {/* Header with Avatar and Stars */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative size-12 rounded-full overflow-hidden ring-2 ring-primary/10">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm">
              {testimonial.name}
            </h4>
            <p className="text-xs text-muted-foreground">
              {testimonial.role} • {testimonial.country}
            </p>
          </div>
        </div>
        <RiDoubleQuotesL className="size-6 text-primary/20 group-hover:text-primary transition-colors" />
      </div>

      {/* Star Rating */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <RiStarFill key={i} className="size-4 text-amber-400" />
        ))}
      </div>

      {/* Content */}
      <p className="text-sm font-light leading-relaxed text-foreground/80 line-clamp-4">
        "{testimonial.content}"
      </p>
    </div>
  );
}
