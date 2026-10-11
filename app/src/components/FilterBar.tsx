/**
 * MessMate — FilterBar
 */

"use client";

import * as React from "react";
import { Chip } from "@/components/ui";
import type { MealType } from "@/types";
import { cn } from "@/lib/utils";

export interface FilterState {
  mealType: MealType | "all";
  availability: "all" | "available" | "limited";
}

export interface FilterBarProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
  className?: string;
}

const mealOptions: { value: FilterState["mealType"]; label: string }[] = [
  { value: "all", label: "All" },
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
];

const availabilityOptions: {
  value: FilterState["availability"];
  label: string;
}[] = [
  { value: "all", label: "Any status" },
  { value: "available", label: "Available" },
  { value: "limited", label: "Limited" },
];

export function FilterBar({ value, onChange, className }: FilterBarProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap gap-2">
        {mealOptions.map((opt) => (
          <Chip
            key={opt.value}
            size="sm"
            selected={value.mealType === opt.value}
            onClick={() => onChange({ ...value, mealType: opt.value })}
          >
            {opt.label}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {availabilityOptions.map((opt) => (
          <Chip
            key={opt.value}
            size="sm"
            selected={value.availability === opt.value}
            onClick={() => onChange({ ...value, availability: opt.value })}
          >
            {opt.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
