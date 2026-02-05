import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiStarFill, RiArrowRightLine } from "@remixicon/react";

export function Hero() {
  return (
    <section className="relative min-h-[600px] h-[80vh] flex items-center bg-gradient-to-b from-primary-subtle to-background">
      <div className="mx-auto max-w-7xl px-5 md:px-10 w-full">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* left content - 60% */}
          <div className="lg:col-span-3 space-y-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-[49px] font-bold leading-tight text-foreground">
              Your Journey to <span className="text-primary">Rwanda</span>{" "}
              Starts Here
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Professional travel planning for your Rwanda experience. From
              flights and hotels to local guides — we handle every detail so you
              can focus on the adventure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="gap-2">
                Get Started
                <RiArrowRightLine className="size-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>

            {/* rating */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <RiStarFill key={star} className="size-5 text-accent-warm" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">4.9/5</span>{" "}
                from 200+ travelers
              </span>
            </div>
          </div>

          {/* right image - 40% */}
          <div className="lg:col-span-2 relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-primary/10 relative">
              {/* TODO: replace with actual hero image */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-primary/60">
                  <div className="text-6xl mb-2">🦍</div>
                  <p className="text-sm font-medium">Rwanda Awaits</p>
                </div>
              </div>
            </div>

            {/* floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-lg shadow-lg p-4 border border-border hidden md:block">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-accent-success/20 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Verified Partners</p>
                  <p className="text-xs text-muted-foreground">
                    50+ trusted hotels
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
