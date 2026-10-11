/**
 * MessMate — Input Primitive
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-11 w-full min-h-touch rounded-md border bg-ivory px-3 py-2",
          "text-body-sm text-charcoal placeholder:text-muted",
          "transition-colors duration-fast",
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

Input.displayName = "Input";
