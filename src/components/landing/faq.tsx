"use client";

import { faqData } from "@/lib/dummy-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FAQ() {
  const categories = [
    {
      id: "booking",
      label: "Booking & Payment",
      items: faqData.slice(0, 3),
    },
    {
      id: "services",
      label: "Services & Logistics",
      items: faqData.slice(3, 5),
    },
    {
      id: "travel",
      label: "Travel Information",
      items: faqData.slice(5),
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-24 bg-muted/50">
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        {/* header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about planning your Rwanda trip.
          </p>
        </div>

        <Tabs
          defaultValue="booking"
          orientation="vertical"
          className="flex-col md:flex-row gap-8"
        >
          <TabsList className="w-full md:w-64 shrink-0 flex-row md:flex-col h-auto bg-transparent p-0 gap-2 justify-start md:items-stretch overflow-x-auto md:overflow-visible no-scrollbar">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="group/trigger justify-start px-4 py-3 h-auto text-base text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none border border-transparent hover:bg-muted/30 relative overflow-hidden transition-all duration-300 rounded-lg"
              >
                <span className="relative z-10">{category.label}</span>
                {/* Active Accent - Left Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-1 bg-primary rounded-full opacity-0 group-data-[state=active]/trigger:opacity-100 group-data-[state=active]/trigger:h-6 transition-all duration-300" />
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 min-w-0">
            {categories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-0 space-y-4 animate-in fade-in-50 slide-in-from-left-2 duration-300"
              >
                <Accordion className="w-full space-y-4">
                  {category.items.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-card border border-border rounded-lg px-2 data-[state=open]:border-primary/50 transition-colors"
                    >
                      <AccordionTrigger className="px-4 hover:no-underline hover:text-primary transition-colors text-base">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 text-muted-foreground text-base leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </div>
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a
              href="/contact"
              className="text-primary font-medium hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
