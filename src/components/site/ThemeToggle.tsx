"use client";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "night" ? "day" : "night";
    root.setAttribute("data-theme", next);
    localStorage.setItem("jaggle.theme", next);
  };

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle light / dark theme" title="Toggle theme">
      <i className="ti ti-moon-stars" aria-hidden="true" />
      <i className="ti ti-sun" aria-hidden="true" />
    </button>
  );
}

export const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('jaggle.theme');
    if (stored) document.documentElement.setAttribute('data-theme', stored);
  } catch (e) {}
})();
`;
