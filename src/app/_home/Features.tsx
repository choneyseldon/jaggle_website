"use client";

import { useEffect, useRef, useState } from "react";

type TabKey = "board" | "docs" | "risk" | "gnh";

const TABS: { key: TabKey; label: string }[] = [
  { key: "board", label: "Task board" },
  { key: "docs", label: "AI docs" },
  { key: "risk", label: "Risk prediction" },
  { key: "gnh", label: "GNH dashboard" },
];

export function Features() {
  const [active, setActive] = useState<TabKey>("board");

  return (
    <section className="sec" id="features">
      <div className="sec-inner">
        <div className="sec-head center">
          <h2 className="sec-title">One workspace. Four kinds of intelligence.</h2>
          <p className="sec-sub">Every tab is the same control surface — switch the lens, the work stays in place.</p>
        </div>

        <div className="ftabs-wrap">
          <div className="ftabs" role="tablist" aria-label="Features">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`ftab${active === t.key ? " is-active" : ""}`}
                data-tab={t.key}
                role="tab"
                aria-selected={active === t.key}
                onClick={() => setActive(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="fgrid">
          <div className="fcopy">
            <div className={`fcontent${active === "docs" ? " is-active" : ""}`} data-c="docs">
              <div className="k">/ AI docs</div>
              <h3>Generate PRDs, sprint docs &amp; reports in seconds</h3>
              <p>The AI agent drafts user stories, research briefs and retrospectives from your project context.</p>
              <ul>
                <li>
                  <i className="ti ti-circle-check" /> PRDs and user stories from a one-line brief
                </li>
                <li>
                  <i className="ti ti-circle-check" /> Sprint retros pulled from task history
                </li>
                <li>
                  <i className="ti ti-circle-check" /> Stakeholder reports generated on schedule
                </li>
              </ul>
            </div>
            <div className={`fcontent${active === "risk" ? " is-active" : ""}`} data-c="risk">
              <div className="k">/ Risk prediction</div>
              <h3>See the slip before it happens</h3>
              <p>Jaggle watches velocity, load and dependencies to flag at-risk work days ahead — not at standup.</p>
              <ul>
                <li>
                  <i className="ti ti-circle-check" /> Delivery-date confidence scored per sprint
                </li>
                <li>
                  <i className="ti ti-circle-check" /> Dependency and blocker chains surfaced early
                </li>
                <li>
                  <i className="ti ti-circle-check" /> Plain-language reasons, not just a red dot
                </li>
              </ul>
            </div>
            <div className={`fcontent${active === "board" ? " is-active" : ""}`} data-c="board">
              <div className="k">/ Task board</div>
              <h3>A board that plans the next move</h3>
              <p>Drag, group and prioritise — while the agent suggests re-balances so no one carries the sprint alone.</p>
              <ul>
                <li>
                  <i className="ti ti-circle-check" /> Kanban, list and timeline in one view
                </li>
                <li>
                  <i className="ti ti-circle-check" /> Auto-assignment that respects capacity
                </li>
                <li>
                  <i className="ti ti-circle-check" /> Suggested moves when a teammate is overloaded
                </li>
              </ul>
            </div>
            <div className={`fcontent${active === "gnh" ? " is-active" : ""}`} data-c="gnh">
              <div className="k">/ GNH dashboard</div>
              <h3>Wellbeing as a first-class metric</h3>
              <p>
                A Gross-National-Happiness layer tracks balance, energy and growth alongside delivery — so output never costs the
                team.
              </p>
              <ul>
                <li>
                  <i className="ti ti-circle-check" /> Balance, energy &amp; growth scored weekly
                </li>
                <li>
                  <i className="ti ti-circle-check" /> Burnout signals before they become attrition
                </li>
                <li>
                  <i className="ti ti-circle-check" /> Sustainable-pace guardrails on every sprint
                </li>
              </ul>
            </div>
          </div>

          <div className="fvis">
            <div className={`fmock${active === "docs" ? " is-active" : ""}`} data-v="docs">
              <div className="fmock-h">
                PRD · Onboarding flow{" "}
                <span className="fmock-chip">
                  <span className="dot" /> Generating
                </span>
              </div>
              <div className="doc-rows">
                <span className="r" />
                <span className="r" />
                <span className="r s" />
                <span className="r" />
                <span className="r" />
              </div>
            </div>
            <div className={`fmock${active === "risk" ? " is-active" : ""}`} data-v="risk">
              <div className="fmock-h">
                Risk radar · Sprint 14{" "}
                <span className="fmock-chip">
                  <span className="dot" /> Live
                </span>
              </div>
              <div className="risk-list">
                <div className="risk-row">
                  <span className="sev hi" />
                  <span className="lbl">Payments API integration</span>
                  <span className="pct">71% slip</span>
                </div>
                <div className="risk-row">
                  <span className="sev md" />
                  <span className="lbl">Design QA backlog</span>
                  <span className="pct">38% slip</span>
                </div>
                <div className="risk-row">
                  <span className="sev lo" />
                  <span className="lbl">Docs &amp; handover</span>
                  <span className="pct">9% slip</span>
                </div>
              </div>
            </div>

            <TaskBoard isActive={active === "board"} />

            <div className={`fmock${active === "gnh" ? " is-active" : ""}`} data-v="gnh">
              <div className="fmock-h">
                GNH pulse · This week{" "}
                <span className="fmock-chip">
                  <span className="dot" /> Healthy
                </span>
              </div>
              <div className="gnh-rows">
                <div className="gnh-r">
                  <span>Balance</span>
                  <div className="bar">
                    <i style={{ width: "82%" }} />
                  </div>
                  <span className="n">82</span>
                </div>
                <div className="gnh-r">
                  <span>Energy</span>
                  <div className="bar">
                    <i style={{ width: "91%" }} />
                  </div>
                  <span className="n">91</span>
                </div>
                <div className="gnh-r">
                  <span>Growth</span>
                  <div className="bar">
                    <i style={{ width: "73%" }} />
                  </div>
                  <span className="n">73</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const COLUMN_NAMES = ["To do", "Doing", "Done"];

function TaskBoard({ isActive }: { isActive: boolean }) {
  const boardRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);
  const chipTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const board = boardRef.current;
    const chip = chipRef.current;
    const chipText = chipTextRef.current;
    if (!board) return;
    const cols = Array.from(board.querySelectorAll<HTMLElement>(".board-col"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let drag: {
      card: HTMLElement;
      sx: number;
      sy: number;
      ox: number;
      oy: number;
      w: number;
      h: number;
      moved: boolean;
      ph?: HTMLElement;
    } | null = null;
    let liveTimer: ReturnType<typeof setInterval> | null = null;
    let chipTimer: ReturnType<typeof setTimeout> | null = null;

    const cardsIn = (col: HTMLElement) => Array.from(col.querySelectorAll<HTMLElement>(".board-card"));
    const visible = () => board.offsetParent !== null;

    function updateCounts() {
      cols.forEach((c) => {
        const el = c.querySelector(".cn");
        if (el) el.textContent = String(c.querySelectorAll(".board-card").length);
      });
    }
    function restyle() {
      board!.querySelectorAll(".board-card.grad").forEach((c) => c.classList.remove("grad"));
      const first = cols[1] && cols[1].querySelector(".board-card");
      if (first) first.classList.add("grad");
    }
    function flashChip(msg: string) {
      if (!chip || !chipText) return;
      chipText.textContent = msg;
      chip.classList.add("is-flash");
      if (chipTimer) clearTimeout(chipTimer);
      chipTimer = setTimeout(() => {
        chip.classList.remove("is-flash");
        chipText.textContent = "Auto-balanced";
      }, 2000);
    }

    function flipMove(card: HTMLElement, toCol: HTMLElement) {
      if (card.classList.contains("is-moving")) return;
      if (reduce) {
        toCol.appendChild(card);
        restyle();
        updateCounts();
        return;
      }
      const first = card.getBoundingClientRect();
      toCol.appendChild(card);
      restyle();
      updateCounts();
      const last = card.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      card.classList.add("is-moving");
      card.style.transition = "none";
      card.style.transform = `translate(${dx}px,${dy}px)`;
      requestAnimationFrame(() => {
        card.style.transition = "transform .5s cubic-bezier(.2,.7,.2,1)";
        card.style.transform = "translate(0,0)";
      });
      const done = () => {
        card.style.transition = "";
        card.style.transform = "";
        card.classList.remove("is-moving");
        card.removeEventListener("transitionend", done);
      };
      card.addEventListener("transitionend", done);
      setTimeout(done, 700);
    }

    function advance(card: HTMLElement) {
      const i = cols.indexOf(card.closest(".board-col") as HTMLElement);
      const to = cols[(i + 1) % cols.length];
      flipMove(card, to);
      flashChip("Moved → " + COLUMN_NAMES[cols.indexOf(to)]);
    }

    function colUnder(x: number, y: number) {
      return cols.find((c) => {
        const r = c.getBoundingClientRect();
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      }) || null;
    }
    function refAfter(col: HTMLElement, y: number) {
      const items = cardsIn(col).filter((c) => c !== drag!.card);
      for (const it of items) {
        const r = it.getBoundingClientRect();
        if (y < r.top + r.height / 2) return it;
      }
      return null;
    }

    function begin() {
      const { card, w, h, sx, sy, ox, oy } = drag!;
      const ph = document.createElement("div");
      ph.className = "board-ph";
      ph.style.height = h + "px";
      card.after(ph);
      drag!.ph = ph;
      card.classList.add("is-dragging");
      card.style.width = w + "px";
      card.style.height = h + "px";
      card.style.position = "fixed";
      card.style.left = sx - ox + "px";
      card.style.top = sy - oy + "px";
      card.style.zIndex = "9999";
      card.style.pointerEvents = "none";
      card.style.margin = "0";
      document.body.appendChild(card);
      stopLive();
    }

    function onMove(e: PointerEvent) {
      if (!drag) return;
      if (!drag.moved) {
        if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 5) return;
        drag.moved = true;
        begin();
      }
      drag.card.style.left = e.clientX - drag.ox + "px";
      drag.card.style.top = e.clientY - drag.oy + "px";
      const col = colUnder(e.clientX, e.clientY);
      cols.forEach((c) => c.classList.toggle("is-over", c === col));
      if (col) {
        const ref = refAfter(col, e.clientY);
        if (ref) col.insertBefore(drag.ph!, ref);
        else col.appendChild(drag.ph!);
      }
    }
    function onUp() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (!drag) return;
      const { card, ph, moved } = drag;
      if (moved) {
        card.classList.remove("is-dragging");
        card.removeAttribute("style");
        if (ph) ph.replaceWith(card);
        cols.forEach((c) => c.classList.remove("is-over"));
        restyle();
        updateCounts();
        flashChip("Re-balanced");
      } else {
        if (ph) ph.remove();
        advance(card);
      }
      startLive();
      drag = null;
    }
    function onDown(e: PointerEvent) {
      if (e.button != null && e.button !== 0) return;
      const card = (e.target as HTMLElement).closest(".board-card") as HTMLElement | null;
      if (!card || card.classList.contains("is-moving")) return;
      const r = card.getBoundingClientRect();
      drag = {
        card,
        sx: e.clientX,
        sy: e.clientY,
        ox: e.clientX - r.left,
        oy: e.clientY - r.top,
        w: r.width,
        h: r.height,
        moved: false,
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      e.preventDefault();
    }
    board.addEventListener("pointerdown", onDown);

    function autoStep() {
      if (drag || !visible()) return;
      const active = cols.slice(0, 2).filter((c) => c.querySelectorAll(".board-card").length);
      let from: HTMLElement, to: HTMLElement | undefined;
      if (active.length) {
        from = active.reduce((a, b) => (b.querySelectorAll(".board-card").length > a.querySelectorAll(".board-card").length ? b : a));
        to = cols[cols.indexOf(from) + 1];
      } else {
        from = cols[2];
        to = cols[0];
      }
      const list = cardsIn(from);
      if (!list.length || !to) return;
      const card = list[list.length - 1];
      const id = card.querySelector(".bc-id");
      flipMove(card, to);
      flashChip("Jaggle moved " + (id ? id.textContent : "a task"));
    }
    function startLive() {
      if (reduce) return;
      stopLive();
      liveTimer = setInterval(autoStep, 5200);
    }
    function stopLive() {
      if (liveTimer) clearInterval(liveTimer);
      liveTimer = null;
    }

    updateCounts();
    restyle();

    let io: IntersectionObserver | null = null;
    if (!reduce && "IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? startLive() : stopLive())), { threshold: 0.25 });
      io.observe(board);
    }

    return () => {
      board.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      stopLive();
      if (chipTimer) clearTimeout(chipTimer);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <div className={`fmock${isActive ? " is-active" : ""}`} data-v="board">
      <div className="fmock-h">
        Board · Druk Team{" "}
        <span className="fmock-chip" id="boardChip" ref={chipRef}>
          <span className="dot" /> <span id="boardChipText" ref={chipTextRef}>Auto-balanced</span>
        </span>
      </div>
      <div className="board-cols" id="boardMock" ref={boardRef}>
        <div className="board-col" data-col="todo">
          <span className="ch">
            To do <b className="cn">3</b>
          </span>
          <div className="board-card" data-pri="hi">
            <div className="bc-head">
              <span className="bc-pri" />
              <span className="bc-id">JG-238</span>
              <span className="bc-grip">
                <i className="ti ti-grip-vertical" />
              </span>
            </div>
            <div className="bc-title">Payments API integration</div>
            <div className="bc-foot">
              <span className="bc-av a-d">DO</span>
              <span className="bc-pts">5 pts</span>
            </div>
          </div>
          <div className="board-card" data-pri="md">
            <div className="bc-head">
              <span className="bc-pri" />
              <span className="bc-id">JG-244</span>
              <span className="bc-grip">
                <i className="ti ti-grip-vertical" />
              </span>
            </div>
            <div className="bc-title">Onboarding empty states</div>
            <div className="bc-foot">
              <span className="bc-av a-k">KW</span>
              <span className="bc-pts">2 pts</span>
            </div>
          </div>
          <div className="board-card" data-pri="lo">
            <div className="bc-head">
              <span className="bc-pri" />
              <span className="bc-id">JG-251</span>
              <span className="bc-grip">
                <i className="ti ti-grip-vertical" />
              </span>
            </div>
            <div className="bc-title">Localize Nu pricing</div>
            <div className="bc-foot">
              <span className="bc-av a-t">TZ</span>
              <span className="bc-pts">3 pts</span>
            </div>
          </div>
        </div>
        <div className="board-col" data-col="doing">
          <span className="ch">
            Doing <b className="cn">2</b>
          </span>
          <div className="board-card grad" data-pri="hi">
            <div className="bc-head">
              <span className="bc-pri" />
              <span className="bc-id">JG-219</span>
              <span className="bc-grip">
                <i className="ti ti-grip-vertical" />
              </span>
            </div>
            <div className="bc-title">Sprint risk model v2</div>
            <div className="bc-foot">
              <span className="bc-av a-p">PD</span>
              <span className="bc-pts">8 pts</span>
            </div>
          </div>
          <div className="board-card" data-pri="md">
            <div className="bc-head">
              <span className="bc-pri" />
              <span className="bc-id">JG-225</span>
              <span className="bc-grip">
                <i className="ti ti-grip-vertical" />
              </span>
            </div>
            <div className="bc-title">Board drag interactions</div>
            <div className="bc-foot">
              <span className="bc-av a-s">SY</span>
              <span className="bc-pts">5 pts</span>
            </div>
          </div>
        </div>
        <div className="board-col" data-col="done">
          <span className="ch">
            Done <b className="cn">2</b>
          </span>
          <div className="board-card" data-pri="md">
            <div className="bc-head">
              <span className="bc-pri" />
              <span className="bc-id">JG-201</span>
              <span className="bc-grip">
                <i className="ti ti-grip-vertical" />
              </span>
            </div>
            <div className="bc-title">GNH weekly digest</div>
            <div className="bc-foot">
              <span className="bc-av a-p">PD</span>
              <span className="bc-pts">3 pts</span>
            </div>
          </div>
          <div className="board-card" data-pri="lo">
            <div className="bc-head">
              <span className="bc-pri" />
              <span className="bc-id">JG-208</span>
              <span className="bc-grip">
                <i className="ti ti-grip-vertical" />
              </span>
            </div>
            <div className="bc-title">Auth rate-limit</div>
            <div className="bc-foot">
              <span className="bc-av a-k">KW</span>
              <span className="bc-pts">2 pts</span>
            </div>
          </div>
        </div>
      </div>
      <div className="board-hint">
        <i className="ti ti-hand-finger" /> Drag a card · tap to advance
      </div>
    </div>
  );
}
