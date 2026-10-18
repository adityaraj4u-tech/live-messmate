/**
 * MessMate — Circular food orbit.
 * Six meal photographs travel around a central plate. Motion respects
 * the user's reduced-motion preference via CSS.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

const FOOD_IMAGES = [
  { src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=520&q=85", alt: "Indian thali with rice, dal, vegetables and roti", label: "Daily thali" },
  { src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=520&q=85", alt: "Indian curry served with fresh bread", label: "Comfort food" },
  { src: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=520&q=85", alt: "A bowl of fragrant biryani", label: "Biryani" },
  { src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=520&q=85", alt: "Freshly prepared samosas", label: "Fresh snacks" },
  { src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=520&q=85", alt: "Indian dal curry served for lunch", label: "Homestyle" },
  { src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=520&q=85", alt: "Chole bhature served on a plate", label: "Campus favourite" },
];

export function RotatingFoodBackground({ className }: { className?: string }) {
  return (
    <div className={cn("food-orbit-scene relative mx-auto aspect-square w-full max-w-[510px]", className)} aria-label="A rotating circle of food photographs">
      <div className="food-orbit-ring absolute inset-[7%] rounded-full border border-white/15" />
      <div className="food-orbit-ring food-orbit-ring-inner absolute inset-[20%] rounded-full border border-white/10" />

      <div className="food-orbit-spin absolute inset-0">
        {FOOD_IMAGES.map((food, index) => {
          const angle = index * 60;
          return (
            <div
              key={food.label}
              className="food-orbit-position absolute left-1/2 top-1/2"
              style={{ transform: `rotate(${angle}deg) translateY(calc(var(--food-orbit-radius) * -1))` }}
            >
              <div className="food-orbit-counter -translate-x-1/2 -translate-y-1/2">
                <div className="food-orbit-card group relative h-[88px] w-[112px] overflow-hidden rounded-2xl border border-white/35 bg-white/10 shadow-2xl sm:h-[108px] sm:w-[140px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={food.src}
                    alt={food.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10291E]/75 via-transparent to-transparent" />
                  <span className="absolute inset-x-2 bottom-2 truncate text-left text-[10px] font-semibold tracking-wide text-white sm:text-xs">{food.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 flex h-[148px] w-[148px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/70 bg-[#F8F7F2] text-center shadow-[0_16px_55px_rgba(0,0,0,.22)] sm:h-[178px] sm:w-[178px]">
        <span className="text-4xl sm:text-5xl" aria-hidden="true">🥗</span>
        <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#66806E] sm:text-xs">Made to share</span>
        <span className="mt-1 px-3 text-sm font-extrabold leading-tight text-[#173728] sm:text-base">Good food goes further.</span>
      </div>

      <div className="absolute bottom-[7%] left-[5%] hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:block">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#C6F36B]" />
        Affordable meals, less waste
      </div>
    </div>
  );
}
