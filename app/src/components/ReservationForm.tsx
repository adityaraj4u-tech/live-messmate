/**
 * MessMate — ReservationForm
 * No-login reservation flow.
 */

"use client";

import * as React from "react";
import {
  Button,
  Field,
  Input,
  Card,
  PriceBadge,
  PickupWindowChip,
  MealTypeBadge,
} from "@/components/ui";
import type { FoodListing } from "@/types";
import { cn } from "@/lib/utils";

export interface ReservationFormValues {
  fullName: string;
  rollNumber: string;
  phone: string;
  quantity: number;
}

export interface ReservationFormProps {
  listing: FoodListing;
  onSubmit: (values: ReservationFormValues) => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  className?: string;
}

export function ReservationForm({
  listing,
  onSubmit,
  onCancel,
  loading = false,
  className,
}: ReservationFormProps) {
  const [values, setValues] = React.useState<ReservationFormValues>({
    fullName: "",
    rollNumber: "",
    phone: "",
    quantity: 1,
  });
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof ReservationFormValues, string>>
  >({});

  const maxQty = Math.max(1, listing.portionsRemaining);

  function validate(): boolean {
    const next: typeof errors = {};
    if (!values.fullName.trim()) next.fullName = "Full name is required";
    if (!values.phone.trim()) {
      next.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\s+/g, ""))) {
      next.phone = "Enter a valid 10-digit Indian mobile number";
    }
    if (values.quantity < 1 || values.quantity > maxQty) {
      next.quantity = `Quantity must be between 1 and ${maxQty}`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      ...values,
      phone: values.phone.replace(/\s+/g, ""),
    });
  }

  const total = listing.priceInr * values.quantity;

  return (
    <Card padding="lg" className={cn("max-w-md w-full", className)}>
      <div className="mb-6 pb-5 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-heading-sm text-forest font-semibold leading-tight">
              {listing.dishName}
            </h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <MealTypeBadge meal={listing.mealType} />
            </div>
          </div>
          <PriceBadge amount={listing.priceInr} />
        </div>
        <PickupWindowChip
          start={listing.pickupStart}
          end={listing.pickupEnd}
          className="mt-3"
        />
        <p className="mt-2 text-caption text-muted">
          {listing.portionsRemaining} portions available · No account needed
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <Field
          label="Full Name"
          htmlFor="fullName"
          required
          error={errors.fullName}
        >
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder="Your full name"
            value={values.fullName}
            onChange={(e) =>
              setValues((v) => ({ ...v, fullName: e.target.value }))
            }
            error={!!errors.fullName}
          />
        </Field>

        <Field
          label="Roll Number"
          htmlFor="rollNumber"
          optional
          hint="Helps the mess identify you faster"
        >
          <Input
            id="rollNumber"
            name="rollNumber"
            placeholder="e.g. 21CSE042"
            value={values.rollNumber}
            onChange={(e) =>
              setValues((v) => ({ ...v, rollNumber: e.target.value }))
            }
          />
        </Field>

        <Field
          label="Phone Number"
          htmlFor="phone"
          required
          error={errors.phone}
          hint="We only use your number for reservation updates"
        >
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            value={values.phone}
            onChange={(e) =>
              setValues((v) => ({ ...v, phone: e.target.value }))
            }
            error={!!errors.phone}
          />
        </Field>

        <Field label="Quantity" htmlFor="quantity" error={errors.quantity}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-11 w-11 min-h-touch min-w-touch rounded-md border border-border bg-ivory text-charcoal hover:bg-sage/40 transition-colors disabled:opacity-40"
              onClick={() =>
                setValues((v) => ({
                  ...v,
                  quantity: Math.max(1, v.quantity - 1),
                }))
              }
              disabled={values.quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              max={maxQty}
              className="text-center w-20"
              value={values.quantity}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  quantity: Number(e.target.value) || 1,
                }))
              }
              error={!!errors.quantity}
            />
            <button
              type="button"
              className="h-11 w-11 min-h-touch min-w-touch rounded-md border border-border bg-ivory text-charcoal hover:bg-sage/40 transition-colors disabled:opacity-40"
              onClick={() =>
                setValues((v) => ({
                  ...v,
                  quantity: Math.min(maxQty, v.quantity + 1),
                }))
              }
              disabled={values.quantity >= maxQty}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </Field>

        <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-sage/50">
          <span className="text-label text-charcoal">Total</span>
          <PriceBadge amount={total} />
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <Button type="submit" fullWidth loading={loading} size="lg">
            Confirm Reservation
          </Button>
          {onCancel && (
            <Button type="button" variant="ghost" fullWidth onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
