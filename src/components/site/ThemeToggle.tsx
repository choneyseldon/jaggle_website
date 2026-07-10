"use client";

export function ThemeToggle() {
  /*
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "night" ? "day" : "night";
    root.setAttribute("data-theme", next);
    localStorage.setItem("jaggle.theme", next);
  };
  */

  return (
    <button className="theme-toggle" aria-label="Theme toggle disabled" title="Theme toggle disabled" type="button" disabled>
      <i className="ti ti-moon-stars" aria-hidden="true" />
      <i className="ti ti-sun" aria-hidden="true" />
    </button>
  );
}

export const themeInitScript = `
(function(){
  try {
    document.documentElement.setAttribute('data-theme', 'day');
    localStorage.setItem('jaggle.theme', 'day');
  } catch (e) {}
})();
`;
