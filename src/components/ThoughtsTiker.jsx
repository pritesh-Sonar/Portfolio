import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ThoughtsTicker.css";
import { getComments } from "../apiService";


function ThoughtsTicker() {
  const [comments, setComments] = useState([]);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      getComments()
      .then((responce) => {
        const arr = Array.isArray(responce.data.data) ? responce.data.data : data.data.comments ?? [];
        setComments(arr.slice(0, 20)); 
      })
      .catch(() => {});
  }, []);

  if (comments.length === 0) return null;

  // Duplicate for seamless loop
  const items = [...comments, ...comments];

  return (
    <section className="ticker-section">
      <div className="ticker-header">
        <div className="ticker-header__left">
          <span className="ticker-label">Thoughts</span>
          <span className="ticker-count">{comments.length} people shared</span>
        </div>
        <button className="ticker-cta" onClick={() => navigate("/thoughts")}>
          View all →
        </button>
      </div>

      <div
        className="ticker-track-wrap"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade masks */}
        <div className="ticker-fade ticker-fade--left" />
        <div className="ticker-fade ticker-fade--right" />

        <div className={`ticker-track ${paused ? "ticker-track--paused" : ""}`}>
          {items.map((c, i) => (
            <div key={i} className="ticker-item" onClick={() => navigate("/thoughts")}>
              <div className="ticker-item__avatar" style={{ "--ac": avatarColor(c.name) }}>
                {initials(c.name)}
              </div>
              <div className="ticker-item__body">
                <span className="ticker-item__name">{c.name}</span>
                {c.relation && <span className="ticker-item__rel">{c.relation}</span>}
                <p className="ticker-item__msg">
                  {c.message?.length > 80 ? c.message.slice(0, 80) + "…" : c.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// same helpers as Thoughts.jsx (copy here to keep component self-contained)
function initials(name = "") {
  return name.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
}
const COLORS = ["#a78bfa","#34d399","#fb7185","#fbbf24","#38bdf8","#f472b6","#a3e635"];
function avatarColor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return COLORS[Math.abs(h) % COLORS.length];
}

export default ThoughtsTicker;