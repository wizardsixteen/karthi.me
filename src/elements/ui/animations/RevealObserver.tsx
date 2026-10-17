// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const heroTitle = document.getElementById("hero-title");
    const $$ = (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(sel));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (heroTitle) heroTitle.classList.add("rise-in");
      document.querySelectorAll<HTMLElement>(".rise-item, .side .role, .side .promise, .side .side-ctas, .side .side-stats, .side .brands, #side-nav a, main .lbl, main .chip, main .big, main .txt, main .cta, main .acts, main .svc > div, main .row, main .cols > div, main .grp, main .tags span").forEach((el) => {
        el.classList.add("rise-in");
      });
      return;
    }

    function mark(list: HTMLElement[], step: number) {
      list.forEach((el) => {
        if ((el as any)._ri) return;
        (el as any)._ri = step;
        el.classList.add("rise-item");
      });
    }

    function show(el: HTMLElement, delay: number) {
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add("rise-in");
      setTimeout(() => {
        el.style.transitionDelay = "";
      }, delay + 1100);
    }

    /* 1. Element preparation */
    const side = $$(
      ".side .role, .side .promise, .side .side-ctas, .side .side-stats, .side .brands"
    );
    const nav = $$("#side-nav a");

    mark(side, 60);
    mark(nav, 45);

    /* Content area items */
    const items: HTMLElement[] = [];
    function add(sel: string, step: number) {
      const list = $$(sel);
      mark(list, step);
      list.forEach((el) => {
        if (!items.includes(el)) items.push(el);
      });
    }

    add("main .lbl, main .chip, main .big, main .txt, main .cta, main .acts", 80);
    add("main .stats > div", 70);
    add("main .svc > div", 60);
    add("main .row", 80);
    add("main .cols > div", 65);
    add("main .grp", 60);
    add("main .tags span", 40);

    items.sort((x, y) => (x.compareDocumentPosition(y) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

    function revealBatch(batch: HTMLElement[]) {
      let acc = 0;
      batch.forEach((el) => {
        show(el, Math.min(acc, 1400));
        acc += (el as any)._ri || 50;
      });
    }

    let pending = [...items];
    function release(batch: HTMLElement[]) {
      pending = pending.filter((el) => !batch.includes(el));
    }

    let io: IntersectionObserver | null = null;

    function startIntersectionObserver() {
      if (!("IntersectionObserver" in window)) {
        revealBatch(pending);
        pending = [];
        return;
      }

      io = new IntersectionObserver(
        (entries) => {
          const batch = entries
            .filter((e) => e.isIntersecting)
            .map((e) => e.target as HTMLElement);

          if (!batch.length) return;

          batch.sort((x, y) => (x.compareDocumentPosition(y) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

          batch.forEach((el) => {
            io?.unobserve(el);
          });

          release(batch);
          revealBatch(batch);
        },
        { threshold: 0, rootMargin: "0px 0px -6% 0px" }
      );

      pending.forEach((el) => {
        io?.observe(el);
      });
    }

    /* 2. Coordinated Choreography */
    const timer = setTimeout(() => {
      if (heroTitle) {
        heroTitle.classList.add("rise-in");
      }

      side.forEach((el, i) => {
        show(el, 250 + i * 65);
      });

      const navDelayStart = 600;
      nav.forEach((el, i) => {
        show(el, navDelayStart + i * 45);
      });

      const vh = window.innerHeight || 800;
      const initialVisible = pending.filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < vh * 0.95 && rect.bottom > 0;
      });

      if (initialVisible.length > 0) {
        release(initialVisible);
        initialVisible.forEach((el, i) => {
          show(el, navDelayStart + i * 60);
        });
      }

      startIntersectionObserver();
    }, 300);

    return () => {
      clearTimeout(timer);
      if (io) io.disconnect();
    };
  }, []);

  return null;
}
