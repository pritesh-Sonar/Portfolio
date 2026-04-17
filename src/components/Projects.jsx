import React, { useState } from "react";
import "../css/Project.css";
import imgPortfolio from "../assets/portfolioScreen.png";
import imgNotesApp from "../assets/noteaAppScreenshot.png";
import imgKrushiSevak from "../assets/KrushisevakScreen.png";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    tag: "Full Stack",
    year: "2025",
    description:
      "Add your project description here — what it does, the problem it solves, and what makes it special.",
    tech: ["React", "CSS", "React Router"],
    image: imgPortfolio, 
    github: "https://github.com/pritesh-Sonar",
    live:"#",
    color: "#7c6af7",
  },
  {
    id: 2,
    title: "Krushi Sevak",
    tag: "Web App",
    year: "2025",
    description:
      "Add your project description here — what it does, the problem it solves, and what makes it special.",
    tech: ["React", "Node.js", "MongoDB"],
    image: imgKrushiSevak,
    github: "https://github.com/pritesh-Sonar",
    color: "#38e8c6",
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
    color: "#f25f8e",
  },
  {
    id: 4,
    title: "NotesApp",
    tag: "Productivity",
    year: "2024",
    description:
      "Add your project description here — what it does, the problem it solves, and what makes it special.",
    tech: ["React", "Node.js", "Express"],
    image: imgNotesApp,
    github: "https://github.com/pritesh-Sonar/notesApp_frontend",
    live: "https://notes-app-frontend-ylpq.vercel.app",
    color: "#f7a94b",
  },
  {
    id: 5,
    title: "CakeCraft",
    tag: "Full Stack",
    year: "2024",
    description:
      "Add your project description here — what it does, the problem it solves, and what makes it special.",
    tech: ["React", "Spring Boot", "MySQL"],
    image: null,
    github: "https://github.com/pritesh-Sonar",
    color: "#f25f8e",
  },
];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="project-card"
      style={{ "--accent-color": project.color, "--delay": `${index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Area */}
      <div className="card-image">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <div className="image-placeholder">
            <div className="placeholder-grid">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="grid-dot" />
              ))}
            </div>
            <p className="placeholder-label">Screenshot not available</p>
          </div>
        )}
        <div className="card-image-overlay" />

        {/* Floating tag */}
        <span className="project-tag">{project.tag}</span>
        <span className="project-year">{project.year}</span>
      </div>

      {/* Content */}
      <div className="card-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        {/* Tech stack */}
        <div className="tech-stack">
          {project.tech.map((t) => (
            <span key={t} className="tech-pill">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="card-links">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-btn link-github"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn link-live"
            >
              <svg
                width="14"
                height="14"
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
              Live Demo
            </a>
          ) : (
            <p></p>
          )}
        </div>
      </div>

      {/* Hover border glow */}
      <div className="card-border-glow" />
    </article>
  );
}

function Projects() {
  return (
    <div className="projects-page">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* Header */}
      <header className="projects-header">
        <span className="projects-eyebrow">Selected Work</span>
        <h1 className="projects-title">Projects</h1>
        <p className="projects-subtitle">
          Things I've built — from ideas to shipped products.
        </p>
      </header>

      {/* Grid */}
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="projects-footer">
        <p>Want to see more?</p>
        <a
          href="https://github.com/pritesh-Sonar"
          target="_blank"
          rel="noopener noreferrer"
          className="github-cta"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          View all on GitHub
        </a>
      </div>
    </div>
  );
}

export default Projects;
