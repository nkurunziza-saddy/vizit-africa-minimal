import { services } from "@/lib/dummy-data";
import {
  RiPlaneLine,
  RiBuilding2Line,
  RiCarLine,
  RiUserLine,
} from "@remixicon/react";

const iconMap = {
  plane: RiPlaneLine,
  building: RiBuilding2Line,
  car: RiCarLine,
  user: RiUserLine,
};

export function Services() {
  return (
    <section id="services" className="py-20 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Complete Travel Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for your Rwanda visit, curated by local experts.
          </p>
        </div>

        {/* services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={service.title}
                className="group relative bg-card border border-border rounded-lg p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="size-12 rounded-lg bg-primary-subtle flex items-center justify-center mb-4">
                  <Icon className="size-6 text-primary" />
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
