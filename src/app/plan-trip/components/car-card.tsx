"use client";

import type { Car } from "../types";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  RiCarLine,
  RiUserLine,
  RiSettings4Line,
  RiCheckLine,
} from "@remixicon/react";

interface CarCardProps {
  car: Car;
  isSelected: boolean;
  days: number;
  withDriver: boolean;
  driverSurcharge: number;
  onSelect: () => void;
  onDriverChange: (withDriver: boolean) => void;
}

export function CarCard({
  car,
  isSelected,
  days,
  withDriver,
  driverSurcharge,
  onSelect,
  onDriverChange,
}: CarCardProps) {
  const baseTotal = car.pricePerDay * days;
  const driverTotal = driverSurcharge * days;
  const total = baseTotal + (isSelected && withDriver ? driverTotal : 0);

  return (
    <div
      onClick={onSelect}
      className={`group relative border-2 rounded-xl overflow-hidden cursor-pointer transition-all ${
        isSelected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border hover:border-primary/50 hover:shadow-sm"
      }`}
    >
      {/* Image placeholder */}
      <div className="aspect-video bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <RiCarLine className="size-10 text-muted-foreground/50" />
        </div>

        {/* Category badge */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs font-medium capitalize">{car.category}</span>
        </div>

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 size-6 rounded-full bg-primary text-white flex items-center justify-center">
            <RiCheckLine className="size-4" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-semibold text-foreground mb-2">{car.model}</h4>

        {/* Specs */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <RiUserLine className="size-3" />
            {car.seats}
          </span>
          <span className="flex items-center gap-1">
            <RiSettings4Line className="size-3" />
            {car.transmission}
          </span>
          <span className="text-xs">{car.fuelType}</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {car.features.slice(0, 3).map((f) => (
            <Badge key={f} variant="secondary" className="text-xs">
              {f}
            </Badge>
          ))}
        </div>

        {/* Driver option - only show when selected */}
        {isSelected && (
          <div
            className="bg-muted/50 rounded-lg p-3 mb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <RadioGroup
              value={withDriver ? "with" : "self"}
              onValueChange={(v) => onDriverChange(v === "with")}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="self" id={`self-${car.id}`} />
                  <Label
                    htmlFor={`self-${car.id}`}
                    className="text-sm cursor-pointer"
                  >
                    Self-drive
                  </Label>
                </div>
                <span className="text-sm font-medium">
                  ${car.pricePerDay}/day
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="with" id={`with-${car.id}`} />
                  <Label
                    htmlFor={`with-${car.id}`}
                    className="text-sm cursor-pointer"
                  >
                    With driver
                  </Label>
                </div>
                <span className="text-sm font-medium">
                  ${car.pricePerDay + driverSurcharge}/day
                </span>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Price */}
        <div className="flex items-end justify-between pt-3 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">{days} days total</p>
            <p className="font-bold text-lg text-foreground">${total}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            ${car.pricePerDay}/day
          </p>
        </div>
      </div>
    </div>
  );
}
