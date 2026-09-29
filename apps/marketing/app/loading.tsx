import React from "react";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-[1450px] px-6 py-12 space-y-20 lg:px-10">
      {/* ── Hero Skeleton ── */}
      <div className="flex flex-col items-center text-center space-y-6 pt-10">
        <Skeleton className="h-7 w-48 rounded-full" />
        <Skeleton className="h-12 w-3/4 max-w-2xl rounded-xl" />
        <Skeleton className="h-5 w-1/2 max-w-lg rounded-md" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-11 w-36 rounded-xl" />
          <Skeleton className="h-11 w-32 rounded-xl" />
        </div>
        {/* Mockup dashboard skeleton */}
        <Skeleton className="w-full max-w-4xl h-[420px] rounded-2xl mt-8" />
      </div>

      {/* ── Feature Cards Skeleton ── */}
      <div className="space-y-8">
        <div className="flex flex-col items-center space-y-3">
          <Skeleton className="h-5 w-40 rounded-full" />
          <Skeleton className="h-10 w-96 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[360px] w-full rounded-[var(--radius-xl)]" />
          ))}
        </div>
      </div>

      {/* ── Testimonials Skeleton ── */}
      <div className="space-y-8">
        <div className="flex flex-col items-center space-y-3">
          <Skeleton className="h-5 w-36 rounded-full" />
          <Skeleton className="h-10 w-80 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex gap-4">
            <Skeleton variant="arch" className="w-48 h-64 flex-shrink-0" />
            <Skeleton className="flex-1 h-64 rounded-[var(--radius-xl)]" />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Skeleton variant="arch" className="w-48 h-36 self-end" />
            <Skeleton className="w-full h-44 rounded-[var(--radius-xl)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
