"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { FoodCard } from "@/components";
import { sampleListings } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export function DiscoverPreview({ className }: { className?: string }) {
  const router = useRouter();
  const listings = sampleListings
    .filter((l) => l.portionsRemaining > 0)
    .slice(0, 3);

  return (
    <section id="discover" className={cn("py-16 md:py-24 bg-sage/30", className)}>
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-heading text-forest font-semibold">
              Available right now
            </h2>
            <p className="mt-1.5 text-body-sm text-muted">
              Real surplus from GEC Banka — illustrative examples.
            </p>
          </div>
          <Button variant="outline" onClick={() => router.push("/discover")}>
            View All Available Food
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {listings.map((listing) => (
            <FoodCard
              key={listing.id}
              listing={listing}
              onReserve={() => router.push(`/food/${listing.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
