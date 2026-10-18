/**
 * MessMate — Cinematic Hero with rotating food background
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button, Card, PriceBadge, MealTypeBadge } from "@/components/ui";
import { HeroThali } from "@/components/HeroThali";
import { RotatingFoodBackground } from "@/components/RotatingFoodBackground";
import { brand } from "@/lib/tokens";
import { cn } from "@/lib/utils";

const floatingCards = [
  {
    dish: "Chole Bhature",
    price: 35,
    portions: 6,
    meal: "breakfast" as const,
    window: "09:00 – 10:00",
  },
  {
    dish: "Veg Biryani + Raita",
    price: 50,
    portions: 12,
    meal: "dinner" as const,
    window: "21:00 – 22:00",
  },
  {
    dish: "Chicken Biryani",
    price: 70,
    portions: 2,
    meal: "dinner" as const,
    window: "21:00 – 22:00",
  },
];

export function Hero({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <section
      className={cn(
        "relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden",
        className
      )}
    >
      {/* Premium rotating food background */}
      <RotatingFoodBackground />

      {/* Content layer */}
      <div className="relative z-30 container w-full py-16 md:py-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div className="max-w-xl">
            <p className="text-label uppercase tracking-wider text-lime/90 mb-3">
              {brand.campus} · Surplus meals
            </p>
            <h1 className="text-display-sm md:text-display text-ivory font-bold tracking-tight leading-[1.12]">
              Good Food Should Never Go to Waste.
            </h1>
            <p className="mt-5 text-body text-ivory/85 leading-relaxed max-w-md">
              Share surplus meals. Discover affordable food. Make a difference
              in your community.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-lime text-forest hover:bg-lime/90 border-0 shadow-elevated"
                onClick={() => router.push("/discover")}
              >
                Find Food
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-ivory border border-ivory/30 hover:bg-ivory/10 hover:text-ivory"
                onClick={() => router.push("/owner/login")}
              >
                Share Surplus Food
              </Button>
            </div>
          </div>

          {/* Visual column – thali + floating cards */}
          <div className="relative flex items-center justify-center min-h-[300px] md:min-h-[400px]">
            <HeroThali className="w-[260px] md:w-[340px] drop-shadow-2xl" />

            {floatingCards.map((card, i) => (
              <Card
                key={card.dish}
                padding="sm"
                className={cn(
                  "absolute shadow-card-hover w-[150px] md:w-[170px] bg-ivory/95 backdrop-blur-sm border border-white/20 hidden sm:block",
                  i === 0 && "top-2 left-0 lg:-left-6",
                  i === 1 && "bottom-6 right-0 lg:-right-4",
                  i === 2 &&
                    "top-1/2 -translate-y-1/2 -right-4 lg:right-0 hidden lg:block"
                )}
              >
                <p className="text-caption font-semibold text-charcoal truncate">
                  {card.dish}
                </p>
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <PriceBadge amount={card.price} className="text-label" />
                  <MealTypeBadge meal={card.meal} />
                </div>
                <p className="mt-1.5 text-[11px] text-muted">
                  {card.portions} left · {card.window}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
