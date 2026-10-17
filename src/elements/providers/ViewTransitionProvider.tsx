// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import React, { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

interface ViewTransitionProviderProps {
  children: React.ReactNode;
}

/**
 * Global ViewTransitionProvider for Next.js App Router.
 * Employs document-level event delegation to intercept internal same-origin link clicks,
 * orchestrating native document.startViewTransition() animations with zero boilerplate on pages/links.
 */
export function ViewTransitionProvider({ children }: ViewTransitionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const transitionResolverRef = useRef<(() => void) | null>(null);

  // When pathname changes after navigation, resolve the ongoing view transition
  useEffect(() => {
    if (transitionResolverRef.current) {
      transitionResolverRef.current();
      transitionResolverRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Verify browser supports native View Transitions API
    const supportsViewTransition =
      "startViewTransition" in document &&
      typeof (document as unknown as { startViewTransition?: unknown }).startViewTransition === "function";

    if (!supportsViewTransition) return;

    const handleDocumentClick = (e: MouseEvent) => {
      // 1. Ignore right clicks, modifier keys (Cmd/Ctrl/Shift/Alt for new tabs/windows) or already handled events
      if (
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      // 2. Resolve nearest anchor element
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor || !anchor.href) return;

      // 3. Exclude external links, blank targets, downloads, or anchor hash jumps
      const rawHref = anchor.getAttribute("href") || "";
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        rawHref.startsWith("#") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:")
      ) {
        return;
      }

      // 4. Verify same-origin internal destination
      let destUrl: URL;
      try {
        destUrl = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }

      if (destUrl.origin !== window.location.origin) return;

      // 5. Exclude same-page redundant navigation (e.g. clicking current route link)
      if (
        destUrl.pathname === window.location.pathname &&
        destUrl.search === window.location.search
      ) {
        return;
      }

      // 6. Intercept navigation and orchestrate View Transition
      e.preventDefault();

      const nextUrl = `${destUrl.pathname}${destUrl.search}${destUrl.hash}`;

      (document as unknown as {
        startViewTransition: (callback: () => Promise<void>) => unknown;
      }).startViewTransition(() => {
        return new Promise<void>((resolve) => {
          transitionResolverRef.current = resolve;
          router.push(nextUrl);

          // Failsafe timeout to prevent animation freeze if navigation takes too long or network stalls
          window.setTimeout(() => {
            if (transitionResolverRef.current) {
              transitionResolverRef.current();
              transitionResolverRef.current = null;
            }
          }, 2500);
        });
      });
    };

    // Capture browser back/forward history navigation via popstate
    const handlePopState = () => {
      if (
        "startViewTransition" in document &&
        typeof (document as unknown as { startViewTransition?: unknown }).startViewTransition === "function"
      ) {
        (document as unknown as {
          startViewTransition: (callback: () => Promise<void>) => unknown;
        }).startViewTransition(() => {
          return new Promise<void>((resolve) => {
            transitionResolverRef.current = resolve;
            window.setTimeout(() => {
              if (transitionResolverRef.current) {
                transitionResolverRef.current();
                transitionResolverRef.current = null;
              }
            }, 1000);
          });
        });
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  return <>{children}</>;
}
