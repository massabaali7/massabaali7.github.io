/* Shared behaviours: theme, nav, reveal, header state, active link */
(function () {
  // ---- theme (persisted) ----
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));

  function bind() {
    const tgl = document.querySelector(".theme-toggle");
    if (tgl) tgl.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });

    // ---- mobile nav ----
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open);
      });
      nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
    }

    // ---- header scrolled state ----
    const header = document.querySelector(".site-header");
    const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- active nav link by filename ----
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav a").forEach(a => {
      const href = a.getAttribute("href");
      if (href === path || (path === "index.html" && href === "./") ||
          (path === "" && (href === "index.html" || href === "./"))) a.classList.add("active");
    });

    // ---- scroll reveal ----
    const els = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && els.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      els.forEach(el => io.observe(el));
      // safety net: reveal anything still hidden after 2.4s (e.g. off-screen on load)
      setTimeout(() => els.forEach(el => el.classList.add("in")), 2400);
    } else {
      els.forEach(el => el.classList.add("in"));
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();

  // expose copy helper
  window.copyToClipboard = function (text, btn) {
    navigator.clipboard.writeText(text).then(() => {
      if (!btn) return;
      const old = btn.textContent; btn.textContent = "Copied ✓"; btn.classList.add("ok");
      setTimeout(() => { btn.textContent = old; btn.classList.remove("ok"); }, 1600);
    });
  };
})();
