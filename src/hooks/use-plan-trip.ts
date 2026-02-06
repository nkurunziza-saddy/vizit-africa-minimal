"use client";

import { useState, useMemo, useEffect } from "react";
import type {
  TripInfo,
  Selections,
  Hotel,
  FilterState,
} from "../lib/plan_trip-types";
import {
  MOCK_HOTELS,
  MOCK_CARS,
  DRIVER_SURCHARGE,
  SERVICE_FEE_RATE,
  ITEMS_PER_PAGE,
} from "../lib/plan-trip-data";

export function usePlanTrip() {
  const [currentStep, setCurrentStep] = useState(1);

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

  const [selections, setSelections] = useState<Selections>({
    hotel: null,
    car: null,
    carWithDriver: false,
    guide: null,
  });

  const [activeTab, setActiveTab] = useState("hotels");

  const [hotelSearch, setHotelSearch] = useState("");
  const [hotelPriceFilter, setHotelPriceFilter] =
    useState<FilterState["priceRange"]>("all");
  const [hotelStarsFilter, setHotelStarsFilter] =
    useState<FilterState["stars"]>("all");
  const [carSearch, setCarSearch] = useState("");
  const [carCategoryFilter, setCarCategoryFilter] =
    useState<FilterState["category"]>("all");

  const [hotelPage, setHotelPage] = useState(1);
  const [carPage, setCarPage] = useState(1);

  const days = useMemo(() => {
    if (!tripInfo.arrivalDate || !tripInfo.departureDate) return 3;
    const arrival = new Date(tripInfo.arrivalDate);
    const departure = new Date(tripInfo.departureDate);
    const diff = Math.ceil(
      (departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff > 0 ? diff : 3;
  }, [tripInfo.arrivalDate, tripInfo.departureDate]);

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
  const travelers = tripInfo.adults + tripInfo.children;

  const canProceedToContact =
    tripInfo.departureCity &&
    tripInfo.arrivalDate &&
    tripInfo.departureDate &&
    tripInfo.adults >= 1;

  const canProceedToServices = tripInfo.name && tripInfo.email;
  const canProceedToReview = selections.hotel && selections.car;

  const resetHotelFilters = () => {
    setHotelSearch("");
    setHotelPriceFilter("all");
    setHotelStarsFilter("all");
  };

  const resetCarFilters = () => {
    setCarSearch("");
    setCarCategoryFilter("all");
  };

  return {
    // state
    currentStep,
    setCurrentStep,
    tripInfo,
    setTripInfo,
    selections,
    setSelections,
    activeTab,
    setActiveTab,

    // filters state
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

    // pagination state
    hotelPage,
    setHotelPage,
    carPage,
    setCarPage,

    // derived data
    days,
    travelers,
    subtotal,
    serviceFee,
    total,
    filteredHotels,
    filteredCars,
    paginatedHotels,
    paginatedCars,
    hotelTotalPages,
    carTotalPages,

    // validation
    canProceedToContact,
    canProceedToServices,
    canProceedToReview,

    // actions
    resetHotelFilters,
    resetCarFilters,
  };
}
