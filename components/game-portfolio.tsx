"use client";

import { useEffect, useRef, useState } from "react";
import { links, projects, toolkit, type Project } from "@/data/portfolio";
import { LlmTerminal } from "@/components/ai-sandbox/llm-terminal";

const zones = [
  { id: "spawn", label: "Spawn Point", short: "01", hint: "Start here" },
  { id: "profile", label: "Player Profile", short: "02", hint: "Meet Umang" },
  { id: "projects", label: "Project Islands", short: "03", hint: "Explore builds" },
  { id: "inventory", label: "Skill Inventory", short: "04", hint: "Tools & craft" },
  { id: "contact", label: "Final Portal", short: "05", hint: "Start a quest" },
];

export function GamePortfolio() {
  const [activeZone, setActiveZone] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeProjectButton = useRef<HTMLButtonElement>(null);
  const playerName = "VISITOR_001";

  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeProjectButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest("input,textarea,button,a,[contenteditable=true]")) return;
      if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
        event.preventDefault();
        setActiveZone((value) => Math.min(zones.length - 1, value + 1));
      }
      if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
        event.preventDefault();
        setActiveZone((value) => Math.max(0, value - 1));
      }
      if (event.key === "Enter") {
        document.getElementById(zones[activeZone].id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeZone]);

  useEffect(() => {
    const nodes = zones.map((zone) => document.getElementById(zone.id)).filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = zones.findIndex((zone) => zone.id === visible.target.id);
      if (index >= 0) setActiveZone(index);
    }, { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const jump = (index: number) => {
    setActiveZone(index);
    document.getElementById(zones[index].id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <div className="game-world">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="game-hud">
      <a className="game-brand" href="#spawn" aria-label="Umang Sharma home"><span className="brand-cube">U</span><span>UMANG<span className="brand-muted">.WORLD</span><small>PORTFOLIO / BUILD 2026</small></span></a>
      <nav className="game-nav" aria-label="Game world zones">
        {zones.map((zone, index) => <button key={zone.id} type="button" className={activeZone === index ? "is-active" : ""} onClick={() => jump(index)}><span>{zone.short}</span>{zone.label}</button>)}
      </nav>
      <div className="player-status"><span className="online-indicator"/> {playerName}</div>
    </header>

    <aside className="game-quest" aria-label="Current quest">
      <span className="quest-kicker">MAIN QUEST</span><strong>Explore Umang's world</strong><span className="quest-progress"><i style={{ width: ((activeZone + 1) / zones.length * 100) + "%" }}/></span><small>ZONE {activeZone + 1} / {zones.length}</small>
    </aside>

    <main id="main-content">
      <section className="game-zone spawn-zone" id="spawn">
        <div className="world-sky" aria-hidden="true"><span className="sky-star star-one"/><span className="sky-star star-two"/><span className="sky-star star-three"/><span className="sky-moon"/></div>
        <div className="spawn-copy">
          <p className="game-eyebrow"><span className="status-pulse"/> WORLD LOADED / KANPUR, INDIA</p>
          <h1>Hey, I'm<br/><em>Umang Sharma.</em></h1>
          <p className="spawn-lede">I build digital worlds, AI-powered products and useful systems for real businesses. This is my portfolio — explore it like a game.</p>
          <div className="spawn-actions"><button className="game-primary" onClick={() => jump(1)}>START EXPLORING <span>↗</span></button><a href={links.github} target="_blank" rel="noreferrer">VIEW GITHUB <span>↗</span></a></div>
          <div className="player-card"><span className="player-avatar">U.</span><div><small>PLAYER / CREATOR</small><strong>Umang Sharma</strong><span>AI · Product · Design · Automation</span></div><b>LVL. 20</b></div>
        </div>
        <div className="island-stage" aria-label="Three-dimensional floating island illustration">
          <div className="island-sun"/>
          <div className="island-orbit orbit-a"/><div className="island-orbit orbit-b"/>
          <div className="floating-island">
            <div className="island-top"><div className="island-path"/><div className="island-tower tower-one"><i/><i/><i/></div><div className="island-tower tower-two"><i/><i/></div><div className="island-tree tree-one"/><div className="island-tree tree-two"/><div className="island-crystal"/></div>
            <div className="island-side"><span/><span/><span/></div>
            <div className="island-shadow"/>
          </div>
          <div className="island-label label-one"><i/> CREATIVE ENGINE</div><div className="island-label label-two"><i/> SYSTEMS ONLINE</div>
          <div className="island-coordinates">26.4499° N / 80.3319° E</div>
        </div>
        <div className="spawn-footer"><span>SCROLL OR USE W / S TO MOVE BETWEEN ZONES</span><span>01 — SPAWN POINT</span></div>
      </section>

      <section className="game-zone profile-zone" id="profile">
        <div className="zone-heading"><span>ZONE 02 / PLAYER PROFILE</span><span>QUEST LOG / ABOUT</span></div>
        <div className="profile-layout"><div><p className="game-eyebrow">THE PLAYER BEHIND THE BUILDS</p><h2>Curious mind.<br/><em>Builder mindset.</em></h2></div><div className="profile-copy"><p>I'm a technology builder and founder of TRUV TECH &amp; CONSULTANCY. I work across product development, AI-assisted workflows, business automation and digital experiences.</p><p>I like turning messy, manual processes into clear systems — from a first product idea to the interface people use every day.</p><div className="capability-list" aria-label="Services and capabilities">{["Business & CRM automation", "CA & accounting automation", "Hospital workflow automation", "AI-assisted operations", "Web apps & portals", "Workflow integrations"].map((item) => <span key={item}>{item}</span>)}</div><a href={links.linkedin} target="_blank" rel="noreferrer">OPEN PLAYER PROFILE ↗</a></div></div>
        <div className="stats-grid"><div className="stat-tile"><small>CLASS</small><strong>Builder</strong><span>Product / Systems</span></div><div className="stat-tile"><small>GUILD</small><strong>TRUV TECH</strong><span>Founder</span></div><div className="stat-tile"><small>REGION</small><strong>India</strong><span>Remote-ready</span></div><div className="stat-tile"><small>CORE QUEST</small><strong>Make it useful</strong><span>Build · Test · Improve</span></div></div>
      </section>

      <section className="game-zone projects-zone" id="projects">
        <div className="zone-heading"><span>ZONE 03 / PROJECT ISLANDS</span><span>SELECT AN ISLAND TO INSPECT</span></div>
        <div className="zone-title-row"><h2>Worlds I've<br/><em>helped build.</em></h2><p>Each island represents a product, client project or capability. Select a project to open its details and verified repository where available.</p></div>
        <div className="project-islands">{projects.map((project, index) => <article className={"project-island project-island-" + (index % 4)} key={project.number}>
          <div className="project-island-art"><span className="island-number">{project.number}</span><div className="mini-world"><i/><i/><i/></div><span className="island-type">{project.category}</span></div>
          <div className="project-island-info"><div><span className={"project-status-dot status-" + project.status.toLowerCase().replaceAll(" ", "-")}/>{project.status}</div><h3>{project.name}</h3><p>{project.description}</p><div className="project-tags">{project.stack.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><button className="project-inspect" type="button" onClick={() => setSelectedProject(project)} aria-label={`Inspect ${project.name}`}>INSPECT ISLAND ↗</button>{project.repository ? <a href={project.repository} target="_blank" rel="noreferrer">OPEN REPOSITORY ↗</a> : <span>NO PUBLIC REPOSITORY</span>}</div></div>
        </article>)}</div>
      </section>

      <section className="game-zone inventory-zone" id="inventory">
        <div className="zone-heading"><span>ZONE 04 / SKILL INVENTORY</span><span>TOOLS EQUIPPED</span></div>
        <div className="zone-title-row"><h2>My builder's<br/><em>inventory.</em></h2><p>Tools are selected to solve the problem — not to fill a badge wall. This is the working toolkit behind the projects.</p></div>
        <div className="inventory-grid">{toolkit.map((item, index) => <div className="inventory-item" key={item.name}><span className="inventory-slot">{String(index + 1).padStart(2, "0")}</span><div><small>{item.group}</small><strong>{item.name}</strong><span>{item.note}</span></div><b>↗</b></div>)}</div>
        <div className="ai-room"><div className="ai-room-copy"><p className="game-eyebrow">OPTIONAL NPC / AI KNOWLEDGE TERMINAL</p><h3>Ask about<br/><em>the world.</em></h3><p>Use the text terminal to explore my projects and systems. No voice calling or microphone interaction.</p></div><div className="ai-room-terminal"><LlmTerminal/></div></div>
      </section>

      <section className="game-zone contact-zone" id="contact">
        <div className="zone-heading"><span>ZONE 05 / FINAL PORTAL</span><span>QUEST COMPLETE? START A NEW ONE.</span></div>
        <div className="portal-scene"><div className="portal-ring portal-ring-back"/><div className="portal-ring portal-ring-front"/><div className="portal-core">↗</div></div>
        <div className="contact-content"><p className="game-eyebrow">NEW QUEST AVAILABLE</p><h2>Have a good<br/><em>problem to solve?</em></h2><p>Tell me what you're building, improving or trying to automate. Let's shape the right solution around it.</p><a className="game-primary" href={"mailto:" + links.email}>START A CONVERSATION <span>↗</span></a><div className="contact-links"><a href={links.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={links.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href={links.instagram} target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href={`tel:${links.phone}`}>CALL {links.phone} ↗</a></div></div>
        <footer className="game-footer"><span>UMANG.WORLD / PORTFOLIO BUILD 2026</span><span>THANKS FOR EXPLORING.</span></footer>
      </section>
    </main>

    <nav className="game-minimap" aria-label="Zone minimap">{zones.map((zone, index) => <button key={zone.id} type="button" onClick={() => jump(index)} className={activeZone === index ? "is-active" : ""} aria-label={zone.label}><i/><span>{zone.short}</span></button>)}</nav>
    <div className="game-controls"><kbd>W</kbd><kbd>S</kbd><span>MOVE ZONE</span><kbd>↵</kbd><span>ENTER</span></div>
    {selectedProject && <div className="project-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" aria-describedby="project-modal-description">
        <div className="project-modal-topline"><span>PROJECT ISLAND / {selectedProject.number}</span><button ref={closeProjectButton} type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details">CLOSE ×</button></div>
        <p className="game-eyebrow">{selectedProject.category}</p>
        <h2 id="project-modal-title">{selectedProject.name}</h2>
        <p id="project-modal-description">{selectedProject.details}</p>
        <div className="project-modal-status"><span className={"project-status-dot status-" + selectedProject.status.toLowerCase().replaceAll(" ", "-")}/>{selectedProject.status}</div>
        <div className="project-tags">{selectedProject.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-modal-actions">{selectedProject.repository ? <a href={selectedProject.repository} target="_blank" rel="noreferrer">OPEN REPOSITORY ↗</a> : <span>Public repository not listed</span>}<button type="button" onClick={() => setSelectedProject(null)}>BACK TO WORLD</button></div>
      </section>
    </div>}
  </div>;
}
