"use client";

import { Button } from "@/components/ui/button";
import { RiLockLine, RiInformationLine } from "@remixicon/react";
export function PriceSummary() {
  // TODO: calculate based on actual selections
  const mockPricing = {
    hotel: 220 * 5,
    car: 85 * 5,
    guide: 80 * 3,
    travelers: 2,
  };

  const subtotal =
    mockPricing.hotel +
    mockPricing.car +
    mockPricing.guide;

  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  return (
    <div className="sticky top-28">
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Price Summary
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Flights (x{mockPricing.travelers})
            </span>
            <span className="font-medium">
              -
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Accommodation (5 nights)
            </span>
            <span className="font-medium">${mockPricing.hotel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Car Rental (5 days)</span>
            <span className="font-medium">${mockPricing.car}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Guide (3 days)</span>
            <span className="font-medium">${mockPricing.guide}</span>
          </div>

          <div className="border-t border-border my-3" />

          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              Service fee
              <RiInformationLine className="size-3 cursor-help" />
            </span>
            <span className="font-medium">${serviceFee}</span>
          </div>

          <div className="border-t border-border my-3" />

          <div className="flex justify-between text-base">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-mono text-xl font-bold text-foreground">
              ${total}
            </span>
          </div>
        </div>

        <Button className="w-full mt-6" size="lg">
          Continue to Review
        </Button>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
          <RiLockLine className="size-3" />
          <span>Secure checkout</span>
        </div>
      </div>

      <div className="mt-4 bg-primary-subtle rounded-lg p-4">
        <p className="text-sm text-primary">
          <strong>Price guarantee:</strong> Your quoted price is locked for 48
          hours. After confirmation, no hidden fees will be added.
        </p>
      </div>
    </div>
  );
}
