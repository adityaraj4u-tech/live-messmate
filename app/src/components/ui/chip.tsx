/**
 * MessMate — Chip Primitive + PickupWindowChip
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  size?: "sm" | "md";
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, selected = false, size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center rounded-full border font-medium transition-all duration-fast",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest",
          "min-h-touch min-w-touch",
          size === "sm"
            ? "h-8 px-3 text-caption gap-1.5"
            : "h-9 px-4 text-label gap-2",
          selected
            ? "bg-forest text-ivory border-forest"
            : "bg-ivory text-charcoal border-border hover:border-forest/40 hover:bg-sage/40",
          className
        )}
        aria-pressed={selected}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Chip.displayName = "Chip";

/** High-visibility pickup window presentation */
export function PickupWindowChip({
  start,
  end,
  date,
  className,
}: {
  start: string;
  end: string;
  date?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md bg-sage/70 px-2.5 py-1 text-caption font-medium text-forest",
        className
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span>
        {date ? `${date} · ` : ""}
        {start} – {end}
      </span>
    </span>
  );
}
