"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/landing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCheckLine,
  RiPlaneLine,
  RiHotelLine,
  RiCarLine,
  RiUserStarLine,
  RiCalendarLine,
  RiTeamLine,
  RiMailLine,
  RiPhoneLine,
  RiMenu2Line,
  RiStarFill,
  RiMapPinLine,
} from "@remixicon/react";

import type { TripInfo, Selections, Hotel } from "./types";
import {
  MOCK_HOTELS,
  MOCK_CARS,
  MOCK_GUIDES,
  DRIVER_SURCHARGE,
  SERVICE_FEE_RATE,
  ITEMS_PER_PAGE,
} from "./data";
import {
  FlightCard,
  HotelCard,
  CarCard,
  GuideCard,
  InlineFilters,
  Pagination,
  BookingSummary,
} from "./components";

// Step indicator data
const STEPS = [
  { num: 1, label: "Trip Details" },
  { num: 2, label: "Contact" },
  { num: 3, label: "Services" },
  { num: 4, label: "Review" },
];

export default function PlanTripPage() {
  // Step navigation
  const [currentStep, setCurrentStep] = useState(1);

  // Trip info form
  const [tripInfo, setTripInfo] = useState<TripInfo>({
    departureCity: "",
    arrivalDate: "",
    departureDate: "",
    adults: 2,
    children: 0,
    tripPurpose: "leisure",
    specialRequests: "",
    name: "",
    email: "",
    phone: "",
  });

  // Service selections
  const [selections, setSelections] = useState<Selections>({
    hotel: null,
    car: null,
    carWithDriver: false,
    guide: null,
  });

  // Active service tab
  const [activeTab, setActiveTab] = useState("hotels");

  // Filter states
  const [hotelSearch, setHotelSearch] = useState("");
  const [hotelPriceFilter, setHotelPriceFilter] = useState("all");
  const [hotelStarsFilter, setHotelStarsFilter] = useState("all");
  const [carSearch, setCarSearch] = useState("");
  const [carCategoryFilter, setCarCategoryFilter] = useState("all");

  // Pagination states
  const [hotelPage, setHotelPage] = useState(1);
  const [carPage, setCarPage] = useState(1);

  // Quick view hotel modal
  const [quickViewHotel, setQuickViewHotel] = useState<Hotel | null>(null);

  // Mobile summary sheet
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // Calculate days
  const days = useMemo(() => {
    if (!tripInfo.arrivalDate || !tripInfo.departureDate) return 3;
    const arrival = new Date(tripInfo.arrivalDate);
    const departure = new Date(tripInfo.departureDate);
    const diff = Math.ceil(
      (departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff > 0 ? diff : 3;
  }, [tripInfo.arrivalDate, tripInfo.departureDate]);

  // Filter hotels
  const filteredHotels = useMemo(() => {
    let result = MOCK_HOTELS;

    if (hotelSearch) {
      result = result.filter((h) =>
        h.name.toLowerCase().includes(hotelSearch.toLowerCase()),
      );
    }

    if (hotelPriceFilter !== "all") {
      result = result.filter((h) => {
        if (hotelPriceFilter === "budget") return h.pricePerNight < 150;
        if (hotelPriceFilter === "mid")
          return h.pricePerNight >= 150 && h.pricePerNight <= 200;
        if (hotelPriceFilter === "luxury") return h.pricePerNight > 200;
        return true;
      });
    }

    if (hotelStarsFilter !== "all") {
      result = result.filter((h) => {
        if (hotelStarsFilter === "5") return h.stars === 5;
        if (hotelStarsFilter === "4+") return h.stars >= 4;
        if (hotelStarsFilter === "3") return h.stars === 3;
        return true;
      });
    }

    return result;
  }, [hotelSearch, hotelPriceFilter, hotelStarsFilter]);

  // Filter cars
  const filteredCars = useMemo(() => {
    let result = MOCK_CARS;

    if (carSearch) {
      result = result.filter((c) =>
        c.model.toLowerCase().includes(carSearch.toLowerCase()),
      );
    }

    if (carCategoryFilter !== "all") {
      result = result.filter((c) => c.category === carCategoryFilter);
    }

    return result;
  }, [carSearch, carCategoryFilter]);

  // Paginated data
  const paginatedHotels = useMemo(() => {
    const start = (hotelPage - 1) * ITEMS_PER_PAGE;
    return filteredHotels.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredHotels, hotelPage]);

  const paginatedCars = useMemo(() => {
    const start = (carPage - 1) * ITEMS_PER_PAGE;
    return filteredCars.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCars, carPage]);

  const hotelTotalPages = Math.ceil(filteredHotels.length / ITEMS_PER_PAGE);
  const carTotalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);

  useEffect(
    () => setHotelPage(1),
    [hotelSearch, hotelPriceFilter, hotelStarsFilter],
  );
  useEffect(() => setCarPage(1), [carSearch, carCategoryFilter]);

  const subtotal = useMemo(() => {
    let sum = 0;
    if (selections.hotel) sum += selections.hotel.pricePerNight * days;
    if (selections.car) {
      sum += selections.car.pricePerDay * days;
      if (selections.carWithDriver) sum += DRIVER_SURCHARGE * days;
    }
    if (selections.guide) sum += selections.guide.price;
    return sum;
  }, [selections, tripInfo.adults, tripInfo.children, days]);

  const serviceFee = subtotal * SERVICE_FEE_RATE;
  const total = subtotal + serviceFee;

  // Total travelers
  const travelers = tripInfo.adults + tripInfo.children;

  // Validation for step 1: Trip Details
  const canProceedToContact =
    tripInfo.departureCity &&
    tripInfo.arrivalDate &&
    tripInfo.departureDate &&
    tripInfo.adults >= 1;

  // Validation for step 2: Contact
  const canProceedToServices = tripInfo.name && tripInfo.email;

  const canProceedToReview = selections.hotel && selections.car;

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
                  onClick={() => {
                    if (step.num <= currentStep) setCurrentStep(step.num);
                  }}
                  disabled={step.num > currentStep}
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
            {/* STEP 1: Trip Details */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white border rounded-xl p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-2">
                      Trip Details
                    </h2>
                    <p className="text-muted-foreground">
                      Tell us where you're coming from and when
                    </p>
                  </div>

                  {/* Departure City */}
                  <div className="space-y-2">
                    <Label htmlFor="departureCity">Departing From</Label>
                    <div className="relative">
                      <RiMapPinLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="departureCity"
                        placeholder="e.g. New York, London, Dubai"
                        value={tripInfo.departureCity}
                        onChange={(e) =>
                          setTripInfo({
                            ...tripInfo,
                            departureCity: e.target.value,
                          })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Travel Dates */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="arrival">Arrival in Rwanda</Label>
                      <div className="relative">
                        <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          id="arrival"
                          type="date"
                          value={tripInfo.arrivalDate}
                          onChange={(e) =>
                            setTripInfo({
                              ...tripInfo,
                              arrivalDate: e.target.value,
                            })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="departure">Departure from Rwanda</Label>
                      <div className="relative">
                        <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          id="departure"
                          type="date"
                          value={tripInfo.departureDate}
                          onChange={(e) =>
                            setTripInfo({
                              ...tripInfo,
                              departureDate: e.target.value,
                            })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Number of Travelers */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="adults">Adults</Label>
                      <div className="relative">
                        <RiTeamLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          id="adults"
                          type="number"
                          min={1}
                          max={20}
                          value={tripInfo.adults}
                          onChange={(e) =>
                            setTripInfo({
                              ...tripInfo,
                              adults: parseInt(e.target.value) || 1,
                            })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="children">Children (0-12)</Label>
                      <div className="relative">
                        <RiTeamLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          id="children"
                          type="number"
                          min={0}
                          max={10}
                          value={tripInfo.children}
                          onChange={(e) =>
                            setTripInfo({
                              ...tripInfo,
                              children: parseInt(e.target.value) || 0,
                            })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Trip Purpose */}
                  <div className="space-y-2">
                    <Label>Trip Purpose</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "leisure",
                        "business",
                        "honeymoon",
                        "family",
                        "adventure",
                        "other",
                      ].map((purpose) => (
                        <button
                          key={purpose}
                          type="button"
                          onClick={() =>
                            setTripInfo({
                              ...tripInfo,
                              tripPurpose: purpose as TripInfo["tripPurpose"],
                            })
                          }
                          className={`px-3 py-2 rounded-lg border text-sm font-medium capitalize transition-all ${
                            tripInfo.tripPurpose === purpose
                              ? "bg-primary text-white border-primary"
                              : "bg-white text-foreground border-border hover:border-primary/50"
                          }`}
                        >
                          {purpose}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <Label htmlFor="specialRequests">
                      Special Requests (Optional)
                    </Label>
                    <textarea
                      id="specialRequests"
                      placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                      value={tripInfo.specialRequests}
                      onChange={(e) =>
                        setTripInfo({
                          ...tripInfo,
                          specialRequests: e.target.value,
                        })
                      }
                      className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    disabled={!canProceedToContact}
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue to Contact Info
                    <RiArrowRightLine className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Contact Info */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white border rounded-xl p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-2">
                      Contact Information
                    </h2>
                    <p className="text-muted-foreground">
                      How can we reach you about your booking?
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={tripInfo.name}
                        onChange={(e) =>
                          setTripInfo({ ...tripInfo, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={tripInfo.email}
                            onChange={(e) =>
                              setTripInfo({
                                ...tripInfo,
                                email: e.target.value,
                              })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <div className="relative">
                          <RiPhoneLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 234 567 8900"
                            value={tripInfo.phone}
                            onChange={(e) =>
                              setTripInfo({
                                ...tripInfo,
                                phone: e.target.value,
                              })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentStep(1)}
                    >
                      <RiArrowLeftLine className="mr-2" /> Back
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1"
                      disabled={!canProceedToServices}
                      onClick={() => setCurrentStep(3)}
                    >
                      Continue to Services
                      <RiArrowRightLine className="ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Select Services */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  {/* Service Category Tabs - Styled as segments */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <TabsList className="border">
                      <TabsTrigger value="hotels" className="">
                        <RiHotelLine className="size-4" />
                        <span className="hidden sm:inline">Hotels</span>
                      </TabsTrigger>
                      <TabsTrigger value="cars" className="">
                        <RiCarLine className="size-4" />
                        <span className="hidden sm:inline">Cars</span>
                      </TabsTrigger>
                      <TabsTrigger value="guides" className="">
                        <RiUserStarLine className="size-4" />
                        <span className="hidden sm:inline">Guides</span>
                      </TabsTrigger>
                    </TabsList>

                    <div className="lg:hidden">
                      <Sheet
                        open={showMobileSummary}
                        onOpenChange={setShowMobileSummary}
                      >
                        <SheetTrigger
                          render={
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                            />
                          }
                        >
                          ${total.toFixed(0)}
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px]">
                          <BookingSummary
                            currentStep={currentStep}
                            tripInfo={tripInfo}
                            selections={selections}
                            days={days}
                            travelers={travelers}
                            driverSurcharge={DRIVER_SURCHARGE}
                            subtotal={subtotal}
                            serviceFee={serviceFee}
                            total={total}
                          />
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>

                  {/* 2-Column Layout: Content + Summary */}
                  <div className="grid lg:grid-cols-[1fr_280px] gap-6">
                    {/* Main Content */}
                    <div>
                      {/* Inline Filters */}
                      <InlineFilters
                        activeTab={activeTab}
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
                        hotelCount={filteredHotels.length}
                        carCount={filteredCars.length}
                      />

                      {/* Hotels Tab - 3 columns */}
                      <TabsContent value="hotels" className="mt-0">
                        {paginatedHotels.length === 0 ? (
                          <div className="text-center py-12 text-muted-foreground bg-white border rounded-xl">
                            No hotels match your filters
                          </div>
                        ) : (
                          <>
                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                              {paginatedHotels.map((hotel) => (
                                <HotelCard
                                  key={hotel.id}
                                  hotel={hotel}
                                  isSelected={selections.hotel?.id === hotel.id}
                                  days={days}
                                  onSelect={() =>
                                    setSelections({ ...selections, hotel })
                                  }
                                />
                              ))}
                            </div>
                            <Pagination
                              currentPage={hotelPage}
                              totalPages={hotelTotalPages}
                              onPageChange={setHotelPage}
                            />
                          </>
                        )}
                      </TabsContent>

                      {/* Cars Tab - 3 columns */}
                      <TabsContent value="cars" className="mt-0">
                        {paginatedCars.length === 0 ? (
                          <div className="text-center py-12 text-muted-foreground bg-white border rounded-xl">
                            No vehicles match your filters
                          </div>
                        ) : (
                          <>
                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                              {paginatedCars.map((car) => (
                                <CarCard
                                  key={car.id}
                                  car={car}
                                  isSelected={selections.car?.id === car.id}
                                  days={days}
                                  withDriver={selections.carWithDriver}
                                  driverSurcharge={DRIVER_SURCHARGE}
                                  onSelect={() =>
                                    setSelections({ ...selections, car })
                                  }
                                  onDriverChange={(withDriver) =>
                                    setSelections({
                                      ...selections,
                                      carWithDriver: withDriver,
                                    })
                                  }
                                />
                              ))}
                            </div>
                            <Pagination
                              currentPage={carPage}
                              totalPages={carTotalPages}
                              onPageChange={setCarPage}
                            />
                          </>
                        )}
                      </TabsContent>

                      {/* Guides Tab - 2 columns */}
                      <TabsContent value="guides" className="mt-0">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3 text-sm text-blue-900">
                          Guides are optional but highly recommended for
                          first-time visitors!
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {MOCK_GUIDES.map((guide) => (
                            <GuideCard
                              key={guide.id}
                              guide={guide}
                              isSelected={selections.guide?.id === guide.id}
                              onToggle={() =>
                                setSelections({
                                  ...selections,
                                  guide:
                                    selections.guide?.id === guide.id
                                      ? null
                                      : guide,
                                })
                              }
                            />
                          ))}
                        </div>
                      </TabsContent>

                      {/* Navigation */}
                      <div className="mt-6 flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(2)}
                        >
                          <RiArrowLeftLine className="mr-2 size-4" /> Back
                        </Button>
                        <Button
                          size="lg"
                          disabled={!canProceedToReview}
                          onClick={() => setCurrentStep(4)}
                        >
                          Review Booking{" "}
                          <RiArrowRightLine className="ml-2 size-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Right: Summary Sidebar - Desktop */}
                    <div className="hidden lg:block">
                      <BookingSummary
                        currentStep={currentStep}
                        tripInfo={tripInfo}
                        selections={selections}
                        days={days}
                        travelers={travelers}
                        driverSurcharge={DRIVER_SURCHARGE}
                        subtotal={subtotal}
                        serviceFee={serviceFee}
                        total={total}
                      />
                    </div>
                  </div>
                </Tabs>
              </motion.div>
            )}

            {/* STEP 3: Review & Submit */}
            {/* STEP 4: Review */}
            {currentStep === 4 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white border rounded-xl p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-2">
                      Review Your Booking
                    </h2>
                    <p className="text-muted-foreground">
                      Please confirm your selections before submitting
                    </p>
                  </div>

                  {/* Trip Details */}
                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-3">Trip Details</h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Dates</p>
                        <p className="font-medium">
                          {tripInfo.arrivalDate} to {tripInfo.departureDate} (
                          {days} days)
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Travelers</p>
                        <p className="font-medium">{travelers}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Name</p>
                        <p className="font-medium">{tripInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="font-medium">{tripInfo.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Selected Services */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Selected Services</h3>

                    {selections.hotel && (
                      <div className="flex justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium">{selections.hotel.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {days} nights
                          </p>
                        </div>
                        <p className="font-semibold">
                          ${selections.hotel.pricePerNight * days}
                        </p>
                      </div>
                    )}

                    {selections.car && (
                      <div className="flex justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium">{selections.car.model}</p>
                          <p className="text-sm text-muted-foreground">
                            {days} days •{" "}
                            {selections.carWithDriver
                              ? "With driver"
                              : "Self-drive"}
                          </p>
                        </div>
                        <p className="font-semibold">
                          $
                          {selections.car.pricePerDay * days +
                            (selections.carWithDriver
                              ? DRIVER_SURCHARGE * days
                              : 0)}
                        </p>
                      </div>
                    )}

                    {selections.guide && (
                      <div className="flex justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium">{selections.guide.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {selections.guide.description}
                          </p>
                        </div>
                        <p className="font-semibold">
                          ${selections.guide.price}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service Fee (5%)</span>
                      <span>${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(3)}>
                      <RiArrowLeftLine className="mr-2" /> Back to Services
                    </Button>
                    <Button
                      size="lg"
                      onClick={handleSubmit}
                      className="sm:px-8"
                    >
                      Submit Booking Request <RiCheckLine className="ml-2" />
                    </Button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      After submitting, we'll review your request and send you a
                      payment link within 24 hours.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Summary FAB - Only on Services Step */}
        {currentStep === 3 && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t lg:hidden shadow-lg z-20">
            <Sheet open={showMobileSummary} onOpenChange={setShowMobileSummary}>
              <SheetTrigger
                render={<Button className="w-full h-12" size="lg" />}
              >
                <RiMenu2Line className="size-5 mr-2" />
                Summary ${total.toFixed(0)}
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[60vh]">
                <div className="space-y-4 pt-6">
                  <BookingSummary
                    currentStep={currentStep}
                    tripInfo={tripInfo}
                    selections={selections}
                    days={days}
                    travelers={travelers}
                    driverSurcharge={DRIVER_SURCHARGE}
                    subtotal={subtotal}
                    serviceFee={serviceFee}
                    total={total}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}

        {/* Hotel Quick View Modal */}
        <Dialog
          open={!!quickViewHotel}
          onOpenChange={() => setQuickViewHotel(null)}
        >
          <DialogContent className="max-w-2xl">
            {quickViewHotel && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-start justify-between gap-4">
                    <span>{quickViewHotel.name}</span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: quickViewHotel.stars }).map(
                        (_, i) => (
                          <RiStarFill key={i} className="size-4" />
                        ),
                      )}
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <RiMapPinLine className="size-4" />
                    {quickViewHotel.address}
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {quickViewHotel.amenities.map((a) => (
                        <Badge key={a} variant="secondary">
                          {a}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold">
                        ${quickViewHotel.pricePerNight * days}
                      </span>
                      <span className="text-muted-foreground">
                        ${quickViewHotel.pricePerNight}/night × {days} nights
                      </span>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelections({ ...selections, hotel: quickViewHotel });
                        setQuickViewHotel(null);
                      }}
                    >
                      Select This Hotel
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </>
  );
}
