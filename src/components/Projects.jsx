import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../css/Project.css";
import { getProjects } from "../apiService";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    tag: "Full Stack",
    year: "2025",
    description:
      "Add your project description here — what it does, the problem it solves, and what makes it special.",
    tech: ["React", "CSS", "React Router"],
    image: "/portfolioScreen.png",
    github: "https://github.com/pritesh-Sonar",
    live: "#",
    accent: "#a78bfa",
    size: "large", // large card spans 2 columns
  },
  {
    id: 2,
    title: "Krushi Sevak",
    tag: "Web App",
    year: "2025",
    description:
      "Add your project description here — what it does, the problem it solves, and what makes it special.",
    tech: ["React", "Node.js", "MongoDB"],
    image: null,
    github: "https://github.com/pritesh-Sonar",
    live: "#",
    accent: "#34d399",
    size: "small",
  },
  {
    id: 3,
    title: "Ultimate Precision",
    tag: "Full Stack",
    year: "2024",
    description:
      "Add your project description here — what it does, the problem it solves, and what makes it special.",
    tech: ["Spring Boot", "React", "AWS"],
    image: null,
    github: "https://github.com/pritesh-Sonar",
    live: "#",
    accent: "#fb7185",
    size: "small",
  },
  {
    id: 4,
    title: "NotesApp",
    tag: "Productivity",
    year: "2024",
    description:
      "Add your project description here — what it does, the problem it solves, and what makes it special.",
    tech: ["React", "Node.js", "Express"],
    image: null,
    github: "https://github.com/pritesh-Sonar",
    live: "#",
    accent: "#fbbf24",
    size: "small",
  },
  {
    id: 5,
    title: "CakeCraft",
    tag: "E-Commerce",
    year: "2024",
    description:
      "Add your project description here — what it does, the problem it solves, and what makes it special.",
    tech: ["React", "Spring Boot", "MySQL"],
    image: null,
    github: "https://github.com/pritesh-Sonar",
    live: "#",
    accent: "#38bdf8",
    size: "large",
  },
];

function useInstantReveal(delay = 0) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf1, raf2, timer;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        timer = setTimeout(() => setVisible(true), delay);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timer);
    };
  }, [delay]);

  return visible;
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ProjectCard({ project, index }) {
  const delay = 80 + index * 90; // stagger in ms
  const visible = useInstantReveal(delay);

  return (
    <article
      className={`pc ${project.size === "large" ? "pc--large" : "pc--small"} ${visible ? "pc--visible" : ""}`}
      style={{ "--a": project.accent }}
    >
      {/* Noise grain overlay */}
      <div className="pc__grain" />

      {/* Top strip */}
      <div className="pc__strip" />

      {/* Image / placeholder */}
      <div className="pc__img-wrap">
        {project.image ? (
          <img src={project.image} alt={project.title} className="pc__img" />
        ) : (
          <div className="pc__placeholder">
            <div className="pc__dots">
              {[...Array(12)].map((_, i) => (
                <span key={i} className="pc__dot" style={{ "--i": i }} />
              ))}
            </div>
            <span className="pc__placeholder-hint">
              Image is not available 😢
            </span>
          </div>
        )}
        {/* Gradient fade into card */}
        <div className="pc__img-fade" />
      </div>

      {/* Meta row */}
      <div className="pc__meta">
        <span className="pc__tag">{project.tag}</span>
        <span className="pc__year">{project.year}</span>
      </div>

      {/* Body */}
      <div className="pc__body">
        <h3 className="pc__title">{project.title}</h3>
        <p className="pc__desc">{project.description}</p>

        <div className="pc__tech">
          {project.tech.map((t) => (
            <span key={t} className="pc__pill">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="pc__footer">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="pc__link pc__link--gh"
        >
          <GitHubIcon /> GitHub
        </a>
        {project.live == "#" ? (
          <p></p>
        ) : (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="pc__link pc__link--live"
          >
            Live Demo <ExternalIcon />
          </a>
        )}
      </div>

      {/* Corner number */}
      <span className="pc__num">0{project.id}</span>
    </article>
  );
}

function Projects() {
  const titleVisible = useInstantReveal(0);
  const footerVisible = useInstantReveal(projects.length * 90 + 200);
  const [projestList, setProjectList] = useState([]);

  // Api method call
  useEffect(() => {
    getProjects()
      .then((result) => {
        if (result) {
          setProjectList(result.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("fail to load Notes");
      });
  }, []);

  return (
    <div className="proj-page">
      {/* Mesh background */}
      <div className="proj-mesh" />

      {/* Header */}
      <header
        className={`proj-header ${titleVisible ? "proj-header--visible" : ""}`}
      >
        <div className="proj-header__kicker">
          <span className="proj-header__line" />
          Selected Work
          <span className="proj-header__line" />
        </div>
        <h1 className="proj-header__title">
          <span>My</span>
          <span className="proj-header__title--accent">Projects</span>
        </h1>
        <p className="proj-header__sub">
          Things I've built — from ideas to shipped products.
        </p>
      </header>

      {/* Bento grid */}
      {projestList ? (
        <div className="proj-grid">
          {projestList.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      ) : (
        <h2>Error Occured 😥</h2>
      )}

      {/* Footer */}
      <div
        className={`proj-footer ${footerVisible ? "proj-footer--visible" : ""}`}
      >
        <a
          href="https://github.com/pritesh-Sonar"
          target="_blank"
          rel="noopener noreferrer"
          className="proj-footer__cta"
        >
          <GitHubIcon />
          More on GitHub
          <span className="proj-footer__arrow">→</span>
        </a>
      </div>
    </div>
  );
}

export default Projects;
