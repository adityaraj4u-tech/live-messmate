/**
 * MessMate — MultiStepListingForm
 * Mess Owner 3-step create-listing flow with live FoodCard preview.
 */

"use client";

import * as React from "react";
import {
  Button,
  Field,
  Input,
  Textarea,
  Card,
  Chip,
} from "@/components/ui";
import { FoodCard } from "./FoodCard";
import type { FoodListing, MealType } from "@/types";
import { cn } from "@/lib/utils";

const MEAL_OPTIONS: { value: MealType; label: string }[] = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
];

const TODAY_MENU: Record<MealType, string[]> = {
  breakfast: ["Chole Bhature + Achar + Onion", "Aloo Paratha + Curd + Pickle"],
  lunch: ["Dal Tadka + Jeera Rice + Salad", "Rajma Chawal + Salad"],
  dinner: [
    "Veg Biryani + Raita",
    "Chicken Biryani + Raita",
    "Roti + Chawal + Tadka + Gulab Jamun + Bhujiya",
  ],
};

const defaultWindows: Record<MealType, { start: string; end: string }> = {
  breakfast: { start: "09:00", end: "10:00" },
  lunch: { start: "13:00", end: "14:00" },
  dinner: { start: "21:00", end: "22:00" },
};

export interface ListingFormValues {
  mealType: MealType;
  dishName: string;
  portionsTotal: number;
  priceInr: number;
  pickupStart: string;
  pickupEnd: string;
  allergens: string;
  notes: string;
}

export interface MultiStepListingFormProps {
  onPublish: (values: ListingFormValues) => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  className?: string;
}

