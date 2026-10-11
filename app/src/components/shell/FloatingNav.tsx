/**
 * MessMate — Floating Navigation
 */

"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { brand } from "@/lib/tokens";
import { cn } from "@/lib/utils";

const links = [
  { href: "/discover", label: "Discover Food" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#for-the-mess", label: "For the Mess" },
];

export function FloatingNav({ className }: { className?: string }) {
  const router = useRouter();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-shadow duration-normal",
        scrolled && "shadow-nav",
        className
      )}
    >
      <div className="mx-auto max-w-container px-4 md:px-8 pt-3">
        <nav
          className={cn(
            "flex items-center justify-between gap-4 rounded-xl border border-border bg-ivory/90 backdrop-blur-md px-4 py-2.5 md:px-5",
            scrolled && "shadow-nav"
          )}
          aria-label="Main"
        >
          <Link
            href="/"
            className="text-label font-bold text-forest tracking-tight shrink-0"
          >
            {brand.name}
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label text-charcoal hover:text-forest transition-colors min-h-touch flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => router.push("/discover")}
            >
              Find Food
            </Button>
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center h-10 w-10 min-h-touch min-w-touch rounded-md text-forest hover:bg-sage/50 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="md:hidden mt-2 rounded-xl border border-border bg-ivory/95 backdrop-blur-md p-4 shadow-nav">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-left text-label text-charcoal hover:text-forest py-2.5 px-2 rounded-md hover:bg-sage/40 transition-colors min-h-touch"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                fullWidth
                className="mt-2"
                onClick={() => {
                  router.push("/discover");
                  setMobileOpen(false);
                }}
              >
                Find Food
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
