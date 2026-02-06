"use client";

import { motion } from "motion/react";
import { format } from "date-fns";
import {
  RiMapPinLine,
  RiCalendarLine,
  RiTeamLine,
  RiArrowRightLine,
} from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { TripInfo } from "@/lib/plan_trip-types";

interface TripDetailsStepProps {
  tripInfo: TripInfo;
  setTripInfo: (info: TripInfo) => void;
  onNext: () => void;
  canProceed: boolean;
}

export function TripDetailsStep({
  tripInfo,
  setTripInfo,
  onNext,
  canProceed,
}: TripDetailsStepProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white border rounded-xl p-6 md:p-8 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold mb-2">Trip Details</h2>
          <p className="text-muted-foreground">
            Tell us where you're coming from and when
          </p>
        </div>

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
              className="pl-10 bg-white"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="arrival">Arrival in Rwanda</Label>
            <div className="relative">
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-10 text-left font-normal bg-white justify-start relative",
                        !tripInfo.arrivalDate && "text-muted-foreground",
                      )}
                    />
                  }
                >
                  <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  {tripInfo.arrivalDate ? (
                    format(new Date(tripInfo.arrivalDate), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      tripInfo.arrivalDate
                        ? new Date(tripInfo.arrivalDate)
                        : undefined
                    }
                    onSelect={(date) =>
                      setTripInfo({
                        ...tripInfo,
                        arrivalDate: date ? format(date, "yyyy-MM-dd") : "",
                      })
                    }
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="departure">Departure from Rwanda</Label>
            <div className="relative">
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-10 text-left font-normal bg-white justify-start relative",
                        !tripInfo.departureDate && "text-muted-foreground",
                      )}
                    />
                  }
                >
                  <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  {tripInfo.departureDate ? (
                    format(new Date(tripInfo.departureDate), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      tripInfo.departureDate
                        ? new Date(tripInfo.departureDate)
                        : undefined
                    }
                    onSelect={(date) =>
                      setTripInfo({
                        ...tripInfo,
                        departureDate: date ? format(date, "yyyy-MM-dd") : "",
                      })
                    }
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

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
                className="pl-10 bg-white"
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
                className="pl-10 bg-white"
              />
            </div>
          </div>
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
          <Textarea
            id="specialRequests"
            placeholder="Any dietary requirements, accessibility needs, or special occasions..."
            value={tripInfo.specialRequests}
            onChange={(e) =>
              setTripInfo({
                ...tripInfo,
                specialRequests: e.target.value,
              })
            }
            className="min-h-[100px] bg-white"
          />
        </div>

        <Button
          size="lg"
          className="w-full"
          disabled={!canProceed}
          onClick={onNext}
        >
          Continue to Contact Info
          <RiArrowRightLine className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
