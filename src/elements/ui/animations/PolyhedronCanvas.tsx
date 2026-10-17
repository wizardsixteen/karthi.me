// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import { useEffect, useRef } from "react";

export function PolyhedronCanvas() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const P = pathRef.current;
    const SVG = svgRef.current;
    if (!P || !SVG) return;

    const phi = (1 + Math.sqrt(5)) / 2;
    const N = 30;
    const R = 17;

    type Point3D = [number, number, number];
    type Edge = [Point3D, Point3D];

    function mk(v: Point3D[], e: Edge[]): Edge[] {
      let m = 0;
      v.forEach((p) => {
        m = Math.max(m, Math.hypot(p[0], p[1], p[2]));
      });
      function sc(p: Point3D): Point3D {
        return [p[0] / m, p[1] / m, p[2] / m];
      }
      const o: Edge[] = e.map((q) => [sc(q[0]), sc(q[1])]);
      return Array.from({ length: N }, (_, i) => o[i % o.length]);
    }

    function byDist(v: Point3D[], d: number): Edge[] {
      const e: Edge[] = [];
      for (let i = 0; i < v.length; i++) {
        for (let j = i + 1; j < v.length; j++) {
          const dd = Math.hypot(v[i][0] - v[j][0], v[i][1] - v[j][1], v[i][2] - v[j][2]);
          if (Math.abs(dd - d) < 1e-6) e.push([v[i], v[j]]);
        }
      }
      return e;
    }

    function byIdx(v: Point3D[], ix: [number, number][]): Edge[] {
      return ix.map((a) => [v[a[0]], v[a[1]]]);
    }

    const cv: Point3D[] = [];
    const s1 = [1, -1];
    s1.forEach((x) => {
      s1.forEach((y) => {
        s1.forEach((z) => {
          cv.push([x, y, z]);
        });
      });
    });

    const ov: Point3D[] = [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ];

    const iv: Point3D[] = [];
    [1, -1].forEach((a) => {
      [1, -1].forEach((b) => {
        iv.push([0, a, b * phi]);
        iv.push([a, b * phi, 0]);
        iv.push([b * phi, 0, a]);
      });
    });

    const pv: Point3D[] = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, -1, 1],
      [-1, -1, 1],
      [0, 1.2, 0],
    ];

    const tv: Point3D[] = [];
    for (let k = 0; k < 3; k++) {
      const a = (k * 2 * Math.PI) / 3 + Math.PI / 2;
      const x = 1.2 * Math.cos(a);
      const z = 1.2 * Math.sin(a);
      tv.push([x, 1, z]);
      tv.push([x, -1, z]);
    }

    const shapes: Edge[][] = [
      mk(cv, byDist(cv, 2)),
      mk(ov, byDist(ov, Math.SQRT2)),
      mk(
        pv,
        byIdx(pv, [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 0],
          [4, 0],
          [4, 1],
          [4, 2],
          [4, 3],
        ])
      ),
      mk(iv, byDist(iv, 2)),
      mk(
        tv,
        byIdx(tv, [
          [0, 2],
          [2, 4],
          [4, 0],
          [1, 3],
          [3, 5],
          [5, 1],
          [0, 1],
          [2, 3],
          [4, 5],
        ])
      ),
    ];

    const HOLD = 2000;
    const MORPH = 1900;
    const CYC = HOLD + MORPH;

    function dist(a: Point3D, b: Point3D): number {
      return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
    }

    function hung(c: number[][]): number[] {
      const n = c.length;
      const u: number[] = new Array(n + 1).fill(0);
      const v: number[] = new Array(n + 1).fill(0);
      const pp: number[] = new Array(n + 1).fill(0);
      const way: number[] = new Array(n + 1).fill(0);

      for (let i = 1; i <= n; i++) {
        pp[0] = i;
        let j0 = 0;
        const minv: number[] = new Array(n + 1).fill(Infinity);
        const used: boolean[] = new Array(n + 1).fill(false);

        do {
          used[j0] = true;
          const i0 = pp[j0];
          let delta = Infinity;
          let j1 = 0;

          for (let j = 1; j <= n; j++) {
            if (!used[j]) {
              const cur = c[i0 - 1][j - 1] - u[i0] - v[j];
              if (cur < minv[j]) {
                minv[j] = cur;
                way[j] = j0;
              }
              if (minv[j] < delta) {
                delta = minv[j];
                j1 = j;
              }
            }
          }

          for (let j = 0; j <= n; j++) {
            if (used[j]) {
              u[pp[j]] += delta;
              v[j] -= delta;
            } else {
              minv[j] -= delta;
            }
          }
          j0 = j1;
        } while (pp[j0] !== 0);

        do {
          const jj = way[j0];
          pp[j0] = pp[jj];
          j0 = jj;
        } while (j0);
      }

      const res: number[] = [];
      for (let j = 1; j <= n; j++) res[pp[j] - 1] = j - 1;
      return res;
    }

    function oc(a: Edge, b: Edge): number {
      return Math.min(dist(a[0], b[0]) + dist(a[1], b[1]), dist(a[0], b[1]) + dist(a[1], b[0]));
    }

    const pairs = shapes.map((A, k) => {
      const B = shapes[(k + 1) % shapes.length];
      const c = A.map((a) => B.map((b) => oc(a, b)));
      const r = hung(c);
      return A.map((a, i) => {
        let b = B[r[i]];
        if (dist(a[0], b[1]) + dist(a[1], b[0]) < dist(a[0], b[0]) + dist(a[1], b[1])) {
          b = [b[1], b[0]];
        }
        return [a, b] as [Edge, Edge];
      });
    });

    function ease(p: number): number {
      return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    }

    let lastShapeIdx = -1;
    let lastPos = { x: -999, y: -999 };

    function reposition() {
      if (!SVG) return;
      const side = SVG.parentElement;
      if (!side) return;

      const sideRect = side.getBoundingClientRect();
      const sw = sideRect.width;
      const sh = sideRect.height;
      const isMobile = window.innerWidth < 900;

      const shapeSize = isMobile ? Math.max(180, Math.min(250, sw * 0.55)) : Math.max(280, Math.min(380, sw * 0.6));
      SVG.style.width = `${shapeSize}px`;
      const ew = shapeSize;
      const eh = shapeSize;

      const minX = -10;
      const maxX = Math.max(minX + 20, sw - ew + 30);

      const navEl = document.getElementById("side-nav") || side.querySelector("nav");
      const navBottom = navEl ? navEl.getBoundingClientRect().bottom - sideRect.top : 40;

      const minY = Math.max(10, navBottom - 10);
      const maxY = Math.max(minY + 40, sh - eh + 30);

      let rx = 0;
      let ry = 0;
      let attempts = 0;
      do {
        rx = minX + Math.random() * (maxX - minX);
        ry = minY + Math.random() * (maxY - minY);
        const dx = rx - lastPos.x;
        const dy = ry - lastPos.y;
        const distDelta = Math.sqrt(dx * dx + dy * dy);
        attempts++;
        if (distDelta >= 100 || attempts >= 12) break;
      } while (true);

      const isInitial = lastPos.x === -999;
      lastPos = { x: rx, y: ry };

      if (isInitial) {
        SVG.style.transition = "none";
        SVG.style.left = `${rx}px`;
        SVG.style.top = `${ry}px`;
        SVG.style.right = "auto";
        void (SVG as unknown as HTMLElement).offsetWidth;
      } else {
        SVG.style.transition =
          "left 2.4s cubic-bezier(0.4, 0, 0.2, 1), top 2.4s cubic-bezier(0.4, 0, 0.2, 1), width 2s cubic-bezier(0.4, 0, 0.2, 1)";
        SVG.style.left = `${rx}px`;
        SVG.style.top = `${ry}px`;
        SVG.style.right = "auto";
      }
    }

    function draw(t: number) {
      if (!P) return;
      const i = Math.floor(t / CYC) % shapes.length;
      const r = t % CYC;
      const p = r < HOLD ? 0 : ease((r - HOLD) / MORPH);

      if (i !== lastShapeIdx) {
        lastShapeIdx = i;
        reposition();
      }

      const Q = pairs[i];
      const ay = t * 0.00035;
      const ax = 0.55;
      const ca = Math.cos(ay);
      const sa = Math.sin(ay);
      const cx = Math.cos(ax);
      const sx = Math.sin(ax);
      let d = "";

      function pr(a: Point3D, b: Point3D): string {
        const x = a[0] + (b[0] - a[0]) * p;
        const y = a[1] + (b[1] - a[1]) * p;
        const z = a[2] + (b[2] - a[2]) * p;
        const x1 = x * ca + z * sa;
        const z1 = -x * sa + z * ca;
        const y2 = y * cx - z1 * sx;
        return `${(24 + R * x1).toFixed(2)} ${(24 + R * y2).toFixed(2)}`;
      }

      for (let k = 0; k < N; k++) {
        d += `M${pr(Q[k][0][0], Q[k][1][0])}L${pr(Q[k][0][1], Q[k][1][1])}`;
      }
      P.setAttribute("d", d);
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animId = 0;
    let startTimestamp = 0;

    function loop(t: number) {
      if (!startTimestamp) startTimestamp = t;
      draw(t - startTimestamp);
      animId = requestAnimationFrame(loop);
    }

    const timer = setTimeout(() => {
      reposition();
      draw(0);
      if (SVG) SVG.classList.add("on");
      if (!reduced) {
        animId = requestAnimationFrame(loop);
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="deco"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth=".12"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        id="mp"
        d="M24 5 41 14.5v19L24 43 7 33.5v-19zM7 14.5 24 24l17-9.5M24 24v19M15.5 9.7l17 9.5M32.5 9.7l-17 9.5M7 24l17 9.5L41 24M15.5 38.2V19M32.5 38.2V19"
      />
    </svg>
  );
}
