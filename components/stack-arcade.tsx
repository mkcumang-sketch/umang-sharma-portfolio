"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const capabilities = [
  { title: "Next.js / React", code: "UI", color: "green", cells: [0, 1, 6, 7] },
  { title: "Voice AI", code: "VOICE", color: "amber", cells: [0, 1, 2, 8] },
  { title: "Local LLMs & MCP", code: "LLM", color: "green", cells: [0, 4, 8, 9] },
  { title: "Python Automation", code: "PY", color: "amber", cells: [0, 1, 2, 6] },
  { title: "PostgreSQL / Prisma", code: "DATA", color: "green", cells: [0, 1, 5, 6] },
  { title: "Minimalist UI & 3D", code: "FORM", color: "amber", cells: [0, 4, 5, 6] },
];

export function StackArcade() {
  const [placed, setPlaced] = useState(0);
  const reduceMotion = useReducedMotion();
  return <section className="stack-section section-shell" id="stack" aria-labelledby="stack-title">
    <div className="section-kicker"><span>09 / CAPABILITY STACK</span><span>FIT THE PIECES</span></div>
    <div className="stack-heading"><div><p className="terminal-eyebrow">C:/UMANG.DEV/STACK</p><h2 id="stack-title">Perfect fit.<br/><em>Stack your vision with mine.</em></h2></div><p>Drop a capability into the system. Each block represents a layer that can be combined around the problem—not a fixed one-size-fits-all stack.</p></div>
    <div className="stack-game">
      <div className="stack-board" aria-label="Capability blocks stacking into a grid">
        {Array.from({ length: 48 }, (_, index) => <span className="stack-cell" key={index}/>)}
        {capabilities.slice(0, placed).map((piece, index) => <motion.div key={piece.code} className={"stack-piece piece-" + piece.color} initial={reduceMotion ? false : { y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 190, damping: 18, delay: reduceMotion ? 0 : index * 0.04 }} style={{ "--piece-index": index } as React.CSSProperties}><b>{piece.code}</b></motion.div>)}
      </div>
      <div className="stack-side"><span className="terminal-eyebrow">NEXT BLOCK / {String(placed + 1).padStart(2, "0")}</span><h3>{capabilities[placed]?.title ?? "STACK COMPLETE"}</h3><p>{placed < capabilities.length ? "Add the next capability to complete the system stack." : "All six capability blocks are in place. Your project can use the layers it actually needs."}</p><button type="button" className="terminal-button" onClick={() => setPlaced((value) => value >= capabilities.length ? 0 : value + 1)}>{placed >= capabilities.length ? "Reset stack ↻" : "Drop block ↓"}</button><div className="stack-progress"><span style={{ width: (placed / capabilities.length) * 100 + "%" }}/></div><small>{placed} / {capabilities.length} BLOCKS LOCKED</small></div>
    </div>
    <div className="stack-capability-list">{capabilities.map((item, index) => <div key={item.code} className={index < placed ? "is-locked" : ""}><span>0{index + 1}</span><b>{item.title}</b><i>{index < placed ? "LOCKED" : "READY"}</i></div>)}</div>
  </section>;
}
