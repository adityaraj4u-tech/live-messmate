/**
 * MessMate — Create Listing Page
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MultiStepListingForm } from "@/components";
import { cn } from "@/lib/utils";

export function CreateListingPage({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  return (
    <div className={cn("min-h-dvh bg-ivory", className)}>
      <div className="container py-8 md:py-10">
        <header className="mb-8">
          <h1 className="text-heading text-forest font-semibold">
            Create Listing
          </h1>
          <p className="mt-1 text-caption text-muted">
            List today’s surplus in under a minute.
          </p>
        </header>

        <MultiStepListingForm
          loading={loading}
          onCancel={() => router.push("/owner")}
          onPublish={async () => {
            setLoading(true);
            await new Promise((r) => setTimeout(r, 600));
            router.push("/owner/listings");
          }}
        />
      </div>
    </div>
  );
}
