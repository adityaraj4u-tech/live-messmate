/**
 * MessMate — Label Primitive
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, optional, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn("text-label text-charcoal select-none", className)}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-0.5 text-forest" aria-hidden="true">
            *
          </span>
        )}
        {optional && (
          <span className="ml-1.5 text-caption text-muted font-normal">
            (optional)
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";
