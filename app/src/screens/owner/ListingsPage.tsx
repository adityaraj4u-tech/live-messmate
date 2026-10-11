/**
 * MessMate — Listings Management
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Chip,
  MealTypeBadge,
  AvailabilityBadge,
  PriceBadge,
  PickupWindowChip,
  Card,
} from "@/components/ui";
import { sampleListings, getAvailabilityStatus } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

type Tab = "active" | "sold_out" | "all";

export function ListingsPage({ className }: { className?: string }) {
  const router = useRouter();
  const [tab, setTab] = React.useState<Tab>("active");

  const filtered = sampleListings.filter((l) => {
    if (tab === "active") return l.portionsRemaining > 0;
    if (tab === "sold_out") return l.portionsRemaining <= 0;
    return true;
  });

  return (
    <div className={cn("min-h-dvh bg-ivory", className)}>
      <div className="container py-8 md:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-heading text-forest font-semibold">Listings</h1>
            <p className="mt-1 text-caption text-muted">
              Manage surplus food listings
            </p>
          </div>
          <Button onClick={() => router.push("/owner/create")}>
            Create Listing
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {(
            [
              { id: "active", label: "Active" },
              { id: "sold_out", label: "Sold Out" },
              { id: "all", label: "All" },
            ] as const
          ).map((t) => (
            <Chip
              key={t.id}
              selected={tab === t.id}
              onClick={() => setTab(t.id)}
              size="sm"
            >
              {t.label}
            </Chip>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <p className="text-body-sm text-muted py-12 text-center">
              No listings in this category.
            </p>
          ) : (
            filtered.map((listing) => {
              const status = getAvailabilityStatus(
                listing.portionsRemaining,
                listing.portionsTotal
              );
              return (
                <Card
                  key={listing.id}
                  padding="md"
                  className="flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-label font-semibold text-charcoal truncate">
                        {listing.dishName}
                      </h3>
                      <MealTypeBadge meal={listing.mealType} />
                      <AvailabilityBadge status={status} />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <PriceBadge
                        amount={listing.priceInr}
                        className="text-label"
                      />
                      <span className="text-caption text-muted">
                        {listing.portionsRemaining}/{listing.portionsTotal}{" "}
                        portions
                      </span>
                      <PickupWindowChip
                        start={listing.pickupStart}
                        end={listing.pickupEnd}
                      />
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
