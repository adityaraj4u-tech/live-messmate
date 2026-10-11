/**
 * MessMate — Food Detail Page
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  MealTypeBadge,
  AvailabilityBadge,
  PriceBadge,
  PickupWindowChip,
  Card,
} from "@/components/ui";
import { getAvailabilityStatus } from "@/lib/sample-data";
import type { FoodListing } from "@/types";
import { cn } from "@/lib/utils";

export interface FoodDetailPageProps {
  listing: FoodListing;
  className?: string;
}

export function FoodDetailPage({ listing, className }: FoodDetailPageProps) {
  const router = useRouter();
  const status = getAvailabilityStatus(
    listing.portionsRemaining,
    listing.portionsTotal
  );
  const isSoldOut = status === "sold_out";

  return (
    <div className={cn("min-h-dvh bg-ivory pb-28 md:pb-12", className)}>
      <div className="container py-6 md:py-10">
        <button
          type="button"
          onClick={() => router.push("/discover")}
          className="mb-6 inline-flex items-center gap-1.5 text-label text-muted hover:text-forest transition-colors min-h-touch"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Discover
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="aspect-[4/3] rounded-xl bg-sage/40 flex items-center justify-center overflow-hidden">
            <div className="text-center px-6">
              <p className="text-heading-sm text-forest/40 font-semibold">
                {listing.dishName}
              </p>
              {listing.isIllustrative && (
                <p className="mt-2 text-caption text-muted">
                  Illustrative example
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <MealTypeBadge meal={listing.mealType} />
              <AvailabilityBadge status={status} />
            </div>

            <h1 className="text-heading md:text-display-sm text-forest font-bold leading-tight">
              {listing.dishName}
            </h1>

            <div className="mt-4">
              <PriceBadge amount={listing.priceInr} className="text-2xl" />
              <span className="ml-2 text-caption text-muted">per portion</span>
            </div>

            <div className="mt-6 space-y-3">
              <PickupWindowChip
                start={listing.pickupStart}
                end={listing.pickupEnd}
                date={listing.pickupDate}
              />
              <p className="text-body-sm text-charcoal">
                {isSoldOut
                  ? "No portions remaining"
                  : `${listing.portionsRemaining} of ${listing.portionsTotal} portions remaining`}
              </p>
            </div>

            {listing.allergens && listing.allergens.length > 0 && (
              <div className="mt-5">
                <p className="text-caption text-muted mb-1.5">Allergens</p>
                <p className="text-label text-charcoal">
                  {listing.allergens.join(" · ")}
                </p>
              </div>
            )}

            {listing.notes && (
              <div className="mt-4">
                <p className="text-caption text-muted mb-1.5">Notes</p>
                <p className="text-body-sm text-charcoal">{listing.notes}</p>
              </div>
            )}

            <Card padding="sm" className="mt-6 bg-sage/30 border-0 shadow-none">
              <p className="text-label text-forest font-medium">
                No account needed
              </p>
              <p className="mt-0.5 text-caption text-muted">
                Reserve with just your name and phone number.
              </p>
            </Card>

            <div className="mt-8 hidden md:block">
              <Button
                size="lg"
                fullWidth
                disabled={isSoldOut}
                onClick={() => router.push(`/reserve/${listing.id}`)}
              >
                {isSoldOut ? "Sold Out" : "Reserve Portion"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-ivory/95 backdrop-blur-md px-4 py-3 md:hidden">
        <div className="container flex items-center justify-between gap-4">
          <div>
            <PriceBadge amount={listing.priceInr} />
            <p className="text-caption text-muted">
              {isSoldOut ? "Sold out" : `${listing.portionsRemaining} left`}
            </p>
          </div>
          <Button
            size="md"
            disabled={isSoldOut}
            onClick={() => router.push(`/reserve/${listing.id}`)}
            className="min-w-[140px]"
          >
            {isSoldOut ? "Sold Out" : "Reserve"}
          </Button>
        </div>
      </div>
    </div>
  );
}
