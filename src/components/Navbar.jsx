import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar({ toggleTheme, theme }) {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2 onClick={() => navigate("/")}>portfolio</h2>
      <div className="nav-items">
        <h3 onClick={() => navigate("/projects")}>Projects</h3>
        <h3 onClick={() => navigate("/resume")}>Resume</h3>
        <div>
          <h3 onClick={toggleTheme}>{theme === "light" ? "🌙" : "☀️"}</h3>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
