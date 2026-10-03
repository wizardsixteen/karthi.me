/* ==========================================================================
   Master JavaScript Coordinator
   Bootstraps and coordinates Portfolio components and animations.
   ========================================================================== */

(function () {
  "use strict";

  function initPortfolio() {
    if (window.Portfolio) {
      if (
        Portfolio.components &&
        typeof Portfolio.components.init === "function"
      ) {
        Portfolio.components.init();
      }
      if (
        Portfolio.animations &&
        typeof Portfolio.animations.init === "function"
      ) {
        Portfolio.animations.init();
      }
    }
  }

  if (document.body) {
    initPortfolio();
  } else {
    document.addEventListener("DOMContentLoaded", initPortfolio);
  }
})();
