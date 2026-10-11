/**
 * MessMate — FoodCard
 * Primary customer-facing unit.
 */

"use client";

import * as React from "react";
import {
  Card,
  Button,
  MealTypeBadge,
  AvailabilityBadge,
  PriceBadge,
  PickupWindowChip,
} from "@/components/ui";
import type { FoodListing, AvailabilityStatus } from "@/types";
import { getAvailabilityStatus } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export interface FoodCardProps {
  listing: FoodListing;
  onReserve?: (listing: FoodListing) => void;
  className?: string;
  statusOverride?: AvailabilityStatus;
}

export function FoodCard({
  listing,
  onReserve,
  className,
  statusOverride,
}: FoodCardProps) {
  const status =
    statusOverride ??
    getAvailabilityStatus(listing.portionsRemaining, listing.portionsTotal);

  const isSoldOut = status === "sold_out";
  const isLimited = status === "limited";

  return (
    <Card
      interactive={!isSoldOut}
      padding="md"
      className={cn(
        "flex flex-col h-full",
        isSoldOut && "opacity-70",
        isLimited && "ring-1 ring-sage",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-label font-semibold text-charcoal leading-snug line-clamp-2">
            {listing.dishName}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <MealTypeBadge meal={listing.mealType} />
            <AvailabilityBadge status={status} />
          </div>
        </div>
        <PriceBadge amount={listing.priceInr} className="shrink-0" />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <PickupWindowChip
          start={listing.pickupStart}
          end={listing.pickupEnd}
          date={listing.pickupDate}
        />
        <p className="text-caption text-muted">
          {isSoldOut
            ? "No portions left"
            : `${listing.portionsRemaining} of ${listing.portionsTotal} portions left`}
        </p>
      </div>

      {listing.isIllustrative && (
        <p className="mt-2 text-[11px] text-muted/80 italic">
          Illustrative example
        </p>
      )}

      <div className="mt-auto pt-4">
        <Button
          variant={isSoldOut ? "outline" : "primary"}
          fullWidth
          disabled={isSoldOut}
          onClick={() => onReserve?.(listing)}
        >
          {isSoldOut ? "Sold Out" : "Reserve Portion"}
        </Button>
      </div>
    </Card>
  );
}
