/**
 * MessMate — Textarea Primitive
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[96px] w-full rounded-md border bg-ivory px-3 py-2.5",
          "text-body-sm text-charcoal placeholder:text-muted",
          "transition-colors duration-fast resize-y",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-forest",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-500 focus-visible:outline-red-500"
            : "border-border hover:border-forest/30",
          className
        )}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
