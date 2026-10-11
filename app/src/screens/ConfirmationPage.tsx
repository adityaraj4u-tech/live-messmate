/**
 * MessMate — Confirmation Page
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ConfirmationCard } from "@/components";
import type { Reservation } from "@/types";
import { cn } from "@/lib/utils";

export interface ConfirmationPageProps {
  reservation: Reservation;
  className?: string;
}

export function ConfirmationPage({
  reservation,
  className,
}: ConfirmationPageProps) {
  const router = useRouter();

  return (
    <div className={cn("min-h-dvh bg-ivory", className)}>
      <div className="container py-10 md:py-16 flex flex-col items-center">
        <ConfirmationCard
          reservation={reservation}
          onDone={() => router.push("/discover")}
        />
      </div>
    </div>
  );
}
