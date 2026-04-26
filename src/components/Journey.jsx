import React, { useState, useEffect, useRef } from "react";
import { getMilestones } from "../apiService";
import { getGoals } from "../apiService";
import "../css/Journey.css";

/* ── Reveal hook — double rAF, reliable on every route visit ── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let r1, r2, t, obs;
    const observe = () => {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            t = setTimeout(() => setVisible(true), delay);
            obs.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      obs.observe(el);
    };
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(observe);
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      clearTimeout(t);
      obs?.disconnect();
    };
  }, [delay]);

  return [ref, visible];
}


/* ── Milestone Card ── */
function MilestoneCard({ milestone, index }) {
  const [ref, visible] = useReveal(index * 80);
  const [expanded, setExpanded] = useState(false);
  const isLeft = milestone.side === "left";

  return (
    <div
      ref={ref}
      className={`jm ${isLeft ? "jm--left" : "jm--right"} ${visible ? "jm--visible" : ""}`}
      style={{ "--mc": milestone.color }}
    >
      {/* Year stamp */}
      <div className="jm__year-stamp">
        <span className="jm__year">{milestone.year}</span>
        <span className="jm__era">{milestone.era}</span>
      </div>

      {/* Connector dot */}
      <div className="jm__node">
        <div className="jm__node-ring" />
        <div className="jm__node-core">{milestone.icon}</div>
      </div>

      {/* Card */}
      <div className={`jm__card ${expanded ? "jm__card--expanded" : ""}`}>
        {/* Card glow */}
        <div className="jm__card-glow" />

        {/* Header */}
        <div className="jm__card-header" onClick={() => setExpanded(!expanded)}>
          <div className="jm__card-header-text">
            <span className="jm__subtitle">{milestone.subtitle}</span>
            <h3 className="jm__title">{milestone.title}</h3>
          </div>
          <div className="jm__expand-btn" aria-label="expand">
            <span className="jm__expand-icon">{expanded ? "−" : "+"}</span>
          </div>
        </div>

        {/* Highlight badge */}
        <div className="jm__highlight">
          <span className="jm__highlight-dot" />
          {milestone.highlight}
        </div>

        {/* Expandable body */}
        <div className={`jm__body ${expanded ? "jm__body--open" : ""}`}>
          <p className="jm__desc">{milestone.description}</p>

          {/* Tech stack */}
          <div className="jm__tech">
            {milestone.tech.map((t) => (
              <span key={t} className="jm__badge">
                {t}
              </span>
            ))}
          </div>

          {/* Projects */}
          {milestone.projects && (
            <div className="jm__projects">
              <span className="jm__projects-label">Projects shipped</span>
              <div className="jm__projects-list">
                {milestone.projects.map((p) => (
                  <span key={p} className="jm__project-chip">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Click hint */}
        {!expanded && (
          <button className="jm__hint" onClick={() => setExpanded(true)}>
            Tap to expand ↓
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Future Goal Card ── */
function FutureCard({ goal, index }) {
  const [ref, visible] = useReveal(index * 70);

  return (
    <div
      ref={ref}
      className={`jf ${visible ? "jf--visible" : ""}`}
      style={{ "--fi": index }}
    >
      <span className="jf__icon">{goal.icon}</span>
      <h4 className="jf__title">{goal.title}</h4>
      <p className="jf__desc">{goal.desc}</p>
      <div className="jf__scan" />
    </div>
  );
}

/* ── Main Component ── */
function Journey() {
  const [headerRef, headerVisible] = useReveal(0);
  const [milestones, setMilestones] = useState([]);
  const [futureGoals, setGoals] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    getMilestones()
      .then((responce) => {
        setMilestones(responce.data.data);
      })
      .catch((error) => {
        console.log(error);
        setFetchError(true);
      });
  }, []);

  useEffect(() => {
    getGoals()
      .then((responce) => {
        setGoals(responce.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="journey">
      {/* Background effects */}
      <div className="journey__bg">
        <div className="journey__orb journey__orb--1" />
        <div className="journey__orb journey__orb--2" />
        <div className="journey__orb journey__orb--3" />
        <div className="journey__grid-lines" />
      </div>

      {/* Header  */}
      <header
        ref={headerRef}
        className={`journey__header ${headerVisible ? "journey__header--visible" : ""}`}
      >
        <div className="journey__header-kicker">
          <span /> MY STORY <span />
        </div>
        <h1 className="journey__header-title">
          The
          <br />
          <em>Journey</em>
        </h1>
        <p className="journey__header-sub">
          Every commit, every bug, every shipped feature —<br />
          this is how a developer is forged.
        </p>
        <div className="journey__header-scroll">
          <span>Scroll to explore</span>
          <div className="journey__scroll-line" />
        </div>
      </header>

      {/* ── Timeline ── */}

      {fetchError ? (
        <div className="proj-page">
          <div className="proj-mesh" />
          <div className="proj-error">
            <span className="proj-error__icon">⚠</span>
            <h2>Couldn't Load the content</h2>
            <p>Something Unusual Happened try again.</p>
            <button
              className="proj-error__retry"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <div className="journey__timeline">
          {/* Vertical spine */}
          <div className="journey__spine">
            <div className="journey__spine-track" />
            <div className="journey__spine-progress" />
          </div>

          {/* Milestones */}
          {milestones.map((m, i) => (
            <MilestoneCard key={m.id} milestone={m} index={i} />
          ))}
        </div>
      )}

      {/* ── Future Goals ── */}
      <section className="journey__future">
        <div className="journey__future-header">
          <h2 className="journey__future-title">Future Goals</h2>
          <p className="journey__future-sub">
            The road ahead — skills to master, problems to solve, impact to
            make.
          </p>
        </div>

        <div className="journey__future-grid">
          {futureGoals.map((g, i) => (
            <FutureCard key={g.title} goal={g} index={i} />
          ))}
        </div>

        {/* End marker */}
        <div className="journey__end">
          <div className="journey__end-ring" />
          <span className="journey__end-text">Story continues…</span>
        </div>
      </section>
    </div>
  );
}

export default Journey;
