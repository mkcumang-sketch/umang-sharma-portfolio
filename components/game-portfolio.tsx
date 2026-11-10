"use client";

import { useEffect, useRef, useState } from "react";
import { links, projects, services, toolkit, type Project } from "@/data/portfolio";

const zones = [
  { id: "spawn", label: "Spawn Point", short: "01" },
  { id: "profile", label: "Player Profile", short: "02" },
  { id: "projects", label: "Project Islands", short: "03" },
  { id: "inventory", label: "Services & Skills", short: "04" },
  { id: "contact", label: "Final Portal", short: "05" },
];

export function GamePortfolio() {
  const [activeZone, setActiveZone] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeProjectButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeProjectButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest("input,textarea,button,a,[contenteditable=true]")) return;
      const key = event.key.toLowerCase();
      if (key === "arrowdown" || key === "s" || key === "arrowup" || key === "w") {
        event.preventDefault();
        const direction = key === "arrowdown" || key === "s" ? 1 : -1;
        const nextIndex = Math.max(0, Math.min(zones.length - 1, activeZone + direction));
        setActiveZone(nextIndex);
        document.getElementById(zones[nextIndex].id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (key === "enter") {
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
    <a className="game-skip-link" href="#main-content">Skip to content</a>
    <header className="game-hud">
      <a className="game-brand" href="#spawn" aria-label="Umang Sharma home"><span className="brand-cube">U</span><span>UMANG<span className="brand-muted">.WORLD</span><small>PORTFOLIO / 2026</small></span></a>
      <nav className="game-nav" aria-label="Portfolio zones">
        {zones.map((zone, index) => <button key={zone.id} type="button" className={activeZone === index ? "is-active" : ""} onClick={() => jump(index)}><span>{zone.short}</span>{zone.label}</button>)}
      </nav>
      <div className="player-status"><span className="online-indicator"/> PORTFOLIO / LIVE</div>
    </header>

    <aside className="game-quest" aria-label="Current quest">
      <span className="quest-kicker">MAIN QUEST</span><strong>Explore Umang's world</strong><span className="quest-progress"><i style={{ width: ((activeZone + 1) / zones.length * 100) + "%" }}/></span><small>ZONE {activeZone + 1} / {zones.length}</small>
    </aside>

    <main id="main-content">
      <section className="game-zone spawn-zone" id="spawn">
        <div className="world-sky" aria-hidden="true"><span className="sky-star star-one"/><span className="sky-star star-two"/><span className="sky-star star-three"/><span className="sky-moon"/></div>
        <div className="spawn-copy">
          <p className="game-eyebrow"><span className="status-pulse"/> INDIA / REMOTE-READY</p>
          <h1>Hey, I'm<br/><em>Umang Sharma.</em></h1>
          <p className="spawn-role">AI · DESIGN · OPERATIONS</p>
          <p className="spawn-lede">I turn business problems into useful digital products, thoughtful interfaces and practical automations — from CRM and CA workflows to connected business systems.</p>
          <div className="spawn-actions"><button className="game-primary" onClick={() => jump(1)}>START EXPLORING <span>↗</span></button><a href={links.github} target="_blank" rel="noreferrer">VIEW GITHUB <span>↗</span></a></div>
          <div className="player-card"><span className="player-avatar">U.</span><div><small>FOUNDER / BUILDER</small><strong>Umang Sharma</strong><span>{links.company}</span></div><b>BUILD / 2026</b></div>
        </div>
        <div className="island-stage" role="img" aria-label="A floating three-dimensional island with towers, trees and a glowing crystal">
          <div className="island-sun"/>
          <div className="island-orbit orbit-a"/><div className="island-orbit orbit-b"/>
          <div className="floating-island">
            <div className="island-top"><div className="island-path"/><div className="island-tower tower-one"><i/><i/><i/></div><div className="island-tower tower-two"><i/><i/></div><div className="island-tree tree-one"/><div className="island-tree tree-two"/><div className="island-crystal"/></div>
            <div className="island-side"><span/><span/><span/></div>
            <div className="island-shadow"/>
          </div>
          <div className="island-label label-one"><i/> IDEAS INTO PRODUCTS</div><div className="island-label label-two"><i/> SYSTEMS THAT WORK</div>
          <div className="island-coordinates">TRUV TECH & CONSULTANCY</div>
        </div>
        <div className="spawn-footer"><span>SCROLL OR USE W / S TO MOVE BETWEEN ZONES</span><span>01 — SPAWN POINT</span></div>
      </section>

      <section className="game-zone profile-zone" id="profile">
        <div className="zone-heading"><span>ZONE 02 / PLAYER PROFILE</span><span>QUEST LOG / ABOUT</span></div>
        <div className="profile-layout"><div><p className="game-eyebrow">THE BUILDER BEHIND THE SYSTEMS</p><h2>Curious mind.<br/><em>Builder mindset.</em></h2></div><div className="profile-copy"><p>I'm Umang Sharma, founder of TRUV TECH &amp; CONSULTANCY. I work across product development, AI-assisted workflows, business automation and digital experiences.</p><p>My focus is practical technology: understand the process, remove repetitive work and build a system people can actually use — from an early product idea to the day-to-day operations behind it.</p><a href={links.linkedin} target="_blank" rel="noreferrer">OPEN LINKEDIN PROFILE ↗</a></div></div>
        <div className="company-signature"><span className="company-mark">T</span><div><small>THE COMPANY</small><strong>{links.company}</strong><span>{links.tagline}</span></div></div>
        <div className="stats-grid"><div className="stat-tile"><small>ROLE</small><strong>Founder</strong><span>Product / Systems</span></div><div className="stat-tile"><small>FOCUS</small><strong>Useful tech</strong><span>Build · Test · Improve</span></div><div className="stat-tile"><small>WORK</small><strong>Digital products</strong><span>AI · Automation · Design</span></div><div className="stat-tile"><small>COLLABORATION</small><strong>Remote-ready</strong><span>India & beyond</span></div></div>
      </section>

      <section className="game-zone projects-zone" id="projects">
        <div className="zone-heading"><span>ZONE 03 / PROJECT ISLANDS</span><span>SELECT A PROJECT TO EXPLORE</span></div>
        <div className="zone-title-row"><h2>Worlds I've<br/><em>helped build.</em></h2><p>Selected products and client work. Project stages are kept clear, and repository links appear only where a public reference is available.</p></div>
        <div className="project-islands" aria-label="Selected projects">{projects.map((project, index) => <article className={"project-island project-island-" + (index % 4)} key={project.number}>
          <div className="project-island-art"><span className="island-number">{project.number}</span><div className="mini-world"><i/><i/><i/></div><span className="island-type">{project.category}</span></div>
          <div className="project-island-info"><div><span className={"project-status-dot status-" + project.status.toLowerCase().replaceAll(" ", "-")}/>{project.status}</div><h3>{project.name}</h3><p>{project.description}</p><div className="project-tags">{project.stack.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><button className="project-inspect" type="button" onClick={() => setSelectedProject(project)} aria-label={"Inspect " + project.name}>INSPECT ISLAND ↗</button>{project.repository ? <a href={project.repository} target="_blank" rel="noreferrer">OPEN REPOSITORY ↗</a> : <span>NO PUBLIC REPOSITORY</span>}</div></div>
        </article>)}</div>
      </section>

      <section className="game-zone inventory-zone" id="inventory">
        <div className="zone-heading"><span>ZONE 04 / SERVICES & SKILLS</span><span>WHAT I CAN HELP BUILD</span></div>
        <div className="zone-title-row"><h2>From problem<br/><em>to practical.</em></h2><p>TRUV TECH &amp; CONSULTANCY works across technology, automation and digital operations. Scope is shaped around the real workflow, not a one-size-fits-all package.</p></div>
        <div className="service-grid">{services.map((service, index) => <article className="service-card" key={service.name}><span className="service-number">{String(index + 1).padStart(2, "0")}</span><div><small>{service.group}</small><h3>{service.name}</h3><p>{service.note}</p></div><span className="service-arrow">↗</span></article>)}</div>
        <div className="inventory-heading"><p className="game-eyebrow">TOOLS & WORKING TOOLKIT</p><h3>Builder's inventory.</h3></div>
        <div className="inventory-grid">{toolkit.map((item, index) => <div className="inventory-item" key={item.name}><span className="inventory-slot">{String(index + 1).padStart(2, "0")}</span><div><small>{item.group}</small><strong>{item.name}</strong><span>{item.note}</span></div></div>)}</div>
      </section>

      <section className="game-zone contact-zone" id="contact">
        <div className="zone-heading"><span>ZONE 05 / FINAL PORTAL</span><span>START A CONVERSATION</span></div>
        <div className="portal-scene" aria-hidden="true"><div className="portal-ring portal-ring-back"/><div className="portal-ring portal-ring-front"/><div className="portal-core">↗</div></div>
        <div className="contact-content"><p className="game-eyebrow">NEW QUEST AVAILABLE</p><h2>Have a good<br/><em>problem to solve?</em></h2><p>Tell me what you're building, improving or trying to automate. Let's shape the right solution around it.</p><a className="game-primary" href={"mailto:" + links.email}>EMAIL UMANG <span>↗</span></a><div className="contact-direct"><a href={"tel:" + links.phone}>CALL {links.phoneDisplay}</a><a href={links.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={links.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href={links.instagram} target="_blank" rel="noreferrer">INSTAGRAM ↗</a></div><p className="contact-company">{links.company}<span>{links.tagline}</span></p></div>
        <footer className="game-footer"><span>UMANG SHARMA / AI · DESIGN · OPERATIONS</span><span>THANKS FOR EXPLORING.</span></footer>
      </section>
    </main>

    <nav className="game-minimap" aria-label="Zone minimap">{zones.map((zone, index) => <button key={zone.id} type="button" onClick={() => jump(index)} className={activeZone === index ? "is-active" : ""} aria-label={zone.label}><i/><span>{zone.short}</span></button>)}</nav>
    <div className="game-controls"><kbd>W</kbd><kbd>S</kbd><span>MOVE ZONE</span><kbd>↵</kbd><span>GO TO ZONE</span></div>

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
