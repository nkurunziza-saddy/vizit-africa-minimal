"use client";

import type { Flight } from "../types";
import { RiPlaneLine, RiCheckLine } from "@remixicon/react";

interface FlightCardProps {
  flight: Flight;
  isSelected: boolean;
  travelers: number;
  onSelect: () => void;
}

export function FlightCard({
  flight,
  isSelected,
  travelers,
  onSelect,
}: FlightCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`group relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
        isSelected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border hover:border-primary/50 hover:shadow-sm"
      }`}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 size-6 rounded-full bg-primary text-white flex items-center justify-center">
          <RiCheckLine className="size-4" />
        </div>
      )}

      {/* Airline & Flight Info */}
      <div className="flex items-center gap-3 mb-3">
        <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <RiPlaneLine className="size-5" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{flight.airline}</h4>
          <p className="text-sm text-muted-foreground">
            {flight.flightNumber} • {flight.stops}
          </p>
        </div>
      </div>

      {/* Route & Time */}
      <div className="flex items-center justify-between text-sm mb-3">
        <div className="flex items-center gap-2">
          <span className="font-medium">{flight.departureTime}</span>
          <span className="text-muted-foreground">→</span>
          <span className="font-medium">{flight.arrivalTime}</span>
        </div>
        <span className="text-muted-foreground">{flight.duration}</span>
      </div>

      {/* Route */}
      <div className="text-xs text-muted-foreground mb-3">
        {flight.origin} → {flight.destination}
      </div>

      {/* Price */}
      <div className="flex items-end justify-between pt-3 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">Total for {travelers}</p>
          <p className="font-bold text-lg text-foreground">
            ${flight.price * travelers}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">${flight.price}/person</p>
      </div>
    </div>
  );
}
