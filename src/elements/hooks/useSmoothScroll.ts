// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import { useEffect } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let isRunning = false;
    let animId = 0;
    const ease = 0.085;

    function clamp(val: number, min: number, max: number): number {
      return Math.max(min, Math.min(val, max));
    }

    function getMaxScroll(): number {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    function update() {
      const diff = targetY - currentY;
      currentY += diff * ease;

      if (Math.abs(diff) > 0.5) {
        window.scrollTo(0, currentY);
        animId = requestAnimationFrame(update);
      } else {
        currentY = targetY;
        window.scrollTo(0, targetY);
        isRunning = false;
      }
    }

    function onWheel(e: WheelEvent) {
      if (e.ctrlKey) return;
      e.preventDefault();

      targetY += e.deltaY;
      targetY = clamp(targetY, 0, getMaxScroll());

      if (!isRunning) {
        isRunning = true;
        currentY = window.scrollY;
        animId = requestAnimationFrame(update);
      }
    }

    function onScroll() {
      if (!isRunning) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    }

    function onResize() {
      targetY = clamp(targetY, 0, getMaxScroll());
      currentY = clamp(currentY, 0, getMaxScroll());
    }

    function onLinkClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!link) return;

      // Skip mobile drawer links if desired, or handle them gracefully
      const isMobileDrawerLink = link.closest("#mobileDrawer");
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const rect = target.getBoundingClientRect();
        const smt = parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
        targetY = clamp(window.scrollY + rect.top - smt, 0, getMaxScroll());

        if (!isRunning) {
          isRunning = true;
          currentY = window.scrollY;
          animId = requestAnimationFrame(update);
        }

        try {
          history.pushState(null, "", href);
        } catch (_) {}

        if (isMobileDrawerLink) {
          const drawer = document.getElementById("mobileDrawer");
          const toggle = document.getElementById("menuToggle");
          if (drawer) drawer.classList.remove("open");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        }
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("click", onLinkClick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onLinkClick);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);
}
