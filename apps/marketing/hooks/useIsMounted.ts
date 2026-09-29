"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` once the component has mounted on the client.
 * Use this to gate content behind a skeleton until React hydration is complete.
 */
export function useIsMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
