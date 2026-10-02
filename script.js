(function () {
  const root = document.documentElement;

  // Theme toggle: remember the visitor's choice when storage is available.
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved;
  } catch (_) {}

  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = isDark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (_) {}
  });

  // Mobile menu
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");
  toggle?.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    })
  );

  document.getElementById("year").textContent = new Date().getFullYear();
})();
