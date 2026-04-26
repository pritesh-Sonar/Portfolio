import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Navbar.css";

const NAV_LINKS = [
  { label: "Projects", path: "/projects" },
  { label: "Resume",   path: "/resume"   },
  { label: "Journey",  path: "/journey"  },
  { label: "Thoughts", path: "/thoughts" },
];

function Navbar({ toggleTheme, theme }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Scrolled class for deeper glass
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${open ? "navbar--open" : ""}`}>
        {/* Logo */}
        <h2 className="navbar__logo" onClick={() => navigate("/")}>
          pritesh<span>.</span>
        </h2>

        {/* Desktop nav */}
        <div className="navbar__desktop">
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              className={`navbar__link ${isActive(link.path) ? "navbar__link--active" : ""}`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          ))}
          <button className="navbar__theme" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Mobile right — theme + hamburger */}
        <div className="navbar__mobile-right">
          <button className="navbar__theme" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button
            className={`navbar__burger ${open ? "navbar__burger--open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="navbar__burger-line" />
            <span className="navbar__burger-line" />
            <span className="navbar__burger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`navbar__overlay ${open ? "navbar__overlay--visible" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${open ? "navbar__drawer--open" : ""}`}>
        {/* Drawer header */}
        <div className="navbar__drawer-header">
          <span className="navbar__drawer-logo">pritesh<em>.</em></span>
          <button className="navbar__drawer-close" onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Drawer links */}
        <nav className="navbar__drawer-nav">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.path}
              className={`navbar__drawer-link ${isActive(link.path) ? "navbar__drawer-link--active" : ""}`}
              style={{ "--di": i }}
              onClick={() => navigate(link.path)}
            >
              <span className="navbar__drawer-link-num">0{i + 1}</span>
              {link.label}
              <span className="navbar__drawer-link-arrow">→</span>
            </button>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="navbar__drawer-footer">
          <a href="https://github.com/pritesh-Sonar" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/pritesh-sonar-19152022b" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:priteshs2003@gmail.com">Email</a>
        </div>
      </div>
    </>
  );
}

export default Navbar;