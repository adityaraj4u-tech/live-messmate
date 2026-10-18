/**
 * MessMate — Floating Navigation
 * Responsive navigation with direct admin sign-in access.
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
  const menuRef = React.useRef<HTMLDivElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  React.useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-shadow duration-normal", scrolled && "shadow-nav", className)}>
      <div className="mx-auto max-w-container px-4 pt-3 md:px-8">
        <nav className={cn("flex items-center justify-between gap-4 rounded-2xl border border-border bg-ivory/90 px-4 py-2.5 backdrop-blur-xl md:px-5", scrolled && "shadow-nav")} aria-label="Main">
          <Link href="/" className="flex shrink-0 items-center gap-2 rounded-sm text-label font-extrabold tracking-tight text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-forest text-sm text-lime" aria-hidden="true">M</span>
            {brand.name}
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="flex min-h-touch items-center rounded-sm text-label text-charcoal transition-colors hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/login" className="hidden rounded-lg px-3 py-2 text-xs font-bold text-forest transition hover:bg-sage/50 sm:inline-flex">Admin login</Link>
            <Button size="sm" className="hidden sm:inline-flex" onClick={() => router.push("/discover")}>Find Food</Button>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-10 w-10 min-h-touch min-w-touch items-center justify-center rounded-md text-forest transition-colors hover:bg-sage/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div id="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Mobile navigation" className="animate-in slide-in-from-top-2 mt-2 rounded-2xl border border-border bg-ivory/95 p-4 shadow-nav backdrop-blur-xl">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="min-h-touch rounded-md px-2 py-2.5 text-left text-label text-charcoal transition-colors hover:bg-sage/40 hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href="/admin/login" className="min-h-touch rounded-md px-2 py-2.5 text-left text-label font-semibold text-forest hover:bg-sage/40" onClick={() => setMobileOpen(false)}>Admin login ↗</Link>
              <Button fullWidth className="mt-2" onClick={() => { router.push("/discover"); setMobileOpen(false); }}>Find Food</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
