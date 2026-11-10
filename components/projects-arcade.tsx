"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/portfolio";

type FeaturedProject = {
  id: string; title: string; organization: string; role: string; year: string; type: string; status: string;
  description: string; stack: string[]; links: { label: string; href: string }[];
};

const featured: FeaturedProject[] = [
  { id: "voice", title: "AI Voice Agent Platform", organization: "TRUV Tech", role: "Product & Systems Builder", year: "2026 / SNAPSHOT", type: "AI SYSTEMS / VOICE AUTOMATION", status: "Interactive simulation", description: "A voice-agent showcase exploring lead qualification, compliance follow-up and Hinglish appointment flows. The portfolio demo is scripted; no live telephony or audio endpoint is connected.", stack: ["Python", "Audio Streaming", "WebSockets", "Voice Pipeline"], links: [] },
  { id: "llm", title: "Custom LLM Assistant & MCP Automation Suite", organization: "TRUV Tech", role: "Product & Systems Builder", year: "2026 / SNAPSHOT", type: "LLM INFRASTRUCTURE / MCP", status: "Architecture demo", description: "A reference architecture for local model runtimes, a LiteLLM routing layer, MCP tool interfaces and Python automation bridges. This portfolio terminal uses curated responses rather than a live model.", stack: ["Ollama", "LiteLLM", "MCP", "Python"], links: [] },
  { id: "ledger", title: "TRUV CA / LedgerOS", organization: "TRUV Tech", role: "Founder / Product Builder", year: "2026 / SNAPSHOT", type: "ENTERPRISE CA PLATFORM", status: "In Development", description: "A developing CA practice workspace focused on accounting workflows, GST-related operations and practice automation. Planned workflows are not presented as released features.", stack: ["Next.js", "TypeScript", "Prisma", "Workflow design"], links: [{ label: "Repository", href: "https://github.com/mkcumang-sketch/truvledgeros2" }] },
  { id: "crm", title: "TRUV Tech CRM", organization: "TRUV Tech", role: "Founder / Product Builder", year: "2026 / SNAPSHOT", type: "FULL-STACK / BUSINESS OPERATIONS", status: "Live Demo (status supplied)", description: "A business-oriented CRM and operational platform for lead visibility, communication, workflows and follow-up. A public demo URL is not listed because one has not been verified.", stack: ["CRM workflows", "Communication", "Dashboards"], links: [] },
  { id: "web", title: "Web Platforms / Commerce & Workflow", organization: "Web Platforms", role: "Product Builder", year: "2026 / SNAPSHOT", type: "UI / UX / ANALYTICS / E-COMMERCE", status: "Mixed project stages", description: "A grouped showcase of EssentialRush, Ask2Global / TaskFlow and Dream Properties. Each project's approved stage is retained below; this grouping does not imply a shared client or product.", stack: ["Next.js", "React", "Commerce", "Task workflows"], links: [{ label: "EssentialRush repo", href: "https://github.com/mkcumang-sketch/EssentialRush" }, { label: "TaskFlow repo", href: "https://github.com/mkcumang-sketch/TaskFlowAsk2" }, { label: "Dream Properties repo", href: "https://github.com/mkcumang-sketch/DreamProperties" }] },
  { id: "mushroom", title: "Mushroom Arte / Architecture & Interiors", organization: "Mushroom Arte", role: "Operations & Design Lead", year: "2026 / SNAPSHOT", type: "3D VISUALIZATION / ESTIMATION / BRAND SYSTEMS", status: "Role supplied by Umang", description: "A professional role and work area supplied by Umang. This card intentionally avoids inventing client names, project metrics, dates or public case-study links.", stack: ["Architecture", "Interiors", "3D Visualization", "Estimation"], links: [] },
];

