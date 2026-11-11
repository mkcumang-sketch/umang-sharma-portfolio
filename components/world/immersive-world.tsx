"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { links, projects, toolkit } from "@/data/portfolio";
import type { Project } from "@/data/portfolio";
import { ScrollMotion } from "@/components/world/scroll-motion";

const PortfolioScene = dynamic(() => import("@/components/world/portfolio-scene"), {
  ssr: false,
  loading: () => <div className="world-canvas-fallback" aria-hidden="true" />,
});

const destinations = [
  { id: "about", number: "01", label: "About me", detail: "The person behind the products" },
  { id: "skills", number: "02", label: "Skills & technologies", detail: "Tools, systems and learning map" },
  { id: "projects", number: "03", label: "Projects", detail: "Six real builds and their current status" },
  { id: "engineering", number: "04", label: "Platform engineering", detail: "DevOps practice and architecture" },
  { id: "experience", number: "05", label: "Experience & case studies", detail: "Career timeline and technical evidence" },
  { id: "contact", number: "06", label: "Contact", detail: "Start a useful conversation" },
];

const skillGroups = [
  { title: "Product engineering", items: ["Next.js", "React", "TypeScript", "Node.js", "PHP", "REST APIs"] },
  { title: "Data & application systems", items: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "Redis", "SQL"] },
  { title: "Delivery & runtime", items: ["Git & GitHub", "Docker", "Docker Compose", "GitHub Actions", "Vercel", "Cloudflare"] },
  { title: "Security & reliability", items: ["Tenant isolation", "RBAC patterns", "Environment secrets", "Rate limiting", "Migration safety", "Release checks"] },
];

