/**
 * MessMate — Field Primitive
 * Consistent form field layout with label, control, hint, and error.
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
}

export function Field({
  label,
  htmlFor,
  required,
  optional,
  hint,
  error,
  className,
  children,
  ...props
}: FieldProps) {
  const describedBy = error
    ? `${htmlFor}-error`
    : hint
      ? `${htmlFor}-hint`
      : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      {label && (
        <Label htmlFor={htmlFor} required={required} optional={optional}>
          {label}
        </Label>
      )}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            id: htmlFor,
            "aria-describedby": describedBy,
            error: !!error,
          })
        : children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          className="text-caption text-red-600"
          role="alert"
        >
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-caption text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
