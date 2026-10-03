/* ==========================================================================
   UI Components JavaScript Module
   Encapsulates:
   1. Dynamic Word Rotator Ticker (#rw)
   2. Fluid Interactive Custom Cursor (.cur-dot, .cur-ring)
   3. Dynamic Button Radial Fill Origin & Ripple (.btn)
   4. Mobile & Tablet Hamburger Navigation Drawer & Quartic Ease Smooth Scroll
   ========================================================================== */

(function () {
  "use strict";

  window.Portfolio = window.Portfolio || {};

  Portfolio.components = {
    _initialized: false,

    /* ------------------------------------------------------------------------
       1. Dynamic Word Rotator Ticker
       ------------------------------------------------------------------------ */
    initRotator: function () {
      var w = [
          "Brand",
          "Shop",
          "Dream",
          "Product",
          "Story",
          "Startup",
          "Idea",
          "Studio",
          "Course",
          "Future",
          "Vision",
          "World",
          "App",
          "Platform",
          "Experience",
          "Prototype",
          "Ecosystem",
          "Identity",
          "Community",
          "Legacy",
        ],
        i = 0,
        el = document.getElementById("rw");
      if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setInterval(function () {
        el.className = "out";
        setTimeout(function () {
          i = (i + 1) % w.length;
          el.textContent = w[i];
          el.className = "pre";
          void el.offsetWidth;
          el.className = "";
        }, 150);
      }, 800);
    },

    /* ------------------------------------------------------------------------
       2. Fluid Interactive Custom Cursor
       ------------------------------------------------------------------------ */
    initCursor: function () {
      if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
      var d = document.createElement("div"),
        r = document.createElement("div");
      d.className = "cur-dot";
      r.className = "cur-ring";
      d.setAttribute("aria-hidden", "true");
      r.setAttribute("aria-hidden", "true");
      document.body.appendChild(r);
      document.body.appendChild(d);
      document.documentElement.classList.add("cc");
      var x = 0,
        y = 0,
        rx = 0,
        ry = 0,
        k = matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.18;
      addEventListener("mousemove", function (e) {
        x = e.clientX;
        y = e.clientY;
        if (!d.classList.contains("on")) {
          rx = x;
          ry = y;
          d.classList.add("on");
          r.classList.add("on");
        }
        d.style.transform = "translate(" + x + "px," + y + "px)";
        r.classList.toggle(
          "h",
          !!(e.target.closest && e.target.closest("a,button,.btn")),
        );
      });
      document.addEventListener("mouseleave", function () {
        d.classList.remove("on");
        r.classList.remove("on");
      });
      addEventListener("mousedown", function () {
        r.classList.add("d");
      });
      addEventListener("mouseup", function () {
        r.classList.remove("d");
      });
      (function t() {
        rx += (x - rx) * k;
        ry += (y - ry) * k;
        r.style.transform = "translate(" + rx + "px," + ry + "px)";
        requestAnimationFrame(t);
      })();
    },

    /* ------------------------------------------------------------------------
       3. Dynamic Button Radial Fill Origin & Ripple
       ------------------------------------------------------------------------ */
    initButtons: function () {
      var buttons = document.querySelectorAll(".btn");
      buttons.forEach(function (btn) {
        function setOrigin(e) {
          var rect = btn.getBoundingClientRect();
          var x = Math.round(e.clientX - rect.left);
          var y = Math.round(e.clientY - rect.top);
          btn.style.setProperty("--x", x + "px");
          btn.style.setProperty("--y", y + "px");
          return { x: x, y: y };
        }

        btn.addEventListener("pointerenter", setOrigin);
        btn.addEventListener("pointerleave", setOrigin);

        btn.addEventListener("pointerdown", function (e) {
          var pt = setOrigin(e);
          if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          var ripple = document.createElement("span");
          ripple.className = "btn-click-ripple";
          ripple.style.left = pt.x + "px";
          ripple.style.top = pt.y + "px";
          btn.appendChild(ripple);
          setTimeout(function () {
            if (ripple.parentElement) {
              ripple.remove();
            }
          }, 600);
        });
      });
    },

    /* ------------------------------------------------------------------------
       4. Mobile & Tablet Navigation Drawer & Smooth Scroll
       ------------------------------------------------------------------------ */
    initNavigation: function () {
      var menuBtn = document.getElementById("menuToggle");
      var drawer = document.getElementById("mobileDrawer");
      if (!menuBtn || !drawer) return;

      var scrollRafId = null;

      function cancelScrollAnim() {
        if (scrollRafId) {
          cancelAnimationFrame(scrollRafId);
          scrollRafId = null;
        }
      }

      function toggleMenu() {
        var isOpen = drawer.classList.toggle("open");
        menuBtn.classList.toggle("active", isOpen);
        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        if (isOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      }

      function closeMenu() {
        drawer.classList.remove("open");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }

      menuBtn.addEventListener("click", toggleMenu);

      // Apple-style quartic ease-out: smooth initial momentum and silky deceleration at 800ms
      function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
      }

      function smoothScrollTo(targetY, duration) {
        cancelScrollAnim();
        var startY = window.scrollY || window.pageYOffset;
        var distance = targetY - startY;
        if (Math.abs(distance) < 8) return; // Already at the section, no scroll required

        var startTime = null;

        function step(currentTime) {
          if (!startTime) startTime = currentTime;
          var elapsed = currentTime - startTime;
          var progress = Math.min(1, elapsed / duration);
          var eased = easeOutQuart(progress);

          window.scrollTo(0, startY + distance * eased);

          if (progress < 1) {
            scrollRafId = requestAnimationFrame(step);
          } else {
            scrollRafId = null;
          }
        }

        scrollRafId = requestAnimationFrame(step);
      }

      window.addEventListener("wheel", cancelScrollAnim, { passive: true });
      window.addEventListener("touchstart", cancelScrollAnim, {
        passive: true,
      });

      drawer.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function (e) {
          var href = link.getAttribute("href");
          if (!href || !href.startsWith("#")) {
            closeMenu();
            return;
          }

          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          var target = document.querySelector(href);
          closeMenu();

          if (target) {
            if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
              target.scrollIntoView({ block: "start" });
            } else {
              var smt =
                parseFloat(window.getComputedStyle(target).scrollMarginTop) ||
                0;
              var rect = target.getBoundingClientRect();
              var targetY = Math.max(
                0,
                (window.scrollY || window.pageYOffset) + rect.top - smt,
              );

              // Synchronized across the total 800ms drawer closure animation
              smoothScrollTo(targetY, 800);
            }
            try {
              history.pushState(null, null, href);
            } catch (_) {}
          }
        });
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && drawer.classList.contains("open")) {
          closeMenu();
        }
      });
    },

    /* ------------------------------------------------------------------------
       Bootstrap Method
       ------------------------------------------------------------------------ */
    init: function () {
      if (this._initialized) return;
      this._initialized = true;

      this.initRotator();
      this.initCursor();
      this.initButtons();
      this.initNavigation();
    },
  };

  // Autonomous bootstrap: immediately execute if body exists, else wait for DOMContentLoaded
  if (document.body) {
    Portfolio.components.init();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      Portfolio.components.init();
    });
  }
})();
