"use client";

import type { Flight } from "@/lib/schemas";
import {
  RiTimeLine,
  RiFlightTakeoffLine,
  RiFlightLandLine,
} from "@remixicon/react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FlightSelectorProps {
  flight: Flight;
}

export function FlightSelector({ flight }: FlightSelectorProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsSelected(!isSelected)}
      className={cn(
        "w-full text-left bg-card border rounded-lg p-5 transition-all duration-200",
        isSelected
          ? "border-primary ring-2 ring-primary/20 shadow-sm"
          : "border-border hover:border-primary/50",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        {/* airline info */}
        <div className="flex items-center gap-4">
          <div className="size-12 rounded bg-muted flex items-center justify-center">
            {/* TODO: replace with actual airline logo */}
            <span className="text-2xl">✈️</span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{flight.airline}</p>
            <p className="text-sm text-muted-foreground">
              {flight.flightNumber}
            </p>
          </div>
        </div>

        {/* flight times */}
        <div className="flex items-center gap-6">
          {/* departure */}
          <div className="text-center">
            <p className="font-mono text-lg font-semibold text-foreground">
              {new Date(flight.departureTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              {flight.departureAirport}
            </p>
          </div>

          {/* duration */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RiFlightTakeoffLine className="size-4" />
              <div className="w-16 h-px bg-border" />
              <RiFlightLandLine className="size-4" />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <RiTimeLine className="size-3" />
              <span>{flight.duration}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {flight.stops === 0
                ? "Direct"
                : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
            </span>
          </div>

          {/* arrival */}
          <div className="text-center">
            <p className="font-mono text-lg font-semibold text-foreground">
              {new Date(flight.arrivalTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              {flight.arrivalAirport}
            </p>
          </div>
        </div>

        {/* price and class */}
        <div className="text-right">
          <p className="font-mono text-xl font-bold text-foreground">
            ${flight.price}
          </p>
          <p className="text-sm text-muted-foreground capitalize">
            {flight.cabinClass}
          </p>
          <p className="text-xs text-accent-success mt-1">
            {flight.seatsAvailable} seats left
          </p>
        </div>
      </div>
    </button>
  );
}
