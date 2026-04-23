import { useEffect, useState } from "react";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import ThoughtsTicker from "./ThoughtsTiker";

function Home({ theme }) {
  const navigate = useNavigate();

  return (
    <div className={`App ${theme}`}>
      {/* Hero Section */}
      <section className="hero">
        <h1 className="crazy-text">Hi, I'm Pritesh 👋</h1>
        <p className="fade-in">
          I craft sleek websites & creative digital experiences.
        </p>
        <a href="#projects" className="btn bounce">
          See My Work
        </a>
        <div className="floating-shapes">
          <span className="shape"></span>
          <span className="shape"></span>
          <span className="shape"></span>
        </div>
      </section>

      {/* About Section */}
      <section className="about slide-in">
        <h2>About Me</h2>
        <p>
          I'm a passionate developer who loves turning ideas into interactive
          experiences. Coffee fuels my code, and I design with purpose.
        </p>
      </section>

      <ThoughtsTicker />

      {/* Projects Section */}
      <section className="projects zoom-in" id="projects">
        <h2>Featured Projects</h2>
        <div className="project-grid">
          <div
            className="project-card"
            onClick={() => {
              navigate("/projects");
            }}
          >
            Cake Craft
          </div>
          <div
            className="project-card"
            onClick={() => {
              navigate("/projects");
            }}
          >
            Krushi Sevak
          </div>
          <div
            className="project-card"
            onClick={() => {
              navigate("/projects");
            }}
          >
            NotesApp
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="contact fade-in">
        <h2>Let’s Connect</h2>
        <p>
          <a href="mailto:priteshs2003@gmail.com">Email</a> |
          <a
            href="https://www.linkedin.com/in/pritesh-sonar-19152022b"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            LinkedIn
          </a>{" "}
          |
          <a
            href="https://github.com/pritesh-Sonar"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            GitHub
          </a>
        </p>
      </section>
    </div>
  );
}

export default Home;
