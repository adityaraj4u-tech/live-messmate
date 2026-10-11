/**
 * MessMate — Reservations View
 */

"use client";

import * as React from "react";
import {
  Button,
  Chip,
  ReservationStatusBadge,
  Card,
} from "@/components/ui";
import { sampleReservations } from "@/lib/sample-data";
import type { ReservationStatus } from "@/types";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | ReservationStatus;

export function ReservationsPage({ className }: { className?: string }) {
  const [filter, setFilter] = React.useState<StatusFilter>("all");
  const [items, setItems] = React.useState(sampleReservations);

  const filtered =
    filter === "all" ? items : items.filter((r) => r.status === filter);

  function markCollected(id: string) {
    setItems((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "collected" as const } : r
      )
    );
  }

  return (
    <div className={cn("min-h-dvh bg-ivory", className)}>
      <div className="container py-8 md:py-10">
        <header className="mb-8">
          <h1 className="text-heading text-forest font-semibold">
            Reservations
          </h1>
          <p className="mt-1 text-caption text-muted">
            Scan and mark collected during pickup windows
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-6">
          {(
            [
              { id: "all", label: "All" },
              { id: "confirmed", label: "Confirmed" },
              { id: "collected", label: "Collected" },
              { id: "expired", label: "Expired" },
            ] as const
          ).map((f) => (
            <Chip
              key={f.id}
              size="sm"
              selected={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </Chip>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {filtered.length === 0 ? (
            <p className="text-body-sm text-muted py-12 text-center">
              No reservations match this filter.
            </p>
          ) : (
            filtered.map((r) => (
              <Card
                key={r.id}
                padding="sm"
                className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_0.8fr_0.6fr_1fr_0.8fr_auto] gap-2 md:gap-3 md:items-center"
              >
                <div>
                  <p className="text-label font-medium text-charcoal">
                    {r.customerName}
                  </p>
                  {r.rollNumber && (
                    <p className="text-caption text-muted">{r.rollNumber}</p>
                  )}
                </div>
                <p className="text-label text-charcoal truncate">{r.dishName}</p>
                <p className="text-caption text-muted tabular-nums">{r.phone}</p>
                <p className="text-label text-charcoal">{r.quantity}</p>
                <p className="text-caption text-muted">
                  {r.pickupStart} – {r.pickupEnd}
                </p>
                <ReservationStatusBadge status={r.status} />
                <div>
                  {r.status === "confirmed" && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => markCollected(r.id)}
                    >
                      Mark Collected
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
