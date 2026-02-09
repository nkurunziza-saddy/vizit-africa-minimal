"use client";

import type { Selections, TripInfo } from "../../lib/plan_trip-types";
import { RiCheckLine } from "@remixicon/react";

interface BookingSummaryProps {
  currentStep: number;
  tripInfo: TripInfo;
  selections: Selections;
  days: number;
  travelers: number;
  driverSurcharge: number;
  subtotal: number;
  serviceFee: number;
  total: number;
}

export function BookingSummary({
  currentStep,
  selections,
  days,
  travelers,
  driverSurcharge,
  subtotal,
  serviceFee,
  total,
}: BookingSummaryProps) {
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  return (
    <div className="bg-white border rounded-xl p-5 space-y-4 sticky top-28">
      <h3 className="font-display text-lg font-bold text-foreground">
        Summary
      </h3>

      {currentStep >= 3 ? (
        <>
          <div className="text-sm space-y-2 pb-4 border-b border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{days} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Travelers</span>
              <span className="font-medium">{travelers}</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <SummaryItem
              label="Hotel"
              isSelected={!!selections.hotel}
              value={
                selections.hotel ? selections.hotel.pricePerNight * days : null
              }
            />
            <SummaryItem
              label="Car"
              isSelected={!!selections.car}
              value={
                selections.car
                  ? selections.car.pricePerDay * days +
                    (selections.carWithDriver ? driverSurcharge * days : 0)
                  : null
              }
            />
            <SummaryItem
              label="Guide"
              isSelected={!!selections.guide}
              value={selections.guide?.price ?? null}
              optional
            />
          </div>

          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service Fee</span>
              <span>{formatCurrency(serviceFee)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
              <span>Total (excl. Flight)</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-muted-foreground text-sm">
          Complete trip details to see pricing
        </div>
      )}
    </div>
  );
}

interface SummaryItemProps {
  label: string;
  isSelected: boolean;
  value: number | null;
  optional?: boolean;
}

function SummaryItem({ label, isSelected, value, optional }: SummaryItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      {isSelected && value !== null ? (
        <span className="text-green-600 flex items-center gap-1">
          <RiCheckLine className="size-4" />${value}
        </span>
      ) : (
        <span className="text-muted-foreground">
          {optional ? "Optional" : "-"}
        </span>
      )}
    </div>
  );
}
