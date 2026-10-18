/**
 * MessMate — Fresh, editorial hero with a circular food gallery.
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui";
import { RotatingFoodBackground } from "@/components/RotatingFoodBackground";
import { brand } from "@/lib/tokens";
import { cn } from "@/lib/utils";

export function Hero({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <section className={cn("relative isolate overflow-hidden bg-[#173728] text-[#F8F7F2]", className)}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-36 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#C6F36B]/10 blur-3xl" />
        <div className="absolute -bottom-48 right-0 h-[32rem] w-[32rem] rounded-full bg-[#8EBC91]/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(#F8F7F2 0.7px, transparent 0.7px)", backgroundSize: "20px 20px" }} />
      </div>

      <div className="relative mx-auto grid min-h-[680px] max-w-[1320px] items-center gap-6 px-5 pb-14 pt-14 sm:px-8 md:pb-20 md:pt-20 lg:grid-cols-[0.94fr_1.06fr] lg:gap-0 lg:px-12">
        <div className="relative z-20 max-w-2xl py-4 lg:py-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-2 text-xs font-semibold tracking-wide text-white/90 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#C6F36B] shadow-[0_0_12px_rgba(198,243,107,.8)]" />
            {brand.campus} <span className="text-white/35">/</span> Campus food, reimagined
          </div>

          <h1 className="max-w-[700px] text-[clamp(3.15rem,7.1vw,6.3rem)] font-extrabold leading-[0.98] tracking-[-0.065em] text-[#F8F7F2]">
            Good food.
            <span className="block text-[#C6F36B]">No waste.</span>
            More <span className="font-serif font-medium italic tracking-[-0.055em] text-white/80">community.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            Discover affordable surplus meals from nearby messes and food providers. Share what is left over, find your next meal, and help good food reach someone who needs it.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="min-h-12 border-0 bg-[#C6F36B] px-6 font-bold text-[#173728] shadow-[0_10px_35px_rgba(198,243,107,.15)] transition hover:bg-[#D5FA8E]"
              onClick={() => router.push("/discover")}
            >
              Find a meal <span className="ml-2 text-lg" aria-hidden="true">↗</span>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="min-h-12 border border-white/20 bg-white/[0.04] px-6 font-semibold text-white hover:bg-white/10 hover:text-white"
              onClick={() => router.push("/owner/login")}
            >
              Share surplus food
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/12 pt-6 text-xs font-medium text-white/55 sm:text-sm">
            <span><span className="mr-2 text-[#C6F36B]">✳</span>Budget-friendly meals</span>
            <span><span className="mr-2 text-[#C6F36B]">✳</span>Less food waste</span>
            <Link href="/admin/login" className="text-white/70 underline decoration-white/25 underline-offset-4 transition hover:text-[#C6F36B]">Admin login ↗</Link>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[600px] items-center justify-center py-4 sm:py-8 lg:-mr-8 lg:py-0">
          <RotatingFoodBackground />
          <div className="pointer-events-none absolute right-[3%] top-[12%] hidden rounded-2xl border border-white/15 bg-[#F8F7F2]/10 px-4 py-3 shadow-xl backdrop-blur-xl sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">Small action</p>
            <p className="mt-1 text-sm font-bold text-white">Big difference <span className="text-[#C6F36B]">↗</span></p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1320px] px-5 pb-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between border-t border-white/10 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 sm:text-xs">
          <span>Discover · Share · Reduce waste</span>
          <span>Good food deserves another plate.</span>
        </div>
      </div>
    </section>
  );
}
