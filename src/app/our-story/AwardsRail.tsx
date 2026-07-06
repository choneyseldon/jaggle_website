"use client";

import { useRef, useState } from "react";
import type { CSSProperties, KeyboardEventHandler, PointerEventHandler, WheelEventHandler } from "react";

type Award = {
  rank: string;
  win?: boolean;
  icon: string;
  title: string;
  loc: string;
};

const AWARDS: Award[] = [
  { rank: "Honoree", icon: "ti-award", title: "National Student Entrepreneur Awards", loc: "Bhutan" },
  { rank: "Finalist", icon: "ti-world", title: "Global Student Entrepreneur Awards", loc: "International · GSEA" },
  { rank: "Selected", icon: "ti-rocket", title: "K-Startup Grand Challenge", loc: "South Korea" },
  { rank: "Featured", icon: "ti-bulb", title: "Bhutan Innovation Forum", loc: "Thimphu, Bhutan" },
  { rank: "Winner", win: true, icon: "ti-trophy", title: "National Startup Weekend Bhutan", loc: "Bhutan" },
  { rank: "Honoree", icon: "ti-star", title: "Druk Tsongrig Gatoen", loc: "Bhutan" },
  { rank: "Speaker", icon: "ti-users-group", title: "International Meetup Baku", loc: "Baku, Azerbaijan" },
  { rank: "Selected", icon: "ti-id-badge-2", title: "Baku ID", loc: "Baku, Azerbaijan" },
];

const COUNT = AWARDS.length;
const pad = (n: number) => String(n + 1).padStart(2, "0");

export function AwardsSection() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ down: false, startX: 0, dragged: false });

  const go = (n: number) => setActive(((n % COUNT) + COUNT) % COUNT);
  const next = () => go(active + 1);
  const prev = () => go(active - 1);

  const wheelTime = useRef(0);
  const onWheel: WheelEventHandler = (e) => {
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(d) < 18) return;
    const now = Date.now();
    if (now - wheelTime.current < 380) return;
    if (d > 0) next();
    else prev();
    wheelTime.current = now;
    e.preventDefault();
  };

  const onPointerDown: PointerEventHandler = (e) => {
    dragState.current = { down: true, startX: e.clientX, dragged: false };
    setDragging(true);
    stageRef.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove: PointerEventHandler = (e) => {
    if (!dragState.current.down) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 60 && !dragState.current.dragged) {
      dragState.current.dragged = true;
      if (dx < 0) next();
      else prev();
    }
  };
  const endDrag = () => {
    dragState.current.down = false;
    setDragging(false);
  };

  const onKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "ArrowLeft") {
      prev();
      e.preventDefault();
    }
    if (e.key === "ArrowRight") {
      next();
      e.preventDefault();
    }
  };

  const activeAward = AWARDS[active];

  return (
    <section className="sec" data-screen-label="Awards & Recognition">
      <div className="sec-inner">
        <div className="awards-top">
          <div className="sec-head" style={{ margin: 0 }}>
            <p className="sec-eyebrow">Recognition</p>
            <h2 className="sec-title">
              Recognition Across Global
              <br />
              Innovation Platforms
            </h2>
          </div>
          <div className="awards-nav">
            <button aria-label="Previous awards" onClick={prev}>
              <i className="ti ti-arrow-left" />
            </button>
            <button aria-label="Next awards" onClick={next}>
              <i className="ti ti-arrow-right" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`rail-stage${dragging ? " dragging" : ""}`}
        id="awRail"
        tabIndex={0}
        aria-label="Recognition carousel"
        ref={stageRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
      >
        <div className="rail-track" id="awTrack">
          {AWARDS.map((award, i) => {
            let off = i - active;
            if (off > COUNT / 2) off -= COUNT;
            if (off < -COUNT / 2) off += COUNT;
            const dist = Math.abs(off);
            const isActive = off === 0;

            const style: CSSProperties =
              dist > 2.5
                ? { opacity: 0, pointerEvents: "none", transform: `translateX(${off * 340}px) scale(.6)` }
                : {
                    pointerEvents: "auto",
                    opacity: isActive ? 1 : Math.max(0.12, 1 - dist * 0.45),
                    filter: isActive ? "none" : `blur(${dist * 4}px) brightness(.55)`,
                    zIndex: 20 - dist,
                    transform: `translateX(${off * 230}px) translateZ(${-dist * 200}px) rotateY(${off * -22}deg) scale(${isActive ? 1 : 0.86})`,
                  };

            return (
              <article
                className="rail-card"
                key={award.title}
                style={style}
                data-active={isActive ? "" : undefined}
                onClick={() => {
                  if (i !== active && !dragState.current.dragged) go(i);
                }}
              >
                <div className="rail-ph">
                  <span className="rail-ph-label">
                    <i className="ti ti-photo" /> Drop photo
                  </span>
                </div>
                <span className={`rail-card-rank${award.win ? " win" : ""}`}>{award.rank}</span>
              </article>
            );
          })}
        </div>
      </div>

      <div className="sec-inner">
        <div className="rail-info">
          <div className="rail-info-text" id="awInfo" key={active}>
            <span className="rail-meta">
              <i className={`ti ${activeAward.icon}`} /> <span data-rail="rank">{activeAward.rank}</span>
            </span>
            <h3 data-rail="title">{activeAward.title}</h3>
            <p data-rail="loc">
              <i className="ti ti-map-pin" /> {activeAward.loc}
            </p>
          </div>
          <div className="rail-counter">
            <span id="awIndex">{pad(active)}</span> <span className="rail-sep">/</span>{" "}
            <span id="awTotal">{pad(COUNT - 1)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
