import { Button } from "@/components/ui/button";
import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";

export function CTA() {
  return (
    <section
      id="contact"
      className="py-20 md:py-24 bg-gradient-to-r from-primary to-primary-dark"
    >
      <div className="mx-auto max-w-4xl px-5 md:px-10 text-center">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Plan Your Rwanda Journey?
        </h2>

        <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Start planning in less than 2 minutes. Tell us your travel dates and
          preferences, and we'll create a personalized package just for you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/plan-trip">
            <Button
              size="lg"
              variant="secondary"
              className="h-14 px-8 text-base gap-2"
            >
              Start Your Trip
              <RiArrowRightLine className="size-5" />
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-primary-foreground/60">
          or email us at{" "}
          <a
            href="mailto:hello@vizitafrica.rw"
            className="underline hover:text-primary-foreground transition-colors"
          >
            hello@vizitafrica.rw
          </a>
        </p>
      </div>
    </section>
  );
}
