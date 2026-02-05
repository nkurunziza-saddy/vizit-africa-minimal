import { stats, benefits } from "@/lib/dummy-data";
import { RiCheckLine } from "@remixicon/react";

export function WhyUs() {
  return (
    <section id="why-us" className="py-20 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* left - stats */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Choose Us
              </h2>
              <p className="text-muted-foreground text-lg">
                Numbers that reflect our commitment to exceptional travel
                experiences.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* right - benefits */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">
              What Sets Us Apart
            </h3>

            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <div className="size-6 rounded-full bg-accent-success/20 flex items-center justify-center shrink-0 mt-0.5">
                    <RiCheckLine className="size-4 text-accent-success" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
