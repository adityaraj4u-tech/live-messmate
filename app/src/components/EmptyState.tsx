/**
 * MessMate — Empty, Loading, Error states
 * Phase 2: refined visual hierarchy and spacing
 */

import * as React from "react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title = "No food available right now",
  description = "The mess hasn’t listed any surplus yet. Check back closer to meal times.",
  actionLabel = "Refresh",
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-20 px-6",
        className
      )}
      role="status"
    >
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sage shadow-sm"
        aria-hidden="true"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-forest"
        >
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
      </div>
      <h3 className="text-heading-sm text-forest font-semibold">{title}</h3>
      <p className="mt-2.5 max-w-sm text-body-sm text-muted leading-relaxed">
        {description}
      </p>
      {onAction && (
        <Button variant="outline" className="mt-7" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function FoodCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-ivory p-5 shadow-card animate-pulse",
        className
      )}
      aria-hidden="true"
    >
      <div className="flex justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-sage/80" />
          <div className="flex gap-2">
            <div className="h-5 w-16 rounded-sm bg-sage/60" />
            <div className="h-5 w-16 rounded-sm bg-sage/60" />
          </div>
        </div>
        <div className="h-6 w-12 rounded bg-sage/80" />
      </div>
      <div className="mt-4 h-6 w-32 rounded-md bg-sage/60" />
      <div className="mt-2 h-3 w-24 rounded bg-sage/50" />
      <div className="mt-6 h-11 w-full rounded-md bg-sage/70" />
    </div>
  );
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      aria-busy="true"
      aria-label="Loading food listings"
    >
      {Array.from({ length: count }).map((_, i) => (
        <FoodCardSkeleton key={i} />
      ))}
    </div>
  );
}

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn’t load the latest listings. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-20 px-6",
        className
      )}
      role="alert"
    >
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50"
        aria-hidden="true"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-600"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      </div>
      <h3 className="text-heading-sm text-forest font-semibold">{title}</h3>
      <p className="mt-2.5 max-w-sm text-body-sm text-muted leading-relaxed">
        {description}
      </p>
      {onRetry && (
        <Button variant="secondary" className="mt-7" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
