/**
 * MessMate — Reservation Lookup Page
 */

"use client";

import * as React from "react";
import {
  Button,
  Field,
  Input,
  Card,
  PriceBadge,
  PickupWindowChip,
  ReservationStatusBadge,
} from "@/components/ui";
import { sampleReservations } from "@/lib/sample-data";
import type { Reservation } from "@/types";
import { cn } from "@/lib/utils";

type LookupState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "found"; reservation: Reservation }
  | { status: "not_found" };

export function ReservationLookupPage({ className }: { className?: string }) {
  const [phone, setPhone] = React.useState("");
  const [reservationId, setReservationId] = React.useState("");
  const [state, setState] = React.useState<LookupState>({ status: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim() || !reservationId.trim()) return;
    setState({ status: "loading" });
    await new Promise((r) => setTimeout(r, 500));
    const result =
      sampleReservations.find(
        (r) =>
          r.id.toLowerCase() === reservationId.trim().toLowerCase() &&
          r.phone.replace(/\s/g, "") === phone.replace(/\s/g, "")
      ) ?? null;
    setState(
      result
        ? { status: "found", reservation: result }
        : { status: "not_found" }
    );
  }

  return (
    <div className={cn("min-h-dvh bg-ivory", className)}>
      <div className="container py-8 md:py-12 max-w-lg mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-heading text-forest font-semibold">
            Find your reservation
          </h1>
          <p className="mt-2 text-body-sm text-muted">
            Enter the phone number and reservation ID from your confirmation.
          </p>
        </header>

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Field label="Phone Number" htmlFor="lookup-phone" required>
              <Input
                id="lookup-phone"
                type="tel"
                inputMode="numeric"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Field>
            <Field label="Reservation ID" htmlFor="lookup-id" required>
              <Input
                id="lookup-id"
                placeholder="e.g. RSV-GEC-1042"
                value={reservationId}
                onChange={(e) => setReservationId(e.target.value)}
              />
            </Field>
            <Button
              type="submit"
              fullWidth
              loading={state.status === "loading"}
              size="lg"
            >
              Look Up
            </Button>
          </form>
        </Card>

        {state.status === "found" && (
          <Card padding="lg" className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-label font-semibold text-charcoal">
                {state.reservation.id}
              </p>
              <ReservationStatusBadge status={state.reservation.status} />
            </div>
            <div className="space-y-3">
              <Row label="Dish" value={state.reservation.dishName} />
              <Row label="Name" value={state.reservation.customerName} />
              <Row label="Quantity" value={String(state.reservation.quantity)} />
              <div className="flex justify-between items-center">
                <span className="text-caption text-muted">Total</span>
                <PriceBadge
                  amount={state.reservation.priceInr}
                  className="text-label"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-caption text-muted">Pickup</span>
                <PickupWindowChip
                  start={state.reservation.pickupStart}
                  end={state.reservation.pickupEnd}
                />
              </div>
            </div>
          </Card>
        )}

        {state.status === "not_found" && (
          <Card padding="md" className="mt-6 text-center">
            <p className="text-label text-charcoal font-medium">
              Reservation not found
            </p>
            <p className="mt-1 text-caption text-muted">
              Check the phone number and ID, or contact the mess if you need
              help.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-caption text-muted">{label}</span>
      <span className="text-label text-charcoal text-right">{value}</span>
    </div>
  );
}
