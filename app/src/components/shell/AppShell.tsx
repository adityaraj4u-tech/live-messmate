/**
 * MessMate — App Shell
 * Global layout: FloatingNav + main + Footer.
 */

import * as React from "react";
import { FloatingNav } from "./FloatingNav";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

export interface AppShellProps {
  children: React.ReactNode;
  /** Hide nav/footer for focused flows (e.g. owner login) */
  hideChrome?: boolean;
  className?: string;
}

export function AppShell({
  children,
  hideChrome = false,
  className,
}: AppShellProps) {
  return (
    <div className={cn("min-h-dvh flex flex-col bg-ivory", className)}>
      {!hideChrome && <FloatingNav />}
      <main className={cn("flex-1", !hideChrome && "pt-20")}>{children}</main>
      {!hideChrome && <Footer />}
    </div>
  );
}
