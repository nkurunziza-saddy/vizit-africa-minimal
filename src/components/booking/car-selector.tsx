"use client";

import type { Car } from "@/lib/schemas";
import { RiUserLine, RiSuitcaseLine, RiSettings3Line } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CarSelectorProps {
  car: Car;
}

export function CarSelector({ car }: CarSelectorProps) {
  const [isSelected, setIsSelected] = useState(false);

  const typeLabels = {
    sedan: "Sedan",
    suv: "SUV",
    van: "Van",
    luxury: "Luxury",
  };

  return (
    <button
      type="button"
      onClick={() => setIsSelected(!isSelected)}
      className={cn(
        "w-full text-left bg-card border rounded-lg p-4 transition-all duration-200",
        isSelected
          ? "border-primary ring-2 ring-primary/20 shadow-sm"
          : "border-border hover:border-primary/50",
      )}
    >

      <div className="aspect-4/3 bg-muted rounded-lg mb-4 flex items-center justify-center">
      </div>


      <span className="inline-block text-xs font-medium bg-primary-subtle text-primary px-2 py-0.5 rounded mb-2">
        {typeLabels[car.type]}
      </span>

      <h3 className="font-semibold text-foreground mb-1">{car.name}</h3>
      <p className="text-sm text-muted-foreground mb-3">{car.brand}</p>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <RiUserLine className="size-4" />
          <span>{car.capacity}</span>
        </div>
        <div className="flex items-center gap-1">
          <RiSuitcaseLine className="size-4" />
          <span>{car.luggage}</span>
        </div>
        <div className="flex items-center gap-1">
          <RiSettings3Line className="size-4" />
          <span className="capitalize">{car.transmission.slice(0, 4)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {car.features.slice(0, 3).map((feature) => (
          <span
            key={feature}
            className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground"
          >
            {feature}
          </span>
        ))}
      </div>


      <div className="flex items-baseline gap-1">
        <span className="font-mono text-lg font-bold text-foreground">
          ${car.pricePerDay}
        </span>
        <span className="text-sm text-muted-foreground">/ day</span>
      </div>
    </button>
  );
}
