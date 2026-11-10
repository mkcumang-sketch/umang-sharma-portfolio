"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import type { PointerEvent } from "react";
import type { Project } from "@/data/portfolio";

const visualLabels: Record<Project["visual"], string> = {
  ledger: "FINANCIAL WORKSPACE",
  commerce: "COMMERCE EXPERIENCE",
  automation: "AUTOMATION PIPELINE",
  taskflow: "WORKFLOW BOARD",
  property: "PROPERTY DISCOVERY",
  crm: "CUSTOMER OPERATIONS",
  brand: "BRAND SYSTEM",
};

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual visual-${project.visual}`} aria-hidden="true">
      <div className="visual-topline"><span>PROJECT / {project.number}</span><span>{visualLabels[project.visual]}</span></div>
      {project.visual === "ledger" && <div className="mini-window ledger-window"><div className="mini-window-top"><span>TRUV / LEDGEROS</span><span>•••</span></div><div className="ledger-content"><aside><i /><i /><i /><i /></aside><div className="ledger-main"><small>WORKSPACE OVERVIEW</small><b>Practice operations</b><div className="ledger-bars"><i /><i /><i /><i /><i /><i /></div><div className="ledger-rows"><span /><span /><span /></div></div></div></div>}
      {project.visual === "commerce" && <div className="commerce-window"><div className="commerce-head">essential<span>rush.</span><small>CURATED GOODS</small></div><div className="commerce-items"><i /><i /><i /></div><div className="commerce-foot"><span>DISCOVER / SELECT / SHOP</span><span>01—03</span></div></div>}
      {project.visual === "automation" && <div className="automation-flow"><div className="flow-node">TRIGGER</div><span className="flow-connector" /><div className="flow-node active-flow">AGENT</div><span className="flow-connector" /><div className="flow-node">ACTION</div><div className="flow-terminal">EVENT → ROUTE → RESULT</div></div>}
      {project.visual === "taskflow" && <div className="task-window"><div className="task-window-title">TASKFLOW <span>SPRINT / 04</span></div>{["Define workflow", "Review incoming work", "Share progress"].map((item, i) => <div className="task-line" key={item}><i className={i === 0 ? "task-done" : ""} /><span>{item}</span><small>{["DONE", "ACTIVE", "NEXT"][i]}</small></div>)}</div>}
      {project.visual === "property" && <div className="property-composition"><div className="property-sun" /><div className="property-building"><i /><i /><i /><i /><i /><i /><i /><i /></div><span>SPACE / PLACE / POSSIBILITY</span></div>}
      {project.visual === "crm" && <div className="crm-composition"><div className="crm-rail"><i /><i /><i /></div><div className="crm-pipeline"><span>LEADS</span><span>FOLLOW-UP</span><span>CONVERSATIONS</span><span>OPERATIONS</span></div><div className="crm-cursor">+</div></div>}
      {project.visual === "brand" && <div className="brand-composition"><b>TRUV<span>.</span></b><small>YOUR VISION. OUR EXPERTISE.</small></div>}
      <div className="visual-bottomline"><span>{project.name.toUpperCase()}</span><span>↗</span></div>
    </div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [2.5, -2.5]), { stiffness: 140, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-2.5, 2.5]), { stiffness: 140, damping: 20 });

  const onMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const statusClass = project.status === "Live Demo" ? "status-live" : project.status === "Client Project" ? "status-client" : "status-build";

  return (
    <motion.article className="project-card" style={reduceMotion ? undefined : { rotateX, rotateY }} onPointerMove={onMove} onPointerLeave={() => { x.set(0); y.set(0); }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.58, delay: (index % 2) * 0.08 }}>
      <ProjectVisual project={project} />
      <div className="project-info">
        <div className="project-info-main"><span className="project-category">{project.category}</span><h3>{project.name}</h3></div>
        <span className={`project-status ${statusClass}`}>{project.status}</span>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="project-links">
        <button className="details-toggle" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
          {expanded ? "Close case notes" : "View case notes"}<span>{expanded ? "−" : "+"}</span>
        </button>
        {project.repository ? <a href={project.repository} target="_blank" rel="noreferrer">Repository <span>↗</span></a> : <span className="no-public-link">No public demo link listed</span>}
      </div>
      {expanded && <div className="project-details"><p>{project.details}</p><div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>}
    </motion.article>
  );
}