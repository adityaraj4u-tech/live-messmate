/**
 * MessMate — Footer
 */

"use client";

import * as React from "react";
import Link from "next/link";
import { brand } from "@/lib/tokens";
import { cn } from "@/lib/utils";

const footerLinks = [
  { href: "/discover", label: "Discover Food" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#for-the-mess", label: "For the Mess" },
  { href: "/#food-safety", label: "Food Safety" },
  { href: "/lookup", label: "Find Reservation" },
];

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-forest-deep text-ivory", className)}>
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <p className="text-label font-bold tracking-tight">{brand.name}</p>
            <p className="mt-2 text-body-sm text-ivory/80 max-w-sm leading-relaxed">
              {brand.tagline} Turning surplus campus food into dignified,
              affordable meals.
            </p>
          </div>

          <div>
            <p className="text-caption text-ivory/50 font-medium mb-3">
              Explore
            </p>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-label text-ivory/80 hover:text-ivory transition-colors min-h-touch inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ivory/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-caption text-ivory/50 space-y-0.5">
            <p>Currently serving {brand.campus}.</p>
            <p>More colleges coming soon.</p>
          </div>
          <Link
            href="/owner/login"
            className="text-caption text-ivory/40 hover:text-ivory/70 transition-colors min-h-touch inline-flex items-center"
          >
            Mess Owner Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
