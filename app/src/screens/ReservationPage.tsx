/**
 * MessMate — Reservation Page
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ReservationForm,
  type ReservationFormValues,
} from "@/components";
import type { FoodListing } from "@/types";
import { cn } from "@/lib/utils";

export interface ReservationPageProps {
  listing: FoodListing;
  className?: string;
}

export function ReservationPage({ listing, className }: ReservationPageProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(values: ReservationFormValues) {
    setLoading(true);
    // Demo: simulate submit then redirect with query params
    await new Promise((r) => setTimeout(r, 600));
    const params = new URLSearchParams({
      id: `RSV-GEC-${Math.floor(1000 + Math.random() * 9000)}`,
      dish: listing.dishName,
      name: values.fullName,
      phone: values.phone,
      qty: String(values.quantity),
      price: String(listing.priceInr * values.quantity),
      start: listing.pickupStart,
      end: listing.pickupEnd,
    });
    router.push(`/confirmation?${params.toString()}`);
  }

  return (
    <div className={cn("min-h-dvh bg-ivory", className)}>
      <div className="container py-8 md:py-12 flex flex-col items-center">
        <header className="mb-8 text-center max-w-md">
          <h1 className="text-heading text-forest font-semibold">
            Reserve your portion
          </h1>
          <p className="mt-2 text-body-sm text-muted">
            No account required. We’ll only use your phone for reservation
            updates.
          </p>
        </header>

        <ReservationForm
          listing={listing}
          onSubmit={handleSubmit}
          onCancel={() => router.push(`/food/${listing.id}`)}
          loading={loading}
        />
      </div>
    </div>
  );
}
