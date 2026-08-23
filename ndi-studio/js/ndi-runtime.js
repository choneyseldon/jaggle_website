/* =====================================================================
   Bhutan NDI — runtime
   Three effects need one line of JS each, and only ONE listener apiece
   for the whole page (DESIGN.md §9).
   ===================================================================== */
(function () {
  var root = document.documentElement;
  var still = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* 1. Pointer position -> --gx/--gy. Every spotlight and the circuit
        mask read from here, so one listener drives every card on the
        page. Bail on coarse pointers rather than measuring and tracking
        for layers that are not painted. */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var pending = null;
    document.addEventListener("pointermove", function (e) {
      if (pending) return;
      pending = requestAnimationFrame(function () {
        pending = null;
        root.style.setProperty("--gx", e.clientX + "px");
        root.style.setProperty("--gy", e.clientY + "px");
      });
    }, { passive: true });
  }

  /* 2. Reveal on scroll — one shared IntersectionObserver, unobserve
        after firing. Staggered ~0.05s per sibling. */
  var targets = document.querySelectorAll("[data-reveal]");
  if (still.matches || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.setAttribute("data-revealed", ""); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var i = Array.prototype.indexOf.call(el.parentNode.children, el);
        el.style.transitionDelay = Math.min(i, 8) * 0.05 + "s";
        el.setAttribute("data-revealed", "");
        io.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* 3. Footer curtain — a 430px clip window over a 100vh+430px track, so
        the footer is revealed as the page ends rather than scrolled to.
        Content scrubs 0 -> 1, eased 1 - (1-p)^3. */
  var curtain = document.querySelector("[data-ndi-curtain]");
  if (curtain) {
    var inner = curtain.querySelector("[data-ndi-curtain-content]");
    var scrub = function () {
      var box = curtain.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, 1 - box.top / Math.max(1, window.innerHeight)));
      var e = 1 - Math.pow(1 - p, 3);
      if (inner) {
        inner.style.opacity = e;
        inner.style.transform = "scale(" + (0.86 + 0.14 * e) + ")";
      }
    };
    if (still.matches) {
      if (inner) { inner.style.opacity = 1; inner.style.transform = "none"; }
    } else {
      addEventListener("scroll", scrub, { passive: true });
      addEventListener("resize", scrub, { passive: true });
      scrub();
    }
  }
})();
