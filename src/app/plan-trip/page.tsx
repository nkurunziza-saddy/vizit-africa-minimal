"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { RiCheckLine } from "@remixicon/react";

import { Navbar } from "@/components/shared/navbar";
import { usePlanTrip } from "@/hooks/use-plan-trip";
import { TripDetailsStep } from "@/components/plan-trip/steps/trip-details-step";
import { ContactInfoStep } from "@/components/plan-trip/steps/contact-info-step";
import { ServicesStep } from "@/components/plan-trip/steps/services-step";
import { ReviewStep } from "@/components/plan-trip/steps/review-step";

const STEPS = [
  { num: 1, label: "Trip Details" },
  { num: 2, label: "Contact" },
  { num: 3, label: "Services" },
  { num: 4, label: "Review" },
];

export default function PlanTripPage() {
  const {
    currentStep,
    setCurrentStep,
    tripInfo,
    setTripInfo,
    selections,
    setSelections,
    activeTab,
    setActiveTab,
    days,
    travelers,
    subtotal,
    serviceFee,
    total,
    hotelSearch,
    setHotelSearch,
    hotelPriceFilter,
    setHotelPriceFilter,
    hotelStarsFilter,
    setHotelStarsFilter,
    carSearch,
    setCarSearch,
    carCategoryFilter,
    setCarCategoryFilter,
    paginatedHotels,
    paginatedCars,
    hotelPage,
    setHotelPage,
    carPage,
    setCarPage,
    hotelTotalPages,
    carTotalPages,
    filteredHotels,
    filteredCars,
    canProceedToContact,
    canProceedToServices,
    canProceedToReview,
  } = usePlanTrip();

  const [showMobileSummary, setShowMobileSummary] = useState(false);

  const handleSubmit = () => {
    setCurrentStep(4);
    alert("Booking submitted! We'll contact you within 24 hours.");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted/30 pt-24 pb-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Plan Your Trip
            </h1>
            <p className="text-muted-foreground text-lg">
              Customize your perfect African adventure
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (step.num < currentStep) setCurrentStep(step.num);
                  }}
                  disabled={step.num >= currentStep}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    currentStep === step.num
                      ? "bg-primary text-white"
                      : currentStep > step.num
                        ? "bg-primary/20 text-primary cursor-pointer"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span
                    className={`size-6 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep > step.num
                        ? "bg-primary text-white"
                        : "bg-white/20"
                    }`}
                  >
                    {currentStep > step.num ? (
                      <RiCheckLine className="size-4" />
                    ) : (
                      step.num
                    )}
                  </span>
                  <span className="hidden sm:inline font-medium">
                    {step.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-0.5 mx-2 ${
                      currentStep > step.num ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <TripDetailsStep
                tripInfo={tripInfo}
                setTripInfo={setTripInfo}
                onNext={() => setCurrentStep(2)}
                canProceed={!!canProceedToContact}
              />
            )}

            {currentStep === 2 && (
              <ContactInfoStep
                tripInfo={tripInfo}
                setTripInfo={setTripInfo}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
                canProceed={!!canProceedToServices}
              />
            )}

            {currentStep === 3 && (
              <ServicesStep
                selections={selections}
                setSelections={setSelections}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                showMobileSummary={showMobileSummary}
                setShowMobileSummary={setShowMobileSummary}
                tripInfo={tripInfo}
                days={days}
                total={total}
                travelers={travelers}
                subtotal={subtotal}
                serviceFee={serviceFee}
                paginatedHotels={paginatedHotels}
                paginatedCars={paginatedCars}
                hotelTotalPages={hotelTotalPages}
                carTotalPages={carTotalPages}
                hotelCount={filteredHotels.length}
                carCount={filteredCars.length}
                hotelSearch={hotelSearch}
                setHotelSearch={setHotelSearch}
                hotelPriceFilter={hotelPriceFilter}
                setHotelPriceFilter={setHotelPriceFilter}
                hotelStarsFilter={hotelStarsFilter}
                setHotelStarsFilter={setHotelStarsFilter}
                carSearch={carSearch}
                setCarSearch={setCarSearch}
                carCategoryFilter={carCategoryFilter}
                setCarCategoryFilter={setCarCategoryFilter}
                hotelPage={hotelPage}
                setHotelPage={setHotelPage}
                carPage={carPage}
                setCarPage={setCarPage}
                onNext={() => setCurrentStep(4)}
                onBack={() => setCurrentStep(2)}
                canProceed={!!canProceedToReview}
              />
            )}

            {currentStep === 4 && (
              <ReviewStep
                tripInfo={tripInfo}
                selections={selections}
                days={days}
                travelers={travelers}
                subtotal={subtotal}
                serviceFee={serviceFee}
                total={total}
                onBack={() => setCurrentStep(3)}
                onSubmit={handleSubmit}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
