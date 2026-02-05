import { partnerLogos } from "@/lib/dummy-data";

export function SocialProof() {
  return (
    <section className="bg-primary-subtle py-6">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <p className="text-sm text-muted-foreground">
            Trusted by travelers from{" "}
            <span className="font-semibold">15+ countries</span>
          </p>

          <div className="flex items-center gap-8 md:gap-12">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="opacity-40 grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-300"
              >
                {/* TODO: replace with actual svg logos */}
                <span className="text-sm font-medium text-muted-foreground">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
