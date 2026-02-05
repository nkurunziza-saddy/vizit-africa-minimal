import { samplePackage } from "@/lib/dummy-data";
import type { Package } from "@/lib/schemas";
import { ProgressBar } from "@/components/booking/progress-bar";
import { FlightSelector } from "@/components/booking/flight-selector";
import { HotelCard } from "@/components/booking/hotel-card";
import { CarSelector } from "@/components/booking/car-selector";
import { GuideOptions } from "@/components/booking/guide-options";
import { PriceSummary } from "@/components/booking/price-summary";
import { Navbar } from "@/components/shared";
import { Footer } from "@/components/landing";

// INFO: in production this would fetch from api based on params.id
async function getPackage(id: string): Promise<Package> {
  // TODO: replace with actual api call
  return samplePackage;
}

interface BookingPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { id } = await params;
  const pkg = await getPackage(id);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          {/* header */}
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Your Travel Package
            </h1>
            <p className="text-muted-foreground">
              Select your preferences from the options below. Prices shown are
              per person.
            </p>
          </div>

          {/* progress */}
          <ProgressBar currentStep={1} totalSteps={4} />

          <div className="mt-10 grid lg:grid-cols-3 gap-8">
            {/* main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* flights */}
              {pkg.flights && pkg.flights.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Select Your Flight
                  </h2>
                  <div className="space-y-4">
                    {pkg.flights.map((flight) => (
                      <FlightSelector key={flight.id} flight={flight} />
                    ))}
                  </div>
                </section>
              )}

              {/* hotels */}
              {pkg.hotels && pkg.hotels.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Choose Your Accommodation
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {pkg.hotels.map((hotel) => (
                      <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                  </div>
                </section>
              )}

              {/* cars */}
              {pkg.cars && pkg.cars.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Select Transportation
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pkg.cars.map((car) => (
                      <CarSelector key={car.id} car={car} />
                    ))}
                  </div>
                </section>
              )}

              {/* guides */}
              {pkg.guides && pkg.guides.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Choose a Guide
                  </h2>
                  <div className="space-y-4">
                    {pkg.guides.map((guide) => (
                      <GuideOptions key={guide.id} guide={guide} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* sidebar */}
            <div className="lg:col-span-1">
              <PriceSummary />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