export function MultiStepListingForm({
  onPublish,
  onCancel,
  loading = false,
  className,
}: MultiStepListingFormProps) {
  const [step, setStep] = React.useState(1);
  const [values, setValues] = React.useState<ListingFormValues>({
    mealType: "lunch",
    dishName: "",
    portionsTotal: 10,
    priceInr: 40,
    pickupStart: "13:00",
    pickupEnd: "14:00",
    allergens: "",
    notes: "",
  });
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof ListingFormValues, string>>
  >({});

  function setMeal(meal: MealType) {
    const win = defaultWindows[meal];
    setValues((v) => ({
      ...v,
      mealType: meal,
      pickupStart: win.start,
      pickupEnd: win.end,
    }));
  }

  function validateStep(s: number): boolean {
    const next: typeof errors = {};
    if (s === 1 && !values.dishName.trim())
      next.dishName = "Dish name is required";
    if (s === 2) {
      if (values.portionsTotal < 1) next.portionsTotal = "At least 1 portion";
      if (values.priceInr < 1) next.priceInr = "Price must be at least ₹1";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const previewListing: FoodListing = {
    id: "preview",
    dishName: values.dishName || "Your dish name",
    mealType: values.mealType,
    priceInr: values.priceInr || 0,
    portionsTotal: values.portionsTotal,
    portionsRemaining: values.portionsTotal,
    pickupStart: values.pickupStart,
    pickupEnd: values.pickupEnd,
    allergens: values.allergens
      ? values.allergens.split(",").map((a) => a.trim()).filter(Boolean)
      : undefined,
    notes: values.notes || undefined,
    isIllustrative: true,
  };

  return (
    <div className={cn("grid gap-8 lg:grid-cols-[1fr_320px]", className)}>
      <Card padding="lg">
        <div className="mb-6 flex items-center gap-2">
          {[1, 2, 3].map((n) => (
            <React.Fragment key={n}>
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-label font-semibold transition-colors",
                  step === n
                    ? "bg-forest text-ivory"
                    : step > n
                      ? "bg-sage text-forest"
                      : "bg-border text-muted"
                )}
              >
                {n}
              </div>
              {n < 3 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 rounded",
                    step > n ? "bg-sage" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="text-caption text-muted mb-5">
          Step {step} of 3 ·{" "}
          {step === 1
            ? "Meal & dish"
            : step === 2
              ? "Portions, price & pickup"
              : "Review & publish"}
        </p>

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-label text-charcoal mb-2">Meal type</p>
              <div className="flex flex-wrap gap-2">
                {MEAL_OPTIONS.map((opt) => (
                  <Chip
                    key={opt.value}
                    selected={values.mealType === opt.value}
                    onClick={() => setMeal(opt.value)}
                  >
                    {opt.label}
                  </Chip>
                ))}
              </div>
            </div>
            <Field
              label="Dish name"
              htmlFor="dishName"
              required
              error={errors.dishName}
            >
              <Input
                id="dishName"
                placeholder="e.g. Chole Bhature + Achar + Onion"
                value={values.dishName}
                onChange={(e) =>
                  setValues((v) => ({ ...v, dishName: e.target.value }))
                }
                error={!!errors.dishName}
              />
            </Field>
            <div>
              <p className="text-caption text-muted mb-2">Use today’s menu</p>
              <div className="flex flex-wrap gap-2">
                {TODAY_MENU[values.mealType].map((dish) => (
                  <button
                    key={dish}
                    type="button"
                    className="rounded-md border border-border bg-ivory px-3 py-1.5 text-caption text-charcoal hover:bg-sage/40 transition-colors"
                    onClick={() =>
                      setValues((v) => ({ ...v, dishName: dish }))
                    }
                  >
                    {dish}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Portions"
                htmlFor="portions"
                required
                error={errors.portionsTotal}
              >
                <Input
                  id="portions"
                  type="number"
                  min={1}
                  value={values.portionsTotal}
                  onChange={(e) =>
                    setValues((v) => ({
                      ...v,
                      portionsTotal: Number(e.target.value) || 0,
                    }))
                  }
                  error={!!errors.portionsTotal}
                />
              </Field>
              <Field
                label="Price per portion (₹)"
                htmlFor="price"
                required
                error={errors.priceInr}
              >
                <Input
                  id="price"
                  type="number"
                  min={1}
                  value={values.priceInr}
                  onChange={(e) =>
                    setValues((v) => ({
                      ...v,
                      priceInr: Number(e.target.value) || 0,
                    }))
                  }
                  error={!!errors.priceInr}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Pickup start" htmlFor="start">
                <Input
                  id="start"
                  type="time"
                  value={values.pickupStart}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, pickupStart: e.target.value }))
                  }
                />
              </Field>
              <Field label="Pickup end" htmlFor="end">
                <Input
                  id="end"
                  type="time"
                  value={values.pickupEnd}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, pickupEnd: e.target.value }))
                  }
                />
              </Field>
            </div>
            <Field
              label="Allergens"
              htmlFor="allergens"
              optional
              hint="Comma-separated"
            >
              <Input
                id="allergens"
                placeholder="Gluten, Dairy, Nuts"
                value={values.allergens}
                onChange={(e) =>
                  setValues((v) => ({ ...v, allergens: e.target.value }))
                }
              />
            </Field>
            <Field label="Notes" htmlFor="notes" optional>
              <Textarea
                id="notes"
                placeholder="Any extra details…"
                value={values.notes}
                onChange={(e) =>
                  setValues((v) => ({ ...v, notes: e.target.value }))
                }
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-3">
            {[
              ["Meal", values.mealType],
              ["Dish", values.dishName],
              ["Portions", String(values.portionsTotal)],
              ["Price", `₹${values.priceInr}`],
              ["Pickup", `${values.pickupStart} – ${values.pickupEnd}`],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-4 py-2 border-b border-border last:border-0"
              >
                <span className="text-caption text-muted">{label}</span>
                <span className="text-label text-charcoal text-right font-medium capitalize">
                  {value}
                </span>
              </div>
            ))}
            <p className="mt-3 text-caption text-muted">
              This is how customers will see your listing.
            </p>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          ) : onCancel ? (
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
          <div className="flex-1" />
          {step < 3 ? (
            <Button
              onClick={() => {
                if (validateStep(step)) setStep((s) => s + 1);
              }}
            >
              Continue
            </Button>
          ) : (
            <Button
              loading={loading}
              onClick={() => {
                if (validateStep(2)) onPublish(values);
              }}
            >
              Publish Listing
            </Button>
          )}
        </div>
      </Card>

      <div className="hidden lg:block">
        <p className="text-caption text-muted mb-3 font-medium">
          Customer preview
        </p>
        <FoodCard listing={previewListing} />
      </div>
    </div>
  );
}
