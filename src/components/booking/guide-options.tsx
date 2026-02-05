"use client";

import type { Guide } from "@/lib/schemas";
import { RiStarFill, RiTimeLine, RiGlobalLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface GuideOptionsProps {
  guide: Guide;
}

export function GuideOptions({ guide }: GuideOptionsProps) {
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
      <div className="flex gap-5">
        {/* photo */}
        <div className="size-20 rounded-full bg-muted shrink-0 flex items-center justify-center">
          {/* TODO: replace with actual guide photo */}
          <span className="text-3xl">👤</span>
        </div>

        {/* info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground text-lg">
                {guide.name}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <RiTimeLine className="size-4" />
                  <span>{guide.experience} years exp.</span>
                </div>
                <div className="flex items-center gap-1">
                  <RiStarFill className="size-4 text-accent-warm" />
                  <span>
                    {guide.rating} ({guide.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono text-xl font-bold text-foreground">
                ${guide.pricePerDay}
              </span>
              <span className="text-sm text-muted-foreground">/day</span>
            </div>
          </div>

          {/* languages */}
          <div className="flex items-center gap-2 mt-3">
            <RiGlobalLine className="size-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {guide.languages.map((lang) => (
                <span
                  key={lang}
                  className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* specialties */}
          <div className="flex flex-wrap gap-2 mt-3">
            {guide.specialties.map((specialty) => (
              <span
                key={specialty}
                className="text-xs bg-primary-subtle text-primary px-2 py-1 rounded"
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* bio */}
          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
            {guide.bio}
          </p>
        </div>
      </div>
    </button>
  );
}
