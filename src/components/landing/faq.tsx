"use client";

import { useState } from "react";
import { faqData } from "@/lib/dummy-data";
import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-24 bg-muted/50">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        {/* header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about planning your Rwanda trip.
          </p>
        </div>

        {/* accordion */}
        <div className="space-y-3">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={cn(
                "bg-card border rounded-lg overflow-hidden transition-all duration-200",
                openIndex === index
                  ? "border-primary shadow-sm"
                  : "border-border",
              )}
            >
              {/* header */}
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-foreground pr-4">
                  {item.question}
                </span>
                <div className="size-6 rounded-full bg-muted flex items-center justify-center shrink-0">
                  {openIndex === index ? (
                    <RiSubtractLine className="size-4 text-muted-foreground" />
                  ) : (
                    <RiAddLine className="size-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* content */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0",
                )}
              >
                <div className="px-5 pb-5 relative">
                  {/* accent line */}
                  <div className="absolute left-5 top-0 bottom-5 w-0.5 bg-primary" />
                  <p className="text-muted-foreground leading-relaxed pl-4">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
