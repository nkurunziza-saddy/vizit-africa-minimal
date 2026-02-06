"use client";

import { processSteps } from "@/lib/dummy-data";
import { motion } from "framer-motion";
import {
  RiChat3Line,
  RiSearchLine,
  RiCheckboxLine,
  RiPlaneLine,
} from "@remixicon/react";

const stepIcons = [RiChat3Line, RiSearchLine, RiCheckboxLine, RiPlaneLine];

const springGentle = { type: "spring", stiffness: 200, damping: 25 } as const;

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-slate-50/50 border-t border-border/40"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springGentle}
          className="mb-20 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple Process
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
            From your first inquiry to landing in Kigali — we orchestrate every
            detail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-[2px] bg-border" />

          {processSteps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springGentle, delay: index * 0.15 }}
                whileHover="hover"
                className="group relative text-center"
              >
                {/* Icon Circle */}
                <motion.div
                  variants={{ hover: { scale: 1.1, y: -5 } }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center relative z-10"
                >
                  <Icon className="size-7 text-white" />
                </motion.div>

                {/* Step Number */}
                <div className="font-mono text-sm text-primary/50 mb-2 group-hover:text-primary transition-colors">
                  STEP {step.step}
                </div>

                <h3 className="text-xl font-bold font-display text-foreground mb-3">
                  {step.title}
                </h3>

                <p className="text-muted-foreground font-light leading-relaxed text-sm">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
