// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;

    const d = dotRef.current;
    const r = ringRef.current;
    if (!d || !r) return;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    const k = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.18;
    let animId = 0;

    function onMouseMove(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
      if (!d!.classList.contains("on")) {
        rx = x;
        ry = y;
        d!.classList.add("on");
        r!.classList.add("on");
      }
      d!.style.transform = `translate(${x}px,${y}px)`;
      const target = e.target as HTMLElement;
      r!.classList.toggle("h", !!(target.closest && target.closest("a,button,.btn")));
    }

    function onMouseLeave() {
      d?.classList.remove("on");
      r?.classList.remove("on");
    }

    function onMouseDown() {
      r?.classList.add("d");
    }

    function onMouseUp() {
      r?.classList.remove("d");
    }

    function loop() {
      rx += (x - rx) * k;
      ry += (y - ry) * k;
      if (r) {
        r.style.transform = `translate(${rx}px,${ry}px)`;
      }
      animId = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
    </>
  );
}
