"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const sections = [
  ["hero", "Hero"], ["about", "About"], ["pixels", "Pixels"], ["blueprint", "Blueprint"],
  ["dna", "DNA"], ["craft", "Craft"], ["windows", "Windows"], ["ai-sandbox", "AI Sandbox"],
  ["projects", "Projects"], ["stack", "Stack"], ["contact", "Contact"],
] as const;

export function SectionRail() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const nodes = sections.map(([id]) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const next = sections.findIndex(([id]) => id === visible.target.id);
      if (next >= 0) setActive(next);
    }, { rootMargin: "-28% 0px -52% 0px", threshold: [0, 0.15, 0.35, 0.6] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const markerTop = 12 + (active / (sections.length - 1)) * 76;

  return (
    <nav className="section-rail" aria-label="Page sections">
      <span className="rail-caption">SYS.MAP</span>
      <div className="rail-track">
        {sections.map(([id, label], index) => (
          <a key={id} href={"#" + id} aria-label={"Go to " + label} aria-current={active === index ? "location" : undefined} className={"rail-node" + (index <= active ? " is-consumed" : "")}>
            <span className="rail-node-dot" /><span className="rail-tooltip">{label}</span>
          </a>
        ))}
        <motion.span className="rail-pacman" aria-hidden="true" animate={{ top: markerTop + "%" }} transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 24 }} />
      </div>
      <span className="rail-count">{String(active + 1).padStart(2, "0")} / 11</span>
    </nav>
  );
}
