"use client";

import { useEffect, useRef, useState } from "react";

const CHAPTERS = ["00:00 · Setup", "0:30 · AI docs", "1:10 · Risk detection", "1:45 · GNH dashboard"];

export function Demo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const frame = frameRef.current;
    const head = headRef.current;
    if (!frame) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let isMobile = window.innerWidth <= 768;

    if (reduce) {
      frame.style.transform = "rotateX(0deg) scale(1)";
      return;
    }

    function update() {
      if (!frame) return;
      const vh = window.innerHeight;
      const rect = frame.getBoundingClientRect();
      const p = clamp((vh - rect.top) / (vh * 0.9), 0, 1);
      const rot = lerp(20, 0, p);
      const scale = isMobile ? lerp(0.88, 0.98, p) : lerp(1.05, 1, p);
      const ty = lerp(40, -30, p);
      frame.style.transform = `rotateX(${rot}deg) scale(${scale})`;
      if (head) head.style.transform = `translateY(${ty}px)`;
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };
    const onResize = () => {
      isMobile = window.innerWidth <= 768;
      update();
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    update();
    return () => {
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="sec" id="demo">
      <div className="sec-inner">
        <div className="sec-head center" id="demoHead" ref={headRef}>
          <h2 className="sec-title">See Jaggle in action</h2>
          <p className="sec-sub">A two-minute walkthrough — from a blank workspace to AI risk detection and the GNH dashboard.</p>
        </div>
        <div className="demo-3d">
          <div className="demo-frame" id="demoFrame" ref={frameRef}>
            <div className="demo-bar">
              <span className="demo-url">
                <i className="ti ti-player-play" style={{ fontSize: 11 }} /> jaggle.ai · product demo
              </span>
              <span className="demo-dur">2:14</span>
            </div>
            <div className="demo-stage">
              <button className="demo-play" aria-label="Play product walkthrough">
                <i className="ti ti-player-play-filled" />
              </button>
              <span className="demo-cap">Product walkthrough · 2:14</span>
            </div>
            <div className="demo-chapters" role="tablist" aria-label="Chapters">
              {CHAPTERS.map((c, i) => (
                <button
                  key={c}
                  className={`chap${activeChapter === i ? " is-active" : ""}`}
                  role="tab"
                  aria-selected={activeChapter === i}
                  onClick={() => setActiveChapter(i)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
