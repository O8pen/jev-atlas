// Keyboard shortcuts and theme toggle (event delegation, so it survives page swaps in the static build).
(() => {
  if (window.__atlasKeys) return;
  window.__atlasKeys = true;
  const base = window.ATLAS_BASE || "";
  const go = (path) => (window.atlasNav ? window.atlasNav(base + path) : (location.href = base + path));
  const typing = (el) => el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey || typing(document.activeElement)) return;
    if (e.key === "/") { const i = document.querySelector(".search input"); if (i) { e.preventDefault(); i.focus(); i.select(); } }
    else if (e.key === "r") go("/random");
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest || !e.target.closest(".theme")) return;
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (_) {}
  });
})();