export function ProjectsArcade() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<FeaturedProject | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  const move = (direction: number) => setActive((value) => (value + direction + featured.length) % featured.length);
  const inspectRandom = () => {
    const next = (active + 1 + Math.floor(Math.random() * (featured.length - 1))) % featured.length;
    setActive(next);
    setSelected(featured[next]);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("input, textarea, select, [contenteditable=true]")) return;
    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") { event.preventDefault(); move(1); }
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") { event.preventDefault(); move(-1); }
    if (event.code === "Space" && target === event.currentTarget) { event.preventDefault(); inspectRandom(); }
  };

  const current = featured[active];
  return <section className="projects-section section-shell" id="projects" aria-labelledby="projects-title" tabIndex={0} onKeyDown={onKeyDown}>
    <div className="section-kicker"><span>08 / PROJECT ARCADE</span><span>SELECT / INSPECT / EXPLORE</span></div>
    <div className="projects-heading"><div><p className="terminal-eyebrow">C:/UMANG.DEV/PROJECTS</p><h2 id="projects-title">Work with a<br/><em>point of view.</em></h2></div><p>Products, capabilities and project snapshots. The year shown is the current portfolio snapshot—not a claimed project launch date.</p></div>
    <div className="arcade-bar">
      <div className="arcade-controls"><span className="arcade-label">GRAB A PROJECT</span><button type="button" onClick={() => move(-1)} aria-label="Previous project">←</button><button type="button" onClick={() => move(1)} aria-label="Next project">→</button><button type="button" onClick={inspectRandom}>SPACE / RANDOM INSPECT</button></div>
      <div className="arcade-hints"><kbd>←</kbd><kbd>→</kbd> or <kbd>A</kbd><kbd>D</kbd> MOVE <span/> <kbd>SPACE</kbd> INSPECT</div>
    </div>
    <div className="arcade-feature">
      <motion.div className="arcade-feature-visual" key={current.id} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <span className="preview-window-bar"><i/><i/><i/><b>{current.id.toUpperCase()}_PREVIEW.EXE</b></span>
        <div className={"preview-composition preview-" + current.id}><span>{current.organization}</span><strong>{current.title}</strong><small>{current.type}</small><div className="preview-orbit"/><div className="preview-scanline"/></div>
        <span className="preview-index">PROJECT / {String(active + 1).padStart(2, "0")} — 06</span>
      </motion.div>
      <div className="arcade-feature-copy">
        <div className="project-meta-row"><span>{current.year}</span><span>{current.status}</span></div>
        <p className="terminal-eyebrow">{current.organization} / {current.role}</p>
        <h3>{current.title}</h3><p>{current.description}</p>
        <div className="project-tech-tags">{current.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-detail-actions"><button type="button" className="terminal-button" onClick={() => setSelected(current)}>Inspect project <b>↗</b></button>{current.links.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>{link.label} ↗</a>)}</div>
      </div>
    </div>
    <div className="arcade-selector" aria-label="Select a project">{featured.map((item, index) => <button type="button" key={item.id} className={active === index ? "is-selected" : ""} onClick={() => setActive(index)} aria-pressed={active === index}><span>{String(index + 1).padStart(2, "0")}</span><b>{item.title}</b><i/></button>)}</div>
    <div className="project-archive"><p className="terminal-eyebrow">PROJECT STATUS ARCHIVE / SOURCE RECORDS</p>{projects.map((project) => <div className="archive-row" key={project.number}><span>{project.number}</span><strong>{project.name}</strong><span>{project.status}</span>{project.repository ? <a href={project.repository} target="_blank" rel="noreferrer">REPO ↗</a> : <span>NO PUBLIC LINK</span>}</div>)}</div>
    <dialog className="project-dialog" ref={dialogRef} aria-labelledby="project-dialog-title" onClose={() => setSelected(null)}>
      {selected && <div className="project-dialog-inner"><div className="dialog-topline"><span>PROJECT INSPECTOR / {selected.id.toUpperCase()}</span><button type="button" onClick={() => setSelected(null)} aria-label="Close project details">×</button></div><p className="terminal-eyebrow">{selected.organization} / {selected.year}</p><h3 id="project-dialog-title">{selected.title}</h3><p>{selected.description}</p><div className="project-tech-tags">{selected.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="dialog-links">{selected.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div></div>}
    </dialog>
  </section>;
}
