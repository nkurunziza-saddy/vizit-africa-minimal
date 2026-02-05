import { processSteps } from "@/lib/dummy-data";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Simple Process
          </h2>
          <p className="text-muted-foreground text-lg">
            From your first inquiry to landing in Kigali — we make it seamless.
          </p>
        </div>

        {/* steps */}
        <div className="relative">
          {/* connector line - desktop only */}
          <div className="hidden lg:block absolute top-8 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-border" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative text-center">
                {/* step number */}
                <div className="relative z-10 mx-auto size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-lg font-bold mb-4">
                  {step.step}
                </div>

                {/* arrow connector - mobile/tablet */}
                {index < processSteps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 -translate-x-1/2 top-14 text-border text-2xl">
                    ↓
                  </div>
                )}

                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
