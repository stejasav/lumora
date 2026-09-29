import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-xl",
    "font-medium",
    "transition-all",
    "duration-200",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[var(--primary)]",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "cursor-pointer",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--primary)] text-surface hover:bg-[var(--primary-hover)]",

        secondary:
          "border border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--surface-alt)]",

        ghost:
          "bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-alt)]",
      },

      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: cn(
        buttonVariants({ variant, size }),
        (children.props as { className?: string }).className,
        className
      ),
      ...props,
    });
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}