"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MegaMenu } from "./MegaMenu";
import { ThemeToggle } from "./ThemeToggle";

type NavKey = "features" | "our-story" | "pricing" | "contact" | null;

const NAV_ITEMS: { key: NavKey; label: string; href: string }[] = [
  { key: "features", label: "Features", href: "/features" },
  { key: "our-story", label: "Our Story", href: "/our-story" },
  { key: "pricing", label: "Pricing", href: "/pricing" },
  { key: "contact", label: "Contact", href: "/contact" },
];

const PATH_TO_KEY: Record<string, NavKey> = {
  "/features": "features",
  "/our-story": "our-story",
  "/pricing": "pricing",
  "/contact": "contact",
};

type SiteNavProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

const PAGES_WITHOUT_OWN_CTA = new Set(["/contact", "/request-demo"]);

export function SiteNav({ ctaHref, ctaLabel = "Get started free" }: SiteNavProps) {
  const pathname = usePathname();
  const activeKey = PATH_TO_KEY[pathname] ?? null;
  const showMegaMenu = activeKey !== "features" && activeKey !== "our-story";
  const resolvedCtaHref =
    ctaHref ?? (PAGES_WITHOUT_OWN_CTA.has(pathname) ? "/#cta" : pathname === "/" ? "#cta" : `${pathname}#cta`);

  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMegaSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160);
  };

  useEffect(() => {
    document.body.classList.toggle("drawer-open", drawerOpen);
    document.body.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      closeMegaSoon();
      setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav className="nav is-scrolled" id="nav" aria-label="Primary">
        <Link className="logo" href="/" aria-label="Jaggle AI home">
          <Image className="logo-mark" src="/images/jaggle-mark.png" alt="" width={24} height={30} aria-hidden="true" />
          <span className="logo-word">
            JAGGLE<span className="dot">.</span>
            <span className="ai">AI</span>
          </span>
        </Link>

        <div className="nav-links" role="menubar">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === activeKey;
            const isFeatures = item.key === "features";
            const href = isActive ? "#top" : item.href;
            return (
              <Link
                key={item.key}
                className={`nav-link${isActive ? " is-active" : ""}`}
                href={href}
                role="menuitem"
                aria-current={isActive ? "page" : undefined}
                id={isFeatures && showMegaMenu ? "featuresTrigger" : undefined}
                aria-haspopup={isFeatures && showMegaMenu ? true : undefined}
                aria-expanded={isFeatures && showMegaMenu ? megaOpen : undefined}
                aria-controls={isFeatures && showMegaMenu ? "megaFeatures" : undefined}
                onMouseEnter={isFeatures && showMegaMenu ? openMega : undefined}
                onMouseLeave={isFeatures && showMegaMenu ? closeMegaSoon : undefined}
                onFocus={isFeatures && showMegaMenu ? openMega : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {showMegaMenu && <MegaMenu id="megaFeatures" open={megaOpen} onEnter={openMega} onLeave={closeMegaSoon} />}

        <div className="nav-right">
          <ThemeToggle />
          <Link className="lg-btn lg-btn--primary lg-btn--sm" href={resolvedCtaHref}>
            <span className="lg-refract" aria-hidden="true" />
            <span className="lg-edge" aria-hidden="true" />
            <span className="lg-label">
              {ctaLabel} <i className="ti ti-arrow-right arrow" aria-hidden="true" />
            </span>
          </Link>
          <button
            className="burger"
            id="burger"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-controls="drawer"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </nav>

      <aside className="drawer" id="drawer" aria-hidden={!drawerOpen}>
        <nav className="drawer-links" aria-label="Mobile">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === activeKey;
            return (
              <Link
                key={item.key}
                className="drawer-link"
                href={isActive ? "#top" : item.href}
                onClick={() => setDrawerOpen(false)}
              >
                {item.label} <i className="ti ti-arrow-up-right" />
              </Link>
            );
          })}
        </nav>
        <div className="drawer-foot">
          <span className="drawer-meta">Jaggle AI · Thimphu, Bhutan</span>
          <div className="drawer-socials" aria-label="Social">
            <a href="#" aria-label="LinkedIn">
              <i className="ti ti-brand-linkedin" />
            </a>
            <a href="#" aria-label="X / Twitter">
              <i className="ti ti-brand-x" />
            </a>
            <a href="#" aria-label="GitHub">
              <i className="ti ti-brand-github" />
            </a>
            <a href="#" aria-label="Email">
              <i className="ti ti-mail" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
