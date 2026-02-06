"use client";

import type { Hotel } from "@/lib/schemas";
import { RiStarFill, RiMapPinLine, RiWifiLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsSelected(!isSelected)}
      className={cn(
        "w-full text-left bg-card border rounded-lg overflow-hidden transition-all duration-200",
        isSelected
          ? "border-primary ring-2 ring-primary/20"
          : "border-border hover:border-primary/50",
      )}
    >
      <div className="aspect-[16/10] bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center"></div>

        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <RiStarFill className="size-3 text-accent-warm" />
          <span className="text-xs font-medium">{hotel.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
          {hotel.name}
        </h3>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <RiMapPinLine className="size-3" />
          <span className="line-clamp-1">{hotel.area}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground"
            >
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-1">
          <span className="font-mono text-xl font-bold text-foreground">
            ${hotel.pricePerNight}
          </span>
          <span className="text-sm text-muted-foreground">/ night</span>
        </div>

        <p className="text-xs text-muted-foreground mt-1">
          {hotel.reviewCount} reviews
        </p>
      </div>
    </button>
  );
}
