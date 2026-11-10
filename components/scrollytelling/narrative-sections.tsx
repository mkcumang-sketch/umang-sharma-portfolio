"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useExperienceMode } from "@/components/experience-mode";

const stories = [
  { id: "pixels", code: "01 / PIXELS & TOKENS", title: "It all starts with the pixels & tokens.", copy: "Each one placed with purpose. A grid is not decoration: it is a set of decisions about rhythm, hierarchy, spacing and the feeling of a system.", art: "pixel" },
  { id: "blueprint", code: "02 / BLUEPRINT", title: "The brain sparks the blueprint.", copy: "From 3D spatial layouts and minimalist UI systems to autonomous backend pipelines, the blueprint connects the experience people see with the logic that makes it work.", art: "blueprint" },
  { id: "dna", code: "03 / DNA", title: "From this strand, everything grows.", copy: "My working DNA is a blueprint of vibe coding, systems logic, visual minimalism and operational speed. Different disciplines, connected by one clear purpose.", art: "dna" },
  { id: "craft", code: "04 / HANDS-ON EXECUTION", title: "Ideas need hands to become real.", copy: "Every platform, workflow and interface is approached as a real build: understand the problem, shape the system, connect the moving parts and test the details.", art: "craft" },
];

function PixelGrid() {
  return <div className="pixel-reveal" aria-hidden="true">{Array.from({ length: 100 }, (_, index) => <i key={index} style={{ opacity: (index % 10 === 0 || index % 7 === 0) ? 1 : 0.2 + ((index * 7) % 6) / 10 }} />)}<span>GRID / 10 × 10</span></div>;
}

function BlueprintGraph() {
  return <svg className="blueprint-graph" viewBox="0 0 560 420" role="img" aria-label="A connected system blueprint diagram">
    <g fill="none" stroke="currentColor" strokeOpacity=".28" strokeWidth="1.4"><path d="M280 210L105 88M280 210L440 72M280 210L460 335M280 210L104 336M105 88L440 72M104 336L460 335M105 88L104 336M440 72L460 335"/></g>
    <g fill="#10b981"><circle cx="280" cy="210" r="17"/><circle cx="105" cy="88" r="8"/><circle cx="440" cy="72" r="8"/><circle cx="460" cy="335" r="8"/><circle cx="104" cy="336" r="8"/></g>
    <g fill="none" stroke="#f59e0b" strokeOpacity=".7"><circle cx="280" cy="210" r="48"/><circle cx="280" cy="210" r="86" strokeDasharray="3 8"/></g>
    <g fill="currentColor" fontSize="10" fontFamily="monospace"><text x="74" y="66">INTERFACE</text><text x="411" y="48">DATA / API</text><text x="430" y="365">AUTOMATION</text><text x="66" y="365">PEOPLE</text><text x="250" y="250">CORE</text></g>
  </svg>;
}

function DnaStrand() {
  return <svg className="dna-strand" viewBox="0 0 500 420" role="img" aria-label="Animated double helix strand">
    <defs><linearGradient id="strandA" x1="0" x2="1"><stop stopColor="#10b981"/><stop offset="1" stopColor="#a7f3d0"/></linearGradient><linearGradient id="strandB" x1="0" x2="1"><stop stopColor="#f59e0b"/><stop offset="1" stopColor="#fde68a"/></linearGradient></defs>
    {Array.from({ length: 18 }, (_, index) => { const y = 24 + index * 21; const x1 = 250 + Math.sin(index * 0.52) * 122; const x2 = 250 - Math.sin(index * 0.52) * 122; return <g key={index}><path d={"M" + x1 + " " + y + "L" + x2 + " " + y} stroke="currentColor" strokeOpacity=".25"/><circle cx={x1} cy={y} r="5" fill="url(#strandA)"/><circle cx={x2} cy={y} r="5" fill="url(#strandB)"/></g>; })}
    <path d={Array.from({ length: 120 }, (_, index) => (index ? "L" : "M") + (250 + Math.sin(index * 0.19) * 122) + " " + (14 + index * 3.25)).join(" ")} fill="none" stroke="url(#strandA)" strokeWidth="4"/>
    <path d={Array.from({ length: 120 }, (_, index) => (index ? "L" : "M") + (250 - Math.sin(index * 0.19) * 122) + " " + (14 + index * 3.25)).join(" ")} fill="none" stroke="url(#strandB)" strokeWidth="4"/>
  </svg>;
}

