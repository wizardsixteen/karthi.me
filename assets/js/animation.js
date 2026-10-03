/* ==========================================================================
   Animations & Physics JavaScript Module
   Encapsulates:
   1. 3D Polyhedron Mathematical Solid Simulation (#mp SVG)
   2. Staggered Entrance Choreography & IntersectionObserver Reveals
   3. Inertial Momentum Physics Scrolling (Wheel & Anchor Links)
   4. Dynamic Bottom Ambient Glow & --flow Lighting System
   ========================================================================== */

(function () {
  "use strict";

  window.Portfolio = window.Portfolio || {};

  Portfolio.animations = {
    _initialized: false,

    /* ------------------------------------------------------------------------
       1. 3D Polyhedron Mathematical Solid Simulation
       ------------------------------------------------------------------------ */
    initPolyhedron: function () {
      var P = document.getElementById("mp");
      if (!P) return;
      var phi = (1 + Math.sqrt(5)) / 2,
        N = 30,
        R = 17;
      function mk(v, e) {
        var m = 0;
        v.forEach(function (p) {
          m = Math.max(m, Math.hypot(p[0], p[1], p[2]));
        });
        function sc(p) {
          return [p[0] / m, p[1] / m, p[2] / m];
        }
        var o = e.map(function (q) {
          return [sc(q[0]), sc(q[1])];
        });
        return Array.apply(null, Array(N)).map(function (_, i) {
          return o[i % o.length];
        });
      }
      function byDist(v, d) {
        var e = [];
        for (var i = 0; i < v.length; i++)
          for (var j = i + 1; j < v.length; j++) {
          var dd = Math.hypot(
            v[i][0] - v[j][0],
            v[i][1] - v[j][1],
            v[i][2] - v[j][2],
          );
          if (Math.abs(dd - d) < 1e-6) e.push([v[i], v[j]]);
        }
        return e;
      }
      function byIdx(v, ix) {
        return ix.map(function (a) {
          return [v[a[0]], v[a[1]]];
        });
      }
      var cv = [],
        s1 = [1, -1];
      s1.forEach(function (x) {
        s1.forEach(function (y) {
          s1.forEach(function (z) {
            cv.push([x, y, z]);
          });
        });
      });
      var ov = [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1],
      ];
      var iv = [];
      [1, -1].forEach(function (a) {
        [1, -1].forEach(function (b) {
          iv.push([0, a, b * phi]);
          iv.push([a, b * phi, 0]);
          iv.push([b * phi, 0, a]);
        });
      });
      var pv = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, -1, 1],
        [-1, -1, 1],
        [0, 1.2, 0],
      ];
      var tv = [];
      for (var k = 0; k < 3; k++) {
        var a = (k * 2 * Math.PI) / 3 + Math.PI / 2,
          x = 1.2 * Math.cos(a),
          z = 1.2 * Math.sin(a);
        tv.push([x, 1, z]);
        tv.push([x, -1, z]);
      }
      var shapes = [
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
          ]),
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
          ]),
        ),
      ];
      var HOLD = 2000,
        MORPH = 1900,
        CYC = HOLD + MORPH;
      function dist(a, b) {
        return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      }
      function hung(c) {
        var n = c.length,
          u = [],
          v = [],
          pp = [],
          way = [],
          i,
          j;
        for (i = 0; i <= n; i++) {
          u[i] = 0;
          v[i] = 0;
          pp[i] = 0;
          way[i] = 0;
        }
        for (i = 1; i <= n; i++) {
          pp[0] = i;
          var j0 = 0,
            minv = [],
            used = [];
          for (j = 0; j <= n; j++) {
            minv[j] = Infinity;
            used[j] = false;
          }
          do {
            used[j0] = true;
            var i0 = pp[j0],
              delta = Infinity,
              j1 = 0;
            for (j = 1; j <= n; j++)
              if (!used[j]) {
                var cur = c[i0 - 1][j - 1] - u[i0] - v[j];
                if (cur < minv[j]) {
                  minv[j] = cur;
                  way[j] = j0;
                }
                if (minv[j] < delta) {
                  delta = minv[j];
                  j1 = j;
                }
              }
            for (j = 0; j <= n; j++) {
              if (used[j]) {
                u[pp[j]] += delta;
                v[j] -= delta;
              } else minv[j] -= delta;
            }
            j0 = j1;
          } while (pp[j0] !== 0);
          do {
            var jj = way[j0];
            pp[j0] = pp[jj];
            j0 = jj;
          } while (j0);
        }
        var res = [];
        for (j = 1; j <= n; j++) res[pp[j] - 1] = j - 1;
        return res;
      }
      function oc(a, b) {
        return Math.min(
          dist(a[0], b[0]) + dist(a[1], b[1]),
          dist(a[0], b[1]) + dist(a[1], b[0]),
        );
      }
      var pairs = shapes.map(function (A, k) {
        var B = shapes[(k + 1) % shapes.length];
        var c = A.map(function (a) {
          return B.map(function (b) {
            return oc(a, b);
          });
        });
        var r = hung(c);
        return A.map(function (a, i) {
          var b = B[r[i]];
          if (
            dist(a[0], b[1]) + dist(a[1], b[0]) <
            dist(a[0], b[0]) + dist(a[1], b[1])
          )
            b = [b[1], b[0]];
          return [a, b];
        });
      });
      function ease(p) {
        return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      }
      /* Free Roaming across the side column */
      var SVG = P.closest("svg");
      var lastShapeIdx = -1;
      var lastPos = { x: -999, y: -999 };
      function reposition() {
        if (!SVG) return;
        var side = SVG.parentElement;
        if (!side) return;

        var sideRect = side.getBoundingClientRect();
        var sw = sideRect.width;
        var sh = sideRect.height;
        var isMobile = window.innerWidth < 900;

        var shapeSize;
        if (isMobile) {
          shapeSize = Math.max(180, Math.min(250, sw * 0.55));
        } else {
          shapeSize = Math.max(280, Math.min(380, sw * 0.6));
        }

        SVG.style.width = shapeSize + "px";
        var ew = shapeSize;
        var eh = shapeSize;

        var minX = -10;
        var maxX = Math.max(minX + 20, sw - ew + 30);

        var navEl =
          document.getElementById("side-nav") || side.querySelector("nav");
        var navBottom = navEl
          ? navEl.getBoundingClientRect().bottom - sideRect.top
          : 40;

        var minY = Math.max(10, navBottom - 10);
        var maxY = Math.max(minY + 40, sh - eh + 30);

        var rx, ry;
        var attempts = 0;
        do {
          rx = minX + Math.random() * (maxX - minX);
          ry = minY + Math.random() * (maxY - minY);
          var dx = rx - lastPos.x;
          var dy = ry - lastPos.y;
          var distDelta = Math.sqrt(dx * dx + dy * dy);
          attempts++;
        } while (distDelta < 100 && attempts < 12);

        var isInitial = lastPos.x === -999;
        lastPos = { x: rx, y: ry };

        if (isInitial) {
          SVG.style.transition = "none";
          SVG.style.left = rx + "px";
          SVG.style.top = ry + "px";
          SVG.style.right = "auto";
          void SVG.offsetWidth;
        } else {
          SVG.style.transition =
            "left 2.4s cubic-bezier(0.4, 0, 0.2, 1), top 2.4s cubic-bezier(0.4, 0, 0.2, 1), width 2s cubic-bezier(0.4, 0, 0.2, 1)";
          SVG.style.left = rx + "px";
          SVG.style.top = ry + "px";
          SVG.style.right = "auto";
        }
      }
      function draw(t) {
        var i = Math.floor(t / CYC) % shapes.length,
          r = t % CYC,
          p = r < HOLD ? 0 : ease((r - HOLD) / MORPH);
        if (i !== lastShapeIdx) {
          lastShapeIdx = i;
          reposition();
        }
        var Q = pairs[i];
        var ay = t * 0.00035,
          ax = 0.55,
          ca = Math.cos(ay),
          sa = Math.sin(ay),
          cx = Math.cos(ax),
          sx = Math.sin(ax),
          d = "";
        function pr(a, b) {
          var x = a[0] + (b[0] - a[0]) * p,
            y = a[1] + (b[1] - a[1]) * p,
            z = a[2] + (b[2] - a[2]) * p;
          var x1 = x * ca + z * sa,
            z1 = -x * sa + z * ca,
            y2 = y * cx - z1 * sx;
          return (24 + R * x1).toFixed(2) + " " + (24 + R * y2).toFixed(2);
        }
        for (var k = 0; k < N; k++) {
          d +=
            "M" +
            pr(Q[k][0][0], Q[k][1][0]) +
            "L" +
            pr(Q[k][0][1], Q[k][1][1]);
        }
        P.setAttribute("d", d);
      }

      var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      var startTimestamp = 0;
      function loop(t) {
        if (!startTimestamp) startTimestamp = t;
        draw(t - startTimestamp);
        requestAnimationFrame(loop);
      }

      // Appears and animates only 1500ms after load
      setTimeout(function () {
        reposition();
        draw(0);
        if (SVG) SVG.classList.add("on");
        if (!reduced) {
          requestAnimationFrame(loop);
        }
      }, 1500);
    },

    /* ------------------------------------------------------------------------
       2. Staggered Entrance Choreography & IntersectionObserver
       ------------------------------------------------------------------------ */
    initReveal: function () {
      var heroTitle = document.getElementById("hero-title");
      var $$ = function (sel) {
        return Array.prototype.slice.call(document.querySelectorAll(sel));
      };

      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (heroTitle) heroTitle.classList.add("rise-in");
        return;
      }

      function mark(list, step) {
        list.forEach(function (el) {
          if (el._ri) return;
          el._ri = step;
          el.classList.add("rise-item");
        });
      }

      function show(el, delay) {
        el.style.transitionDelay = delay + "ms";
        el.classList.add("rise-in");
        setTimeout(function () {
          el.style.transitionDelay = "";
        }, delay + 1100);
      }

      /* 1. Elements preparation */
      var side = $$(
        ".side .role, .side .promise, .side .side-ctas, .side .side-stats, .side .brands",
      );
      var nav = $$("#side-nav a");

      mark(side, 60);
      mark(nav, 45);

      /* Content area items */
      var items = [];
      function add(sel, step) {
        var list = $$(sel);
        mark(list, step);
        list.forEach(function (el) {
          if (items.indexOf(el) < 0) items.push(el);
        });
      }
      add(
        "main .lbl, main .chip, main .big, main .txt, main .cta, main .acts",
        80,
      );
      add("main .stats > div", 70);
      add("main .svc > div", 60);
      add("main .row", 80);
      add("main .cols > div", 65);
      add("main .grp", 60);
      add("main .tags span", 40);
      items.sort(function (x, y) {
        return x.compareDocumentPosition(y) & 4 ? -1 : 1;
      });

      function revealBatch(batch) {
        var acc = 0;
        batch.forEach(function (el) {
          show(el, Math.min(acc, 1400));
          acc += el._ri;
        });
      }

      var pending = items.slice();
      function release(batch) {
        pending = pending.filter(function (el) {
          return batch.indexOf(el) < 0;
        });
      }

      function startIntersectionObserver() {
        if (!("IntersectionObserver" in window)) {
          revealBatch(pending);
          pending = [];
          return;
        }
        var io = new IntersectionObserver(
          function (entries) {
            var batch = entries
              .filter(function (e) {
                return e.isIntersecting;
              })
              .map(function (e) {
                return e.target;
              });
            if (!batch.length) return;
            batch.sort(function (x, y) {
              return x.compareDocumentPosition(y) & 4 ? -1 : 1;
            });
            batch.forEach(function (el) {
              io.unobserve(el);
            });
            release(batch);
            revealBatch(batch);
          },
          { threshold: 0, rootMargin: "0px 0px -6% 0px" },
        );
        pending.forEach(function (el) {
          io.observe(el);
        });

        addEventListener(
          "scroll",
          function () {
            if (
              document.documentElement.scrollHeight -
                (scrollY + innerHeight) <
                100 &&
              pending.length
            ) {
              var rest = pending.slice();
              rest.forEach(function (el) {
                io.unobserve(el);
              });
              pending = [];
              revealBatch(rest);
            }
          },
          { passive: true },
        );
      }

      /* 2. Coordinated Choreography:
         - T = 300ms: Hero Name rises first
         - T = 550ms: Side bottom parts stagger in
         - T = 900ms: Nav links and top visible main content items reveal together
         - After initial reveal: Observe remainder as user scrolls
      */
      setTimeout(function () {
        if (heroTitle) {
          heroTitle.classList.add("rise-in");
        }

        side.forEach(function (el, i) {
          show(el, 250 + i * 65);
        });

        var navDelayStart = 600;
        nav.forEach(function (el, i) {
          show(el, navDelayStart + i * 45);
        });

        var vh = window.innerHeight || 800;
        var initialVisible = pending.filter(function (el) {
          var rect = el.getBoundingClientRect();
          return rect.top < vh * 0.95 && rect.bottom > 0;
        });

        if (initialVisible.length > 0) {
          release(initialVisible);
          initialVisible.forEach(function (el, i) {
            show(el, navDelayStart + i * 60);
          });
        }

        startIntersectionObserver();
      }, 300);
    },

    /* ------------------------------------------------------------------------
       3. Inertial Momentum Physics Scrolling (Wheel & Anchor Navigation)
       ------------------------------------------------------------------------ */
    initInertialScroll: function () {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!matchMedia("(hover: hover)").matches) return;

      var currentY = window.scrollY;
      var targetY = window.scrollY;
      var isRunning = false;
      var ease = 0.085;

      function clamp(val, min, max) {
        return Math.max(min, Math.min(val, max));
      }

      function getMaxScroll() {
        return Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight,
        );
      }

      function update() {
        var diff = targetY - currentY;
        currentY += diff * ease;

        if (Math.abs(diff) > 0.5) {
          window.scrollTo(0, currentY);
          requestAnimationFrame(update);
        } else {
          currentY = targetY;
          window.scrollTo(0, targetY);
          isRunning = false;
        }
      }

      window.addEventListener(
        "wheel",
        function (e) {
          if (e.ctrlKey) return;
          e.preventDefault();

          targetY += e.deltaY;
          targetY = clamp(targetY, 0, getMaxScroll());

          if (!isRunning) {
            isRunning = true;
            currentY = window.scrollY;
            requestAnimationFrame(update);
          }
        },
        { passive: false },
      );

      window.addEventListener(
        "scroll",
        function () {
          if (!isRunning) {
            targetY = window.scrollY;
            currentY = window.scrollY;
          }
        },
        { passive: true },
      );

      window.addEventListener(
        "resize",
        function () {
          targetY = clamp(targetY, 0, getMaxScroll());
          currentY = clamp(currentY, 0, getMaxScroll());
        },
        { passive: true },
      );

      document
        .querySelectorAll('a[href^="#"]:not(#mobileDrawer a)')
        .forEach(function (link) {
          link.addEventListener("click", function (e) {
            var href = link.getAttribute("href");
            if (!href || href === "#") return;
            var target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              var rect = target.getBoundingClientRect();
              var smt =
                parseFloat(window.getComputedStyle(target).scrollMarginTop) ||
                0;
              targetY = clamp(
                window.scrollY + rect.top - smt,
                0,
                getMaxScroll(),
              );
              if (!isRunning) {
                isRunning = true;
                currentY = window.scrollY;
                requestAnimationFrame(update);
              }
              try {
                history.pushState(null, null, href);
              } catch (_) {}
            }
          });
        });
    },

    /* ------------------------------------------------------------------------
       4. Dynamic Bottom Ambient Glow & --flow Lighting System
       ------------------------------------------------------------------------ */
    initGlow: function () {
      var glow = document.querySelector(".glow"),
        side = document.querySelector(".side"),
        busy = false,
        last = -1;
      if (!glow || !side) return;

      function update() {
        busy = false;
        var vh = innerHeight,
          rem = document.documentElement.scrollHeight - (scrollY + vh),
          t = Math.min(1, Math.max(0, 1 - rem / (vh * 1.2)));
        t = Math.round(t * t * (3 - 2 * t) * 200) / 200;
        if (t === last) return;
        last = t;
        var v = t.toFixed(3);
        glow.style.setProperty("--flow", v);
        side.style.setProperty("--flow", v);
        glow.classList.toggle("idle", t === 0);
      }

      function req() {
        if (!busy) {
          busy = true;
          requestAnimationFrame(update);
        }
      }

      addEventListener("scroll", req, { passive: true });
      addEventListener("resize", req);
      update();
    },

    /* ------------------------------------------------------------------------
       Bootstrap Method
       ------------------------------------------------------------------------ */
    init: function () {
      if (this._initialized) return;
      this._initialized = true;

      this.initPolyhedron();
      this.initReveal();
      this.initInertialScroll();
      this.initGlow();
    },
  };

  // Autonomous bootstrap: immediately execute if body exists, else wait for DOMContentLoaded
  if (document.body) {
    Portfolio.animations.init();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      Portfolio.animations.init();
    });
  }
})();
