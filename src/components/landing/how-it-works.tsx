"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SectionTitle } from "./section-title";
import { useTranslations } from "next-intl";

const stepImages = [
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=90&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=90&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=90&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=90&w=800&auto=format&fit=crop",
];

const stepKeys = ["1", "2", "3", "4"] as const;

export function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const processSteps = stepKeys.map((key, index) => ({
    step: index + 1,
    title: t(`steps.${key}.title`),
    description: t(`steps.${key}.description`),
  }));

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 bg-foreground text-background overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-5 md:px-10">
        <SectionTitle
          overline={t("overline")}
          title={
            <>
              {t("title").split(" ").slice(0, 3).join(" ")} <br />
              {t("title").split(" ").slice(3).join(" ")}
            </>
          }
          description={t("description")}
          className="mb-20 max-w-3xl"
          dark
        />

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-20">
          {processSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative ${isEven ? "md:mt-0" : "md:mt-16"}`}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={stepImages[index]}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover transition-[filter] duration-300 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

                  <div
                    className="absolute bottom-4 right-4 font-display text-8xl font-black text-white/20 leading-none"
                    aria-hidden="true"
                  >
                    {step.step.toString().padStart(2, "0")}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-mono text-sm text-accent-warm font-bold">
                    {step.step.toString().padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold font-display text-background mb-2 uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-background/60 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
