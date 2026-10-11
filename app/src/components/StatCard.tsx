/**
 * MessMate — StatCard / StatGrid
 */

import * as React from "react";
import { Card } from "@/components/ui";
import type { StatMetric } from "@/types";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  metric: StatMetric;
  className?: string;
}

export function StatCard({ metric, className }: StatCardProps) {
  return (
    <Card padding="md" className={cn("flex flex-col gap-1", className)}>
      <p className="text-caption text-muted font-medium">{metric.label}</p>
      <p className="text-heading text-forest font-semibold tabular-nums leading-none mt-1">
        {metric.value}
      </p>
      {metric.secondary && (
        <p className="text-caption text-muted mt-1.5">{metric.secondary}</p>
      )}
    </Card>
  );
}

export interface StatGridProps {
  metrics: StatMetric[];
  className?: string;
}

export function StatGrid({ metrics, className }: StatGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4",
        className
      )}
    >
      {metrics.map((m) => (
        <StatCard key={m.label} metric={m} />
      ))}
    </div>
  );
}
