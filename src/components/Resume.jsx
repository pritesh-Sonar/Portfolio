import React from "react";
import "../css/Resume.css";
function Resume() {
  return (
    <div className="resume-container">
      <h1>My Resume</h1>
      <section>
        <h2>Education</h2>
        <p>B.Tech in Computer Science, Savitribai Phule Pune University</p>
      </section>

      <section>
        <h2>Experience</h2>
        <p>FullStack Developer at LTM</p>
      </section>

      <section>
        <h2>Skills</h2>
        <p>Java, C++, JavaScript, AWS cloud</p>
        <p>React, Node, Spring Boot, HTML, CSS</p>
      </section>

      <section>
        <h2>Projects</h2>
        <p>
          Portfolio Website, Krushi Sevak, Ultimate Pricision, NotesApp,
          CakeCraft
        </p>
      </section>

      <section>
        <h2>Achievements</h2>
        <p>Certified AWS cloud Practitioner</p>
        <p>Google UI/UX Design</p>
        <p>NPTL Leadership and Team Effectiveness Certificate (Elite)</p>
        <p>Hackathon 3rd Winner 2025</p>
      </section>

      {/* Download Button */}
      <a href="/resume.pdf" download className="download-btn">
        Download Resume
      </a>
    </div>
  );
}

export default Resume;
