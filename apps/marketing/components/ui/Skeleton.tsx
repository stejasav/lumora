import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rectangular" | "circular" | "arch" | "rounded";
}

export function Skeleton({
  className = "",
  variant = "rounded",
  ...props
}: SkeletonProps) {
  const variantClass =
    variant === "circular"
      ? "rounded-full"
      : variant === "arch"
      ? "rounded-t-full rounded-b-[var(--radius-lg)]"
      : variant === "rectangular"
      ? "rounded-none"
      : "rounded-[var(--radius-lg)]";

  return (
    <div
      aria-hidden="true"
      className={`skeleton-shimmer border border-[var(--border)]/40 ${variantClass} ${className}`}
      {...props}
    />
  );
}

export default Skeleton;
