import React, { useEffect, useState } from "react";
import "../css/Loader.css";

const MESSAGES = [
  "Brewing something great…",
  "Fetching the good stuff…",
  "Almost there…",
  "Loading awesomeness…",
];

function Loader({ text }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="ldr">
      {/* Background */}
      <div className="ldr__bg" />

      {/* Core animation */}
      <div className="ldr__stage">

        {/* Outer spinning ring */}
        <div className="ldr__ring ldr__ring--outer" />

        {/* Middle dashed ring */}
        <div className="ldr__ring ldr__ring--mid" />

        {/* Inner pulsing core */}
        <div className="ldr__core">
          <div className="ldr__core-inner" />
        </div>

        {/* Orbiting dots */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="ldr__orbit" style={{ "--oi": i }}>
            <div className="ldr__orb" />
          </div>
        ))}

        {/* Corner brackets */}
        <div className="ldr__bracket ldr__bracket--tl" />
        <div className="ldr__bracket ldr__bracket--tr" />
        <div className="ldr__bracket ldr__bracket--bl" />
        <div className="ldr__bracket ldr__bracket--br" />

      </div>

      {/* Text */}
      <div className="ldr__text-wrap">
        <p className="ldr__msg" key={msgIndex}>
          {text || MESSAGES[msgIndex]}
        </p>
        <div className="ldr__dots">
          <span /><span /><span />
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="ldr__bar-wrap">
        <div className="ldr__bar" />
      </div>
    </div>
  );
}

export default Loader;