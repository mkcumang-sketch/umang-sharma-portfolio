"use client";

import { useEffect, useState } from "react";

export function SiteIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("umang-portfolio-intro-seen") === "1" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setVisible(false);
        return;
      }
      sessionStorage.setItem("umang-portfolio-intro-seen", "1");
    } catch {
      // The intro remains a short, non-blocking visual flourish if storage is unavailable.
    }
    const timer = window.setTimeout(() => setVisible(false), 1450);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-intro" role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="site-intro-mark">U<span>.</span></div>
      <div className="site-intro-name">UMANG <em>SHARMA</em></div>
      <div className="site-intro-track"><span /></div>
      <p>DESIGNING / BUILDING / SHIPPING</p>
      <button type="button" onClick={() => setVisible(false)}>SKIP INTRO ↗</button>
    </div>
  );
}
