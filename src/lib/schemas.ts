import { z } from "zod";

// INFO: schemas for type inference - replaces database schema

export const requestSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  arrivalDate: z.string(),
  departureDate: z.string(),
  travelers: z.number().min(1).max(20),
  needsFlights: z.boolean().default(true),
  needsHotel: z.boolean().default(false),
  needsCar: z.boolean().default(false),
  needsGuide: z.boolean().default(false),
  notes: z.string().optional(),
  status: z
    .enum(["pending", "quoted", "confirmed", "cancelled"])
    .default("pending"),
  createdAt: z.string(),
});

export const flightSchema = z.object({
  id: z.string(),
  airline: z.string(),
  airlineLogo: z.string(),
  flightNumber: z.string(),
  departureCity: z.string(),
  departureAirport: z.string(),
  departureTime: z.string(),
  arrivalCity: z.string(),
  arrivalAirport: z.string(),
  arrivalTime: z.string(),
  duration: z.string(),
  stops: z.number(),
  cabinClass: z.enum(["economy", "business", "first"]),
  price: z.number(),
  currency: z.string().default("USD"),
  seatsAvailable: z.number(),
});

export const hotelSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  area: z.string(),
  rating: z.number().min(1).max(5),
  reviewCount: z.number(),
  description: z.string(),
  amenities: z.array(z.string()),
  images: z.array(z.string()),
  pricePerNight: z.number(),
  currency: z.string().default("USD"),
  roomTypes: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      capacity: z.number(),
      price: z.number(),
    }),
  ),
  available: z.boolean(),
});

export const carSchema = z.object({
  id: z.string(),
  type: z.enum(["sedan", "suv", "van", "luxury"]),
  name: z.string(),
  brand: z.string(),
  image: z.string(),
  capacity: z.number(),
  luggage: z.number(),
  transmission: z.enum(["automatic", "manual"]),
  fuelType: z.enum(["petrol", "diesel", "hybrid", "electric"]),
  features: z.array(z.string()),
  pricePerDay: z.number(),
  currency: z.string().default("USD"),
  available: z.boolean(),
});

export const guideSchema = z.object({
  id: z.string(),
  name: z.string(),
  photo: z.string(),
  languages: z.array(z.string()),
  specialties: z.array(z.string()),
  experience: z.number(),
  rating: z.number().min(1).max(5),
  reviewCount: z.number(),
  bio: z.string(),
  pricePerDay: z.number(),
  currency: z.string().default("USD"),
  available: z.boolean(),
});

export const packageSchema = z.object({
  id: z.string(),
  requestId: z.string(),
  flights: z.array(flightSchema).optional(),
  hotels: z.array(hotelSchema).optional(),
  cars: z.array(carSchema).optional(),
  guides: z.array(guideSchema).optional(),
  expiresAt: z.string(),
  createdAt: z.string(),
});

export const bookingSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  selectedFlight: flightSchema.optional(),
  selectedHotel: hotelSchema.optional(),
  selectedCar: carSchema.optional(),
  selectedGuide: guideSchema.optional(),
  totalPrice: z.number(),
  currency: z.string().default("USD"),
  status: z.enum(["pending", "confirmed", "cancelled"]),
  bookedAt: z.string(),
});

// INFO: inferred types for use throughout the application
export type Request = z.infer<typeof requestSchema>;
export type Flight = z.infer<typeof flightSchema>;
export type Hotel = z.infer<typeof hotelSchema>;
export type Car = z.infer<typeof carSchema>;
export type Guide = z.infer<typeof guideSchema>;
export type Package = z.infer<typeof packageSchema>;
export type Booking = z.infer<typeof bookingSchema>;
