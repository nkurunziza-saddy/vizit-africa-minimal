import { Button } from "@/components/ui/button";
import { RiArrowRightLine, RiWhatsappLine } from "@remixicon/react";
import Link from "next/link";

export function CTA() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background Image Parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2600&auto=format&fit=crop"
          alt="Savannah"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-10 text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1]">
          Ready for the Trip of a Lifetime?
        </h2>

        <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Let us handle the details. You just handle the memories. Start
          planning your bespoke Rwanda itinerary today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/plan-trip">
            <Button
              size="lg"
              className="h-16 px-10 text-lg rounded-full bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/20 font-bold tracking-wide"
            >
              Start Planning
              <RiArrowRightLine className="ml-2 size-5" />
            </Button>
          </Link>

          <a
            href="https://wa.me/250788123456"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-lg font-medium px-8 py-4 rounded-full border border-white/20 hover:bg-white/10"
          >
            <RiWhatsappLine className="size-6" />
            Chat on WhatsApp
          </a>
        </div>

        <p className="mt-12 text-white/50 text-sm tracking-widest uppercase">
          Concierge Support 24/7
        </p>
      </div>
    </section>
  );
}
