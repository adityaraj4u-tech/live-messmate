/**
 * MessMate — ConfirmationCard
 * Calm success state after reservation.
 */

"use client";

import * as React from "react";
import {
  Card,
  Button,
  PriceBadge,
  PickupWindowChip,
  ReservationStatusBadge,
} from "@/components/ui";
import type { Reservation } from "@/types";
import { cn } from "@/lib/utils";

export interface ConfirmationCardProps {
  reservation: Reservation;
  onSave?: () => void;
  onAddToCalendar?: () => void;
  onDone?: () => void;
  className?: string;
}

export function ConfirmationCard({
  reservation,
  onSave,
  onAddToCalendar,
  onDone,
  className,
}: ConfirmationCardProps) {
  return (
    <Card padding="lg" className={cn("max-w-md w-full text-center", className)}>
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sage">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-forest"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="text-heading-sm text-forest font-semibold">
        Reservation Confirmed
      </h2>
      <p className="mt-1.5 text-caption text-muted">
        Show this at the mess counter during pickup
      </p>

      <div className="mt-5 rounded-lg bg-sage/50 px-4 py-3">
        <p className="text-caption text-muted">Reservation ID</p>
        <p className="mt-0.5 text-body font-semibold text-charcoal tracking-wide">
          {reservation.id}
        </p>
      </div>

      <div className="mt-5 text-left space-y-3">
        <div className="flex justify-between gap-3">
          <span className="text-caption text-muted">Dish</span>
          <span className="text-label text-charcoal text-right font-medium">
            {reservation.dishName}
          </span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-caption text-muted">Quantity</span>
          <span className="text-label text-charcoal">{reservation.quantity}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-caption text-muted">Total</span>
          <PriceBadge amount={reservation.priceInr} className="text-label" />
        </div>
        <div className="flex justify-between items-center gap-3">
          <span className="text-caption text-muted">Pickup</span>
          <PickupWindowChip
            start={reservation.pickupStart}
            end={reservation.pickupEnd}
            date={reservation.pickupDate}
          />
        </div>
        {reservation.collectionLocation && (
          <div className="flex justify-between gap-3">
            <span className="text-caption text-muted">Location</span>
            <span className="text-label text-charcoal text-right">
              {reservation.collectionLocation}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center gap-3">
          <span className="text-caption text-muted">Status</span>
          <ReservationStatusBadge status={reservation.status} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {onSave && (
          <Button variant="secondary" fullWidth onClick={onSave}>
            Save Confirmation
          </Button>
        )}
        {onAddToCalendar && (
          <Button variant="outline" fullWidth onClick={onAddToCalendar}>
            Add to Calendar
          </Button>
        )}
        {onDone && (
          <Button variant="ghost" fullWidth onClick={onDone}>
            Done
          </Button>
        )}
      </div>
    </Card>
  );
}