function CraftGrid() {
  return <div className="craft-grid" aria-hidden="true"><div className="craft-card craft-back"><small>02 / BUILD</small><strong>Make it<br/>work.</strong><span>INTEGRATE / TEST / SHIP</span></div><div className="craft-card"><small>01 / THINK</small><strong>Make it<br/>clear.</strong><span>DISCOVER / MAP / DESIGN</span></div><div className="craft-stamp">BUILT<br/>WITH<br/>INTENT</div></div>;
}

function StoryArt({ type }: { type: string }) {
  if (type === "pixel") return <PixelGrid />;
  if (type === "blueprint") return <BlueprintGraph />;
  if (type === "dna") return <DnaStrand />;
  return <CraftGrid />;
}

export function CreatorCard() {
  const { mode } = useExperienceMode();
  return <section className="about-rpg section-shell" id="about" aria-labelledby="about-title">
    <div className="section-kicker"><span>PLAYER PROFILE / 001</span><span>UMANGOS.EXE</span></div>
    <div className="about-rpg-heading"><p className="terminal-eyebrow">C:/UMANG.DEV/PROFILE</p><h2 id="about-title">The creator behind<br/><em>the systems and pixels.</em></h2><p>I’m Umang Sharma — a builder who ships with clarity, automates with purpose, and cares deeply about structure, interaction and real-world execution.</p></div>
    <div className="rpg-card">
      <div className="rpg-card-top"><span>LVL. 19 <i/> KANPUR / DELHI-NCR</span><span className="rpg-online"><b/> PLAYER ONLINE</span></div>
      <div className="rpg-avatar" aria-hidden="true"><div className="avatar-grid"/><strong>U<span>.</span></strong><small>UMANG / BUILDER</small></div>
      <div className="rpg-identity"><p className="terminal-eyebrow">IDENTITY / CURRENT QUEST</p><h3>Builder. Operator.<br/>Design technologist.</h3><div className="rpg-tags"><span>Founder @ TRUV Tech &amp; Consultancy</span><span>Operations &amp; Design Lead @ Mushroom Arte</span></div><div className="rpg-mode-line"><span>ACTIVE PROFILE MODE</span><strong>{mode === "systems" ? "SYSTEMS & AI" : "DESIGN & VIBE"}</strong></div><a className="terminal-button" href="#ai-sandbox">Launch AI Sandbox <b>↗</b></a></div>
    </div>
  </section>;
}

export function NarrativeSections() {
  const reduceMotion = useReducedMotion();
  return <div className="narrative-sections">
    {stories.map((story, index) => <section className={"narrative-section narrative-" + story.art} id={story.id} key={story.id} aria-labelledby={story.id + "-title"}>
      <div className="narrative-meta"><span>{story.code}</span><span>UMANG / FIELD NOTES</span></div>
      <div className="narrative-layout">
        <motion.div className="narrative-copy" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65 }}>
          <span className="terminal-eyebrow">BUILD LOG / {String(index + 1).padStart(2, "0")}</span><h2 id={story.id + "-title"}>{story.title}</h2><p>{story.copy}</p>
          <div className="narrative-next"><span>IDEA → STRUCTURE → EXPERIENCE</span><a href={index === 3 ? "#windows" : "#" + stories[index + 1].id}>NEXT NODE <b>↘</b></a></div>
        </motion.div>
        <motion.div className="narrative-art" initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, delay: 0.08 }}><StoryArt type={story.art}/></motion.div>
      </div>
    </section>)}
  </div>;
}
