"use client";

import { faqData } from "@/lib/dummy-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [activeTab, setActiveTab] = useState("booking");

  const categories = [
    { id: "booking", label: "Booking & Payment", items: faqData.slice(0, 3) },
    { id: "services", label: "Services", items: faqData.slice(3, 5) },
    { id: "travel", label: "Travel Info", items: faqData.slice(5) },
  ];

  return (
    <section
      id="faq"
      className="py-24 bg-slate-50/50 border-t border-border/40"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-24">
          {/* Left Column - Sticky Header & Nav */}
          <div className="md:col-span-4 relative">
            <div className="sticky top-24">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Common Questions
              </h2>
              <p className="text-muted-foreground text-lg font-light mb-12">
                Everything you need to know about planning your unforgettable
                journey to Rwanda.
              </p>

              <nav className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={cn(
                      "text-left px-6 py-4 rounded-xl transition-all duration-300 text-lg font-medium",
                      activeTab === cat.id
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Column - Accordion Content */}
          <div className="md:col-span-8 pt-4">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Accordion type="single" collapsible className="w-full space-y-6">
                {categories
                  .find((c) => c.id === activeTab)
                  ?.items.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-border/40 px-8 py-2 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors text-xl font-medium py-6 text-foreground text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-6 font-light">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
