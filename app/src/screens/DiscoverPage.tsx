/**
 * MessMate — Discover Food Page
 * Phase 2: result count, clearer empty state, refined spacing
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  FoodCard,
  FilterBar,
  LoadingGrid,
  EmptyState,
  ErrorState,
  type FilterState,
} from "@/components";
import { sampleListings, getAvailabilityStatus } from "@/lib/sample-data";
import type { FoodListing } from "@/types";
import { cn } from "@/lib/utils";

export interface DiscoverPageProps {
  listings?: FoodListing[];
  loading?: boolean;
  error?: boolean;
  className?: string;
}

export function DiscoverPage({
  listings = sampleListings,
  loading = false,
  error = false,
  className,
}: DiscoverPageProps) {
  const router = useRouter();
  const [filters, setFilters] = React.useState<FilterState>({
    mealType: "all",
    availability: "all",
  });

  const filtered = React.useMemo(() => {
    return listings.filter((item) => {
      if (filters.mealType !== "all" && item.mealType !== filters.mealType)
        return false;
      const status = getAvailabilityStatus(
        item.portionsRemaining,
        item.portionsTotal
      );
      if (filters.availability === "available" && status !== "available")
        return false;
      if (filters.availability === "limited" && status !== "limited")
        return false;
      return true;
    });
  }, [listings, filters]);

  const availableCount = filtered.filter(
    (l) =>
      getAvailabilityStatus(l.portionsRemaining, l.portionsTotal) !== "sold_out"
  ).length;

  return (
    <div className={cn("min-h-dvh bg-ivory", className)}>
      <div className="container py-8 md:py-12">
        <header className="mb-6 md:mb-8">
          <h1 className="text-display-sm md:text-display text-forest font-bold tracking-tight">
            Discover Food
          </h1>
          <p className="mt-2 text-body-sm text-muted max-w-xl">
            Surplus meals from GEC Banka mess — reserve a portion, no account
            needed.
          </p>
        </header>

        <div className="sticky top-[72px] z-20 -mx-4 px-4 py-3 md:static md:mx-0 md:px-0 md:py-0 bg-ivory/95 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none mb-6 md:mb-8">
          <FilterBar value={filters} onChange={setFilters} />
          {!loading && !error && (
            <p className="mt-3 text-caption text-muted" aria-live="polite">
              {filtered.length === 0
                ? "No matches"
                : `${availableCount} available · ${filtered.length} total`}
            </p>
          )}
        </div>

        {loading ? (
          <LoadingGrid count={6} />
        ) : error ? (
          <ErrorState />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No matching food right now"
            description="Try a different meal type or check back closer to meal times (Breakfast 9–10, Lunch 1–2, Dinner 9–10)."
            actionLabel="Clear filters"
            onAction={() =>
              setFilters({ mealType: "all", availability: "all" })
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {filtered.map((listing) => (
              <FoodCard
                key={listing.id}
                listing={listing}
                onReserve={() => router.push(`/food/${listing.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
