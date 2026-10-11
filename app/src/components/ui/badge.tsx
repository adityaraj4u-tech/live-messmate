/**
 * MessMate — Badge Primitive + domain variants
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "sage"
  | "forest"
  | "lime"
  | "muted"
  | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-sage text-forest",
  sage: "bg-sage text-forest",
  forest: "bg-forest text-ivory",
  lime: "bg-lime text-charcoal",
  muted: "bg-charcoal/8 text-muted",
  outline: "bg-transparent border border-border text-muted",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-sm px-2 py-0.5 text-caption font-medium whitespace-nowrap",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

/* ── Domain badges ─────────────────────────── */

export type MealType = "breakfast" | "lunch" | "dinner";

const mealLabels: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

export function MealTypeBadge({
  meal,
  className,
}: {
  meal: MealType;
  className?: string;
}) {
  return (
    <Badge variant="sage" className={className}>
      {mealLabels[meal]}
    </Badge>
  );
}

export type AvailabilityStatus =
  | "available"
  | "limited"
  | "sold_out"
  | "pickup_soon";

const availabilityConfig: Record<
  AvailabilityStatus,
  { label: string; variant: BadgeVariant }
> = {
  available: { label: "Available", variant: "lime" },
  limited: { label: "Limited", variant: "sage" },
  sold_out: { label: "Sold Out", variant: "muted" },
  pickup_soon: { label: "Pickup Soon", variant: "forest" },
};

export function AvailabilityBadge({
  status,
  className,
}: {
  status: AvailabilityStatus;
  className?: string;
}) {
  const config = availabilityConfig[status];
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}

export type ReservationStatus =
  | "confirmed"
  | "collected"
  | "expired"
  | "cancelled";

const reservationConfig: Record<
  ReservationStatus,
  { label: string; variant: BadgeVariant }
> = {
  confirmed: { label: "Confirmed", variant: "lime" },
  collected: { label: "Collected", variant: "forest" },
  expired: { label: "Expired", variant: "muted" },
  cancelled: { label: "Cancelled", variant: "outline" },
};

export function ReservationStatusBadge({
  status,
  className,
}: {
  status: ReservationStatus;
  className?: string;
}) {
  const config = reservationConfig[status];
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}

/** Calm, refined INR price display */
export function PriceBadge({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-price text-charcoal tabular-nums font-semibold",
        className
      )}
    >
      ₹{amount.toLocaleString("en-IN")}
    </span>
  );
}
