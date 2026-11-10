"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useExperienceMode } from "@/components/experience-mode";

export function Hero() {
  const { mode, setMode } = useExperienceMode();
  const reduceMotion = useReducedMotion();
  const designMode = mode === "design";
  return <section className="retro-hero section-shell" id="hero" aria-labelledby="hero-title">
    <div className="hero-terminal-top"><span>[ HELLO_WORLD.SYS ]</span><span>UMANGOS / BUILD 2026.11</span></div>
    <div className="hero-main-grid">
      <div className="hero-main-copy">
        <p className="terminal-eyebrow">C:/UMANG.DEV/STARTUP_SEQUENCE</p>
        <motion.h1 id="hero-title" initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>Turning Prompts,<br/>Code &amp; Pixels into<br/><em>Autonomous Digital Systems.</em></motion.h1>
        <p className="hero-lede">{designMode ? "A design-led builder shaping expressive interfaces, product stories and visual systems that make complex technology feel clear." : "Vibe coder, AI systems builder, and design technologist crafting high-speed web platforms, voice agents, and operational workflows."}</p>
        <div className="hero-actions"><a className="terminal-button" href="#projects">Explore selected work <b>↘</b></a><a className="hero-text-link" href="#contact">Start a conversation ↗</a></div>
        <div className="hero-system-line"><span className="system-online-dot"/><span>{designMode ? "DESIGN SYSTEM / VISUAL MODE" : "SYSTEMS & AI / BUILD MODE"}</span><span className="hero-divider"/> <span>INDIA / REMOTE</span></div>
      </div>
      <div className="hero-console">
        <div className="console-header"><span>UMANGOS / MODE SELECTOR</span><span>SYS.001</span></div>
        <div className="mode-switcher" role="group" aria-label="Choose portfolio experience mode">
          <button type="button" aria-pressed={!designMode} className={!designMode ? "is-active" : ""} onClick={() => setMode("systems")}>[ Systems &amp; AI Mode ]</button>
          <button type="button" aria-pressed={designMode} className={designMode ? "is-active" : ""} onClick={() => setMode("design")}>[ Design &amp; Vibe Mode ]</button>
        </div>
        <div className="console-visual" aria-hidden="true"><div className="console-grid"/><div className="console-orbit console-orbit-a"/><div className="console-orbit console-orbit-b"/><div className="console-core">U<span>.</span></div><div className="console-crosshair">+</div><span className="console-coord coord-a">X:014 / Y:028</span><span className="console-coord coord-b">CORE / ONLINE</span></div>
        <div className="console-stats"><div><span>MODE</span><b>{designMode ? "DESIGN" : "SYSTEMS"}</b></div><div><span>FOCUS</span><b>{designMode ? "FORM / FEEL" : "AI / AUTOMATION"}</b></div><div><span>STATUS</span><b className="status-green">READY</b></div></div>
      </div>
    </div>
    <div className="hero-bottomline"><span>SCROLL TO EXPLORE</span><span className="hero-progress-line"/><span>01 / 11</span></div>
  </section>;
}
