"use client";

import { useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui";
import { StatGrid } from "@/components";
import { sampleStats } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export function ForTheMess({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <section id="for-the-mess" className={cn("py-16 md:py-24 bg-sage/30", className)}>
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-heading text-forest font-semibold">
              Built for mess owners
            </h2>
            <p className="mt-3 text-body-sm text-muted leading-relaxed max-w-md">
              List today’s surplus in under a minute. Set price, portions, and
              pickup window. Track reservations as they come in.
            </p>
            <Button
              size="lg"
              className="mt-6"
              onClick={() => router.push("/owner/login")}
            >
              List Today’s Surplus
            </Button>
          </div>

          <Card padding="lg" className="shadow-elevated">
            <p className="text-caption text-muted font-medium mb-4">
              Dashboard preview
            </p>
            <StatGrid metrics={sampleStats} />
          </Card>
        </div>
      </div>
    </section>
  );
}
