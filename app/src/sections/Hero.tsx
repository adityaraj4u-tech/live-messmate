/**
 * MessMate — Cinematic Hero
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button, Card, PriceBadge, MealTypeBadge } from "@/components/ui";
import { HeroThali } from "@/components/HeroThali";
import { brand } from "@/lib/tokens";
import { cn } from "@/lib/utils";

const floatingCards = [
  { dish: "Chole Bhature", price: 35, portions: 6, meal: "breakfast" as const, window: "09:00 – 10:00" },
  { dish: "Veg Biryani + Raita", price: 50, portions: 12, meal: "dinner" as const, window: "21:00 – 22:00" },
  { dish: "Chicken Biryani", price: 70, portions: 2, meal: "dinner" as const, window: "21:00 – 22:00" },
];

export function Hero({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <section className={cn("relative pt-8 md:pt-12 pb-16 md:pb-24 overflow-hidden", className)}>
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
          <div className="max-w-xl">
            <h1 className="text-display-sm md:text-display text-forest font-bold tracking-tight leading-[1.15]">
              {brand.tagline}
            </h1>
            <p className="mt-5 text-body text-muted leading-relaxed">
              Surplus meals from {brand.campus} mess — reserved in seconds,
              collected with dignity. Starting here, expanding to more colleges
              soon.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => router.push("/discover")}>
                Explore Available Food
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                See How It Works
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center min-h-[320px] md:min-h-[420px]">
            <HeroThali className="w-[280px] md:w-[360px]" />

            {floatingCards.map((card, i) => (
              <Card
                key={card.dish}
                padding="sm"
                className={cn(
                  "absolute shadow-card-hover w-[160px] md:w-[180px] hidden sm:block",
                  i === 0 && "top-4 left-0 lg:-left-4",
                  i === 1 && "bottom-8 right-0 lg:-right-2",
                  i === 2 && "top-1/2 -translate-y-1/2 -right-2 lg:right-0 hidden lg:block"
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
