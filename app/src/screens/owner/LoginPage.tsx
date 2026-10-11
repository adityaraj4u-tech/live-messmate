/**
 * MessMate — Mess Owner Login
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Input, Card } from "@/components/ui";
import { brand } from "@/lib/tokens";
import { cn } from "@/lib/utils";

export function LoginPage({ className }: { className?: string }) {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    router.push("/owner");
  }

  return (
    <div className={cn("min-h-dvh bg-ivory flex flex-col", className)}>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="mb-8 text-center">
          <p className="text-label font-semibold text-forest tracking-wide">
            {brand.name}
          </p>
          <h1 className="mt-2 text-heading text-forest font-semibold">
            Mess Owner Login
          </h1>
          <p className="mt-1.5 text-caption text-muted">
            Currently serving {brand.campus}
          </p>
        </div>

        <Card padding="lg" className="w-full max-w-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Field label="Email or Phone" htmlFor="owner-email" required>
              <Input
                id="owner-email"
                type="text"
                autoComplete="username"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field label="Password" htmlFor="owner-password" required>
              <Input
                id="owner-password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <Button type="submit" fullWidth size="lg" loading={loading}>
              Sign In
            </Button>
          </form>
          <p className="mt-5 text-center text-caption text-muted">
            Forgot password? Contact platform admin.
          </p>
        </Card>
      </div>
    </div>
  );
}