const architectureNodes = [
  { id: "source", title: "Source", subtitle: "Git · GitHub", detail: "Versioned application code, pull requests and reviewable changes." },
  { id: "pipeline", title: "Delivery pipeline", subtitle: "GitHub Actions", detail: "Automated checks, build workflows and controlled promotion steps." },
  { id: "runtime", title: "Application runtime", subtitle: "Next.js · Containers", detail: "Application runtime, environment configuration, health checks and deployment targets." },
  { id: "data", title: "Data & state", subtitle: "PostgreSQL · Redis", detail: "Persistent records, migrations, tenant boundaries and cache-backed supporting services." },
  { id: "edge", title: "Edge & delivery", subtitle: "Vercel · Cloudflare", detail: "Web delivery, edge services and provider-managed runtime capabilities." },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

function ProjectDetails({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const dialog = closeButton.current?.closest('[role="dialog"]');
      if (!dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handle);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <motion.div className="world-modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.section className="world-modal" role="dialog" aria-modal="true" aria-labelledby="world-modal-title" initial={{ opacity: 0, y: 18, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.99 }} transition={{ duration: 0.22, ease: "easeOut" }}>
        <div className="world-modal-top"><span>PROJECT FILE / {project.number}</span><button ref={closeButton} type="button" onClick={onClose} aria-label="Close project details">CLOSE ×</button></div>
        <p className="world-eyebrow">{project.category}</p>
        <h2 id="world-modal-title">{project.name}</h2>
        <p className="world-modal-status">CURRENT STATUS / <strong>{project.status}</strong></p>
        <p className="world-modal-description">{project.details}</p>
        <div className="world-modal-grid">
          <div><span>OVERVIEW</span><p>{project.description}</p></div>
          <div><span>IMPLEMENTATION</span><p>{project.architecture}</p></div>
        </div>
        <div className="world-modal-features"><span>DOCUMENTED CAPABILITIES</span>{project.features.map((feature) => <p key={feature}><i />{feature}</p>)}</div>
        <div className="world-modal-stack"><span>TECHNOLOGY</span><div>{project.stack.map((item) => <i key={item}>{item}</i>)}</div></div>
        {project.verificationNote && <p className="world-modal-note">{project.verificationNote}</p>}
        <div className="world-modal-actions">
          {project.repository ? <a href={project.repository} target="_blank" rel="noreferrer">OPEN VERIFIED REPOSITORY ↗</a> : <span>Repository not publicly linked</span>}
          <button type="button" onClick={onClose}>RETURN TO WORLD</button>
        </div>
      </motion.section>
    </motion.div>
  );
}

export function ImmersiveWorld() {
  const [mode, setMode] = useState<"explore" | "quick">("explore");
  const [paused, setPaused] = useState(false);
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [architectureFocus, setArchitectureFocus] = useState(architectureNodes[0].id);
  const [activeFilter, setActiveFilter] = useState("All projects");
  const closeProject = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 760px)").matches;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    const probe = document.createElement("canvas");
    const webglAvailable = Boolean(probe.getContext("webgl2") || probe.getContext("webgl"));
    setSceneEnabled(!reduced && !small && memory >= 4 && cores >= 4 && webglAvailable);
    setPaused(reduced);
  }, []);

  const navigate = useCallback((id: string) => scrollToSection(id), []);
  const markSceneReady = useCallback(() => setSceneReady(true), []);
  const selectedArchitecture = useMemo(
    () => architectureNodes.find((node) => node.id === architectureFocus) ?? architectureNodes[0],
    [architectureFocus],
  );
  const filteredProjects = useMemo(() => projects.filter((project) => activeFilter === "All projects" || project.status === activeFilter), [activeFilter]);

  return (
    <div className="game-portfolio">
      <ScrollMotion />
      <a className="world-skip" href="#main-content">Skip to content</a>
      <header className="world-header">
        <a className="world-brand" href="#top" aria-label="Umang Sharma — home"><span className="world-brand-mark">U<span>.</span></span><span>UMANG SHARMA<small>BUILDER / SYSTEMS / EXPERIENCE</small></span></a>
        <nav className="world-quick-nav" aria-label="Quick navigation">
          <a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="/platform-engineering">DevOps</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
        </nav>
        <div className="world-mode-switch" role="group" aria-label="Navigation mode">
          <button type="button" aria-pressed={mode === "explore"} className={mode === "explore" ? "is-active" : ""} onClick={() => setMode("explore")}>EXPLORE</button>
          <button type="button" aria-pressed={mode === "quick"} className={mode === "quick" ? "is-active" : ""} onClick={() => setMode("quick")}>QUICK NAV</button>
        </div>
      </header>

      <main id="main-content">
        <section className={"world-hero" + (mode === "quick" ? " is-quick" : "")} id="top">
          <div className="world-hero-backdrop" aria-hidden="true"><span /><i /><b /></div>
          {sceneEnabled && <div className="world-scene" role="group" aria-label="Interactive 3D portfolio world"><PortfolioScene paused={paused} onNavigate={navigate} onReady={markSceneReady} /></div>}
          {!sceneEnabled && <div className="world-static-orb" aria-hidden="true"><span /><i /><b /></div>}
          {sceneEnabled && !sceneReady && <div className="world-loading-overlay" role="status" aria-live="polite"><span className="world-loader-ring" /><span>INITIALIZING PORTFOLIO WORLD</span></div>}
          <div className="world-hero-copy">
            <p className="world-eyebrow"><i /> INDEPENDENT BUILDER / FOUNDER AT TRUV TECH &amp; CONSULTANCY</p>
            <h1>UMANG<br /><em>SHARMA.</em></h1>
            <p className="world-roles">VIBE CODER <span>·</span> SYSTEMS BUILDER <span>·</span> AI SOLUTIONS ARCHITECT</p>
            <p className="world-intro">I turn ideas into practical digital products through AI-assisted development, modern engineering, and business-focused execution.</p>
            <div className="world-actions">
              <a className="world-primary" href="#about">START EXPLORING <span>↗</span></a>
              <a className="world-secondary" href="/platform-engineering">PLATFORM ENGINEERING <span>↗</span></a>
            </div>
            <div className="world-meta"><span>INDIA / 2026</span><span>PRODUCTS · SYSTEMS · DELIVERY</span><span>TRUV TECH &amp; CONSULTANCY</span></div>
          </div>
          {mode === "explore" && <aside className="world-portals" aria-label="Explore portfolio areas">
            <span className="world-portals-heading">SELECT A DESTINATION <i>06 AREAS</i></span>
            {destinations.map((item) => <button type="button" key={item.id} onClick={() => navigate(item.id)}><span>{item.number}</span><strong>{item.label}<small>{item.detail}</small></strong><b>↗</b></button>)}
          </aside>}
          <div className="world-hero-bottom"><span>INTERACTIVE PORTFOLIO / BUILD 001</span><span>{sceneEnabled ? "3D WORLD READY" : "LIGHTWEIGHT MODE"}</span><span>SCROLL TO DESCEND ↓</span></div>
          {sceneEnabled && <button className="world-motion-toggle" type="button" onClick={() => setPaused((value) => !value)}>{paused ? "RESUME WORLD" : "PAUSE WORLD"}</button>}
        </section>

        <section className="world-section world-about" id="about">
          <div className="world-section-label"><span>01 / ABOUT ME</span><span>THE PERSON BEHIND THE BUILDS</span></div>
          <div className="world-split">
            <div className="world-section-title game-reveal"><p className="world-eyebrow">CURIOUS BY DEFAULT / PRACTICAL BY DESIGN</p><h2>Ideas become<br /><em>working systems.</em></h2></div>
            <div className="world-about-copy game-reveal"><p className="world-lead">I’m Umang Sharma — Vibe Coder, Systems Builder, AI Solutions Architect and Founder at TRUV Tech &amp; Consultancy.</p><p>I work across product engineering, business automation and platform delivery. I like taking a real operational problem, finding the simplest useful system behind it, then building and verifying the experience end to end.</p><p>My approach combines AI-assisted development with hands-on implementation, repository-level engineering, deployment workflows and a strong focus on usability.</p><div className="world-social-links"><a href={links.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={links.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href={links.instagram} target="_blank" rel="noreferrer">INSTAGRAM ↗</a></div></div>
          </div>
          <div className="world-values"><article><span>01</span><strong>Understand</strong><p>Start with the real workflow and its constraints.</p></article><article><span>02</span><strong>Architect</strong><p>Choose practical boundaries, tools and delivery paths.</p></article><article><span>03</span><strong>Build</strong><p>Ship useful product behaviour, not just polished screens.</p></article><article><span>04</span><strong>Verify</strong><p>Test, document and communicate what is actually ready.</p></article></div>
        </section>

        <section className="world-section world-skills" id="skills">
          <div className="world-section-label"><span>02 / SKILLS &amp; TECHNOLOGIES</span><span>TOOLS USED IN VERIFIED BUILDS</span></div>
          <div className="world-split"><div className="world-section-title game-reveal"><p className="world-eyebrow">THE WORKING TOOLKIT</p><h2>Tools are<br /><em>the medium.</em></h2></div><p className="world-section-intro game-reveal">A practical toolkit across product engineering, data, delivery and application security. The dedicated engineering page separates hands-on repository evidence from areas still being developed.</p></div>
          <div className="world-skill-grid">{skillGroups.map((group) => <article className="game-reveal" key={group.title}><span>{group.title}</span><div>{group.items.map((item) => <i key={item}>{item}</i>)}</div></article>)}</div>
          <div className="world-learning-note"><strong>DEVELOPING DEPTH</strong><p>Linux and system administration, networking fundamentals, Infrastructure as Code, monitoring and observability, and incident handling are presented as learning and growth areas unless a repository provides direct implementation evidence.</p></div>
          <div className="world-toolkit-row"><span>ADDITIONAL TOOLS</span>{toolkit.map((item) => <i key={item.name}>{item.name}</i>)}</div>
        </section>

        <section className="world-section world-projects" id="projects">
          <div className="world-section-label"><span>03 / PROJECTS</span><span>REAL BUILDS / ORIGINAL STATUS</span></div>
          <div className="world-split"><div className="world-section-title game-reveal"><p className="world-eyebrow">THE PROJECT ARCHIVE</p><h2>Built to<br /><em>solve something.</em></h2></div><p className="world-section-intro game-reveal">Six projects across product systems, business workflows and client experiences. Open a project to inspect its overview, implementation notes, stack and verification caveats.</p></div>
          <div className="world-project-filters" role="group" aria-label="Filter projects by status">{["All projects", "In Development", "Live Demo", "Client Project"].map((filter) => <button type="button" key={filter} aria-pressed={activeFilter === filter} className={activeFilter === filter ? "is-active" : ""} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
          <div className="world-project-grid">{filteredProjects.map((project) => <article className="world-project-card game-reveal" key={project.number}><button type="button" className="world-project-visual" onClick={() => setSelectedProject(project)} aria-label={"Open " + project.name + " case study"}><span>PROJECT / {project.number}</span><div className={"world-project-object object-" + project.visual}><i /><b /><em /></div><strong>OPEN CASE FILE ↗</strong></button><div className="world-project-info"><div><span className="world-status-dot" />{project.status}<b>{project.number}</b></div><h3>{project.name}</h3><p>{project.description}</p><div className="world-project-stack">{project.stack.slice(0, 4).map((item) => <i key={item}>{item}</i>)}</div><button type="button" onClick={() => setSelectedProject(project)}>EXPLORE PROJECT <span>↗</span></button></div></article>)}</div>
          <p className="world-truth-note">Project status is unchanged. Artwork is original portfolio visualisation, not a claim that it is a production screenshot or a finished client 3D model. Repository links appear only where publicly verifiable.</p>
        </section>

        <section className="world-section world-engineering" id="engineering">
          <div className="world-section-label"><span>04 / DEVOPS &amp; PLATFORM ENGINEERING</span><span>DELIVERY / RUNTIME / RELIABILITY</span></div>
          <div className="world-split"><div className="world-section-title game-reveal"><p className="world-eyebrow">FROM CODE TO RUNNING SYSTEMS</p><h2>Think beyond<br /><em>the interface.</em></h2></div><p className="world-section-intro game-reveal">My engineering work includes containerised services, CI/CD workflows, deployment configuration, data safety, tenant isolation and release documentation. The career page contains the detailed evidence and experience timeline.</p></div>
          <div className="world-architecture">
            <div className="world-architecture-heading"><span>REFERENCE ARCHITECTURE / SELECT A LAYER</span><span>CONCEPTUAL FLOW · NOT A SINGLE DEPLOYED SYSTEM</span></div>
            <div className="world-architecture-flow">{architectureNodes.map((node, index) => <div className="world-architecture-step" key={node.id}><button type="button" aria-pressed={architectureFocus === node.id} className={architectureFocus === node.id ? "is-active" : ""} onClick={() => setArchitectureFocus(node.id)}><span>0{index + 1}</span><strong>{node.title}</strong><small>{node.subtitle}</small></button>{index < architectureNodes.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div>
            <div className="world-architecture-detail" aria-live="polite"><strong>{selectedArchitecture.title}</strong><p>{selectedArchitecture.detail}</p></div>
          </div>
          <div className="world-engineering-tags"><i>Docker &amp; Compose</i><i>GitHub Actions</i><i>Vercel</i><i>Cloudflare</i><i>Linux VPS / Nginx / PM2 (documented)</i><i>PostgreSQL</i><i>Redis</i><i>Release runbooks</i><i>Security tests</i></div>
          <a className="world-engineering-link" href="/platform-engineering">OPEN PLATFORM ENGINEERING CAREER PAGE <span>↗</span></a>
        </section>

        <section className="world-section world-experience" id="experience">
          <div className="world-section-label"><span>05 / EXPERIENCE &amp; CASE STUDIES</span><span>CAREER CONTEXT / TECHNICAL EVIDENCE</span></div>
          <div className="world-split"><div className="world-section-title game-reveal"><p className="world-eyebrow">WORK, OWNERSHIP &amp; LEARNING</p><h2>Experience<br /><em>in context.</em></h2></div><p className="world-section-intro game-reveal">A cross-functional path through product building, operations, project coordination and business execution. The dedicated career page provides the full timeline, education and eight repository-backed technical case studies.</p></div>
          <div className="world-experience-panel"><div><span>CAREER TIMELINE</span><strong>6 professional roles</strong><p>Founder and technical leadership, operations, project management, administration and team coordination.</p></div><div><span>TECHNICAL CASE STUDIES</span><strong>08 engineering studies</strong><p>Evidence-led work covering containers, deployment, application security, databases and delivery practices.</p></div><a href="/platform-engineering#experience">VIEW FULL EXPERIENCE &amp; CASE STUDIES ↗</a></div>
        </section>

        <section className="world-contact" id="contact">
          <div className="world-section-label"><span>06 / CONTACT</span><span>START WITH A GOOD PROBLEM</span></div>
          <div className="world-contact-copy"><p className="world-eyebrow">HAVE SOMETHING WORTH BUILDING?</p><h2>Let’s build<br /><em>what matters.</em></h2><p>Share the product, workflow or technical challenge you want to move forward. We can start with the problem and find the right way to solve it.</p><a className="world-primary" href={"mailto:" + links.email}>START A CONVERSATION ↗</a><div className="world-contact-links"><a href={"mailto:" + links.email}>{links.email}</a><a href={"tel:" + links.phone}>{links.phoneDisplay}</a><a href={links.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={links.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a></div></div>
          <footer className="world-footer"><span>UMANG SHARMA / TRUV TECH &amp; CONSULTANCY</span><span>YOUR VISION. OUR EXPERTISE.</span><span>© 2026</span></footer>
        </section>
      </main>
      <AnimatePresence>{selectedProject && <ProjectDetails project={selectedProject} onClose={closeProject} />}</AnimatePresence>
    </div>
  );
}
