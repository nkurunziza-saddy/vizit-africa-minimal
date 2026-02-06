"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RiSearchLine, RiFilterOffLine } from "@remixicon/react";

interface FiltersSidebarProps {
  activeTab: string;
  hotelSearch: string;
  setHotelSearch: (v: string) => void;
  hotelPriceFilter: string;
  setHotelPriceFilter: (v: string) => void;
  hotelStarsFilter: string;
  setHotelStarsFilter: (v: string) => void;
  carSearch: string;
  setCarSearch: (v: string) => void;
  carCategoryFilter: string;
  setCarCategoryFilter: (v: string) => void;
  hotelCount: number;
  carCount: number;
}

export function FiltersSidebar({
  activeTab,
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
  hotelCount,
  carCount,
}: FiltersSidebarProps) {
  const resetHotelFilters = () => {
    setHotelSearch("");
    setHotelPriceFilter("all");
    setHotelStarsFilter("all");
  };

  const resetCarFilters = () => {
    setCarSearch("");
    setCarCategoryFilter("all");
  };

  return (
    <div className="bg-white border rounded-xl p-5 space-y-6 sticky top-28">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Filters</h3>
        {activeTab === "hotels" &&
          (hotelSearch ||
            hotelPriceFilter !== "all" ||
            hotelStarsFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetHotelFilters}
              className="text-xs h-7 gap-1"
            >
              <RiFilterOffLine className="size-3" />
              Reset
            </Button>
          )}
        {activeTab === "cars" && (carSearch || carCategoryFilter !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetCarFilters}
            className="text-xs h-7 gap-1"
          >
            <RiFilterOffLine className="size-3" />
            Reset
          </Button>
        )}
      </div>

      {activeTab === "hotels" && (
        <>
          <div className="space-y-2">
            <Label className="text-sm">Search</Label>
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Hotel name..."
                value={hotelSearch}
                onChange={(e) => setHotelSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm">Price Range</Label>
            <RadioGroup
              value={hotelPriceFilter}
              onValueChange={setHotelPriceFilter}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="price-all" />
                <Label
                  htmlFor="price-all"
                  className="text-sm font-normal cursor-pointer"
                >
                  All prices
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="budget" id="price-budget" />
                <Label
                  htmlFor="price-budget"
                  className="text-sm font-normal cursor-pointer"
                >
                  Budget (under $150)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mid" id="price-mid" />
                <Label
                  htmlFor="price-mid"
                  className="text-sm font-normal cursor-pointer"
                >
                  Mid-range ($150-200)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="luxury" id="price-luxury" />
                <Label
                  htmlFor="price-luxury"
                  className="text-sm font-normal cursor-pointer"
                >
                  Luxury ($200+)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-sm">Star Rating</Label>
            <RadioGroup
              value={hotelStarsFilter}
              onValueChange={setHotelStarsFilter}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="stars-all" />
                <Label
                  htmlFor="stars-all"
                  className="text-sm font-normal cursor-pointer"
                >
                  All ratings
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="stars-5" />
                <Label
                  htmlFor="stars-5"
                  className="text-sm font-normal cursor-pointer"
                >
                  5 stars only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4+" id="stars-4plus" />
                <Label
                  htmlFor="stars-4plus"
                  className="text-sm font-normal cursor-pointer"
                >
                  4+ stars
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="stars-3" />
                <Label
                  htmlFor="stars-3"
                  className="text-sm font-normal cursor-pointer"
                >
                  3 stars
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="pt-4 border-t text-sm text-muted-foreground">
            Showing {hotelCount} hotels
          </div>
        </>
      )}

      {activeTab === "cars" && (
        <>
          <div className="space-y-2">
            <Label className="text-sm">Search</Label>
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Vehicle model..."
                value={carSearch}
                onChange={(e) => setCarSearch(e.target.value)}
                className="pl-9 h-9 bg-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm">Vehicle Type</Label>
            <RadioGroup
              value={carCategoryFilter}
              onValueChange={setCarCategoryFilter}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="cat-all" />
                <Label
                  htmlFor="cat-all"
                  className="text-sm font-normal cursor-pointer"
                >
                  All types
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sedan" id="cat-sedan" />
                <Label
                  htmlFor="cat-sedan"
                  className="text-sm font-normal cursor-pointer"
                >
                  Sedan
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="suv" id="cat-suv" />
                <Label
                  htmlFor="cat-suv"
                  className="text-sm font-normal cursor-pointer"
                >
                  SUV
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="van" id="cat-van" />
                <Label
                  htmlFor="cat-van"
                  className="text-sm font-normal cursor-pointer"
                >
                  Van
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="pt-4 border-t text-sm text-muted-foreground">
            Showing {carCount} vehicles
          </div>
        </>
      )}

      {(activeTab === "flights" || activeTab === "guides") && (
        <div className="text-sm text-muted-foreground py-4">
          No filters available for this category.
        </div>
      )}
    </div>
  );
}
