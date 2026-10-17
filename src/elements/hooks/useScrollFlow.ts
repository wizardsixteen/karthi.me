// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import { useEffect } from "react";

export function useScrollFlow() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const glow = document.querySelector<HTMLElement>(".glow");
    const side = document.querySelector<HTMLElement>(".side");
    if (!glow || !side) return;

    let busy = false;
    let last = -1;

    function update() {
      busy = false;
      const vh = window.innerHeight;
      const rem = document.documentElement.scrollHeight - (window.scrollY + vh);
      let t = Math.min(1, Math.max(0, 1 - rem / (vh * 1.2)));
      t = Math.round(t * t * (3 - 2 * t) * 200) / 200;

      if (t === last) return;
      last = t;
      const v = t.toFixed(3);
      glow!.style.setProperty("--flow", v);
      side!.style.setProperty("--flow", v);
      glow!.classList.toggle("idle", t === 0);
    }

    function onScroll() {
      if (!busy) {
        busy = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
