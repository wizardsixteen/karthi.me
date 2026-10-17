// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import { useEffect, useState } from "react";

export function useCursorPhysics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;

    setEnabled(true);
    document.documentElement.classList.add("cc");

    return () => {
      document.documentElement.classList.remove("cc");
    };
  }, []);

  return { enabled };
}
