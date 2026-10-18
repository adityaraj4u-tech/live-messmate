/**
 * MessMate — Rotating Food Background
 *
 * Premium slow-orbiting gallery of appetizing Indian meals.
 * CSS-driven for performance. Static fallback when prefers-reduced-motion.
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const FOOD_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
    alt: "Indian thali with rice, dal, sabzi and roti",
  },
  {
    src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
    alt: "Butter chicken and naan",
  },
  {
    src: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80",
    alt: "Vegetable biryani in a bowl",
  },
  {
    src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
    alt: "Fresh samosas and chutney",
  },
  {
    src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
    alt: "Dal tadka with rice and salad",
  },
  {
    src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80",
    alt: "Chole bhature plate",
  },
];

export function RotatingFoodBackground({
  className,
}: {
  className?: string;
}) {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      aria-hidden
    >
      {/* Dark base for text readability */}
      <div className="absolute inset-0 bg-forest-deep/90 z-10" />

      {/* Soft vignette */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(23,55,40,0.55) 70%, rgba(23,55,40,0.85) 100%)",
        }}
      />

      {/* Rotating gallery */}
      <div
        className={cn(
          "absolute inset-[-20%] flex items-center justify-center",
          !reducedMotion && "animate-food-orbit"
        )}
      >
        <div className="relative w-full h-full max-w-[1400px] max-h-[900px]">
          {FOOD_IMAGES.map((img, i) => {
            const angle = (i / FOOD_IMAGES.length) * 360;
            const radius = reducedMotion ? 0 : 38; // % of container
            return (
              <div
                key={img.src}
                className="absolute left-1/2 top-1/2 w-[42%] md:w-[32%] aspect-[4/3] -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden shadow-elevated opacity-70"
                style={{
                  transform: reducedMotion
                    ? `translate(-50%, -50%) scale(${i === 0 ? 1.05 : 0.9})`
                    : `rotate(${angle}deg) translate(${radius}%) rotate(-${angle}deg)`,
                  zIndex: reducedMotion ? (i === 0 ? 5 : 1) : undefined,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-forest-deep/25" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Static fallback image when reduced motion */}
      {reducedMotion && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={FOOD_IMAGES[0].src}
            alt=""
            className="w-full h-full object-cover opacity-40"
            loading="eager"
          />
        </div>
      )}
    </div>
  );
}
