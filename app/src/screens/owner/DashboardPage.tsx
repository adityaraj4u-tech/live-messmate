/**
 * MessMate — Mess Owner Dashboard
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { StatGrid, FoodCard } from "@/components";
import { sampleListings, sampleStats } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export function DashboardPage({ className }: { className?: string }) {
  const router = useRouter();
  const active = sampleListings.filter((l) => l.portionsRemaining > 0);

  return (
    <div className={cn("min-h-dvh bg-ivory", className)}>
      <div className="container py-8 md:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-heading text-forest font-semibold">
              Dashboard
            </h1>
            <p className="mt-1 text-caption text-muted">
              GEC Banka · Today’s overview
            </p>
          </div>
          <Button size="lg" onClick={() => router.push("/owner/create")}>
            Create Listing
          </Button>
        </div>

        <StatGrid metrics={sampleStats} className="mb-10" />

        <div className="flex flex-wrap gap-3 mb-10">
          <Button
            variant="outline"
            onClick={() => router.push("/owner/listings")}
          >
            Manage Listings
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/owner/reservations")}
          >
            View Reservations
          </Button>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-heading-sm text-forest font-semibold">
              Active Listings
            </h2>
            <button
              type="button"
              onClick={() => router.push("/owner/listings")}
              className="text-label text-forest hover:underline"
            >
              View all
            </button>
          </div>
          {active.length === 0 ? (
            <p className="text-body-sm text-muted py-8 text-center">
              No active listings. Create one to get started.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {active.slice(0, 3).map((listing) => (
                <FoodCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
