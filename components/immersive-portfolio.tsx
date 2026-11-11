"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { links, projects, services, toolkit, type Project } from "@/data/portfolio";

const filters = [
  "All Work",
  "Product Systems",
  "Web Experiences",
  "Business Automation",
  "Client Projects",
  "Personal Experiments",
] as const;

type Filter = (typeof filters)[number];

function projectMatches(project: Project, filter: Filter) {
  if (filter === "All Work") return true;
  if (filter === "Product Systems") return ["ledger", "taskflow", "crm"].includes(project.visual);
  if (filter === "Web Experiences") return ["property", "brand", "commerce"].includes(project.visual);
  if (filter === "Business Automation") return ["ledger", "taskflow", "crm"].includes(project.visual);
  if (filter === "Client Projects") return project.status === "Client Project";
  return false;
}

function showreelEmbedUrl(value?: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.hostname === "youtu.be") return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}?autoplay=1&mute=1&rel=0`;
    if (url.hostname.endsWith("youtube.com")) {
      const id = url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop();
      return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&rel=0` : null;
    }
    if (url.hostname.endsWith("vimeo.com")) {
      const id = url.pathname.split("/").filter(Boolean).pop();
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}?autoplay=1&muted=1` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function ImmersivePortfolio() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All Work");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showShowreel, setShowShowreel] = useState(false);
  const [show3DStudy, setShow3DStudy] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const showreelUrl = showreelEmbedUrl(process.env.NEXT_PUBLIC_SHOWREEL_URL);
  const visibleProjects = useMemo(
    () => projects.filter((project) => projectMatches(project, activeFilter)),
    [activeFilter],
  );
  const overlayOpen = Boolean(selectedProject || showShowreel);

  useEffect(() => {
    if (!overlayOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        setShowShowreel(false);
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), iframe[tabindex="0"]'));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [overlayOpen]);

  return (
    <div className="immersive-world">
      <a className="im-skip" href="#main-content">Skip to content</a>
      <header className="im-header">
        <a className="im-wordmark" href="#top" aria-label="Umang Sharma home">
          <span className="im-mark">U<span>.</span></span>
          <span>UMANG SHARMA<small>CREATIVE TECHNOLOGY / INDIA</small></span>
        </a>
        <nav aria-label="Main navigation" className="im-nav">
          <a href="#work">Selected work</a>
          <a href="#about">About</a>
          <a href="#services">Capabilities</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="im-availability" href={`mailto:${links.email}`}><i /> Open to conversations</a>
      </header>

      <main id="main-content">
        <section className="im-hero" id="top">
          <div className="im-hero-noise" aria-hidden="true" />
          <div className="im-hero-copy">
            <p className="im-eyebrow"><span /> INDEPENDENT BUILDER · TRUV TECH &amp; CONSULTANCY</p>
            <h1>Ideas shaped<br />into <em>experiences.</em></h1>
            <p className="im-intro">I’m Umang Sharma — a vibe coder, systems builder and technical product creator. I turn ambitious ideas into useful digital products through engineering, interaction and visual storytelling.</p>
            <div className="im-hero-actions">
              <a className="im-button" href="#work">Explore selected work <span>↗</span></a>
              <button className="im-play" type="button" onClick={() => setShowShowreel(true)}><span>▶</span> Open showreel</button>
            </div>
            <div className="im-hero-meta"><span>BASED IN INDIA</span><span>PRODUCT / SYSTEMS / EXPERIENCE</span><span>2026 — NOW</span></div>
          </div>
          <div className="im-stage" role="img" aria-label="Abstract three-dimensional sculptural form floating above a dark studio plinth">
            <div className="im-stage-halo" />
            <div className="im-stage-grid" />
            <div className="im-orbit im-orbit-a" />
            <div className="im-orbit im-orbit-b" />
            <div className="im-sculpture">
              <div className="im-sculpture-core"><span /><i /><b /></div>
              <div className="im-sculpture-loop" />
              <div className="im-sculpture-shard" />
            </div>
            <div className="im-stage-plinth"><span>FORM / FUNCTION / FLOW</span><b>U—001</b></div>
            <span className="im-coordinate im-coordinate-a">FIG. 01 / STUDY IN MOTION</span>
            <span className="im-coordinate im-coordinate-b">X 04.18 · Y 08.26</span>
          </div>
          <div className="im-scroll-cue"><span>SCROLL TO EXPLORE</span><i /></div>
          <div className="im-hero-index">01 <span>/</span> 05</div>
        </section>

        <section className="im-section im-work" id="work">
          <div className="im-section-top"><span>01 / SELECTED WORK</span><span>VERIFIED BUILDS · PROJECT ARCHIVE</span></div>
          <div className="im-section-heading">
            <div><p className="im-eyebrow">A FEW WORLDS IN PROGRESS</p><h2>Work with<br /><em>real purpose.</em></h2></div>
            <p>Digital products, operational systems and client experiences. Each project is shown with its actual stage and verified technical context — no invented client credits or render claims.</p>
          </div>
          <div className="im-filters" role="group" aria-label="Filter projects">
            {filters.map((filter) => <button type="button" key={filter} className={activeFilter === filter ? "is-active" : ""} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
          </div>
          <div className="im-project-grid">
            {visibleProjects.map((project, index) => (
              <article className={`im-project im-project-${index % 3}`} key={project.number}>
                <button className="im-project-open" type="button" onClick={() => { setSelectedProject(project); setShow3DStudy(false); }} aria-label={`Open ${project.name} project details`}>
                  <span className="im-project-art" aria-hidden="true">
                    <span className="im-art-index">PROJECT / {project.number}</span>
                    <span className={`im-art-object art-${project.visual}`}><i /><b /><em /></span>
                    <span className="im-art-caption">{project.category}</span>
                    <span className="im-art-open">VIEW CASE STUDY ↗</span>
                  </span>
                  <span className="im-project-info">
                    <span className="im-project-status"><i className={project.status === "Live Demo" ? "is-live" : ""} />{project.status}<b>{project.number}</b></span>
                    <strong>{project.name}</strong>
                    <span className="im-project-description">{project.description}</span>
                    <span className="im-project-stack">{project.stack.slice(0, 3).map((item) => <i key={item}>{item}</i>)}</span>
                  </span>
                </button>
              </article>
            ))}
          </div>
          {visibleProjects.length === 0 && <p className="im-empty">No published work in this category yet. New experiments will appear here when ready.</p>}
          <p className="im-work-note">Project visuals on this page are original CSS studies. They are not presented as client renders, finished 3D assets or production screenshots.</p>
        </section>

        <section className="im-section im-about" id="about">
          <div className="im-section-top"><span>02 / THE MAKER</span><span>ABOUT UMANG</span></div>
          <div className="im-about-grid">
            <div className="im-about-art" aria-hidden="true"><div className="im-about-ring" /><div className="im-about-monogram">U<span>.</span></div><span>BUILDER / CREATIVE TECHNOLOGY</span></div>
            <div className="im-about-copy"><p className="im-eyebrow">CURIOUS BY DEFAULT. PRACTICAL BY DESIGN.</p><h2>Build with<br /><em>intention.</em></h2><p>I’m the founder of TRUV TECH &amp; CONSULTANCY. My work sits between product engineering, business automation and digital experience design — understanding a real-world problem, shaping a clear direction and building a system people can use.</p><p>I care about the details that make technology feel considered: strong visual hierarchy, purposeful motion, responsive behaviour and reliable foundations.</p><a href={links.linkedin} target="_blank" rel="noreferrer">CONNECT ON LINKEDIN ↗</a></div>
          </div>
          <div className="im-process">
            <div><span>01</span><strong>Understand</strong><p>Map the problem, people and workflow.</p></div>
            <div><span>02</span><strong>Shape</strong><p>Explore structure, interaction and visual direction.</p></div>
            <div><span>03</span><strong>Build</strong><p>Turn the strongest idea into a working product.</p></div>
            <div><span>04</span><strong>Verify</strong><p>Test real flows, edge cases and device behaviour.</p></div>
          </div>
        </section>

        <section className="im-section im-capabilities" id="services">
          <div className="im-section-top"><span>03 / CAPABILITIES</span><span>WHAT I CAN HELP CREATE</span></div>
          <div className="im-section-heading"><div><p className="im-eyebrow">FROM CONCEPT TO WORKING SYSTEM</p><h2>Make the<br /><em>complex clear.</em></h2></div><p>TRUV TECH &amp; CONSULTANCY brings technology and consultancy together around the workflow that needs to work better.</p></div>
          <div className="im-capability-grid">{services.map((service, index) => <article key={service.name}><span>0{index + 1} / {service.group}</span><h3>{service.name}</h3><p>{service.note}</p><i>↗</i></article>)}</div>
          <div className="im-toolkit"><div><p className="im-eyebrow">TOOLS / WORKING TOOLKIT</p><h3>Built on useful tools.</h3></div><div className="im-tool-list">{toolkit.map((item) => <span key={item.name}>{item.name}</span>)}</div></div>
        </section>

        <section className="im-contact" id="contact">
          <div className="im-section-top"><span>04 / CONTACT</span><span>START SOMETHING USEFUL</span></div>
          <div className="im-contact-orb" aria-hidden="true"><span>LET’S<br />BUILD</span></div>
          <div className="im-contact-copy"><p className="im-eyebrow">HAVE A GOOD PROBLEM TO SOLVE?</p><h2>Let’s make<br /><em>it happen.</em></h2><p>Tell me what you’re building, improving or trying to automate. We can start with the problem and work toward the right solution.</p><a className="im-button" href={`mailto:${links.email}`}>Start a conversation <span>↗</span></a><div className="im-socials"><a href={links.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={links.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href={links.instagram} target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href={`tel:${links.phone}`}>{links.phoneDisplay}</a></div><p className="im-contact-email">{links.email}</p></div>
          <footer className="im-footer"><span>UMANG SHARMA · TRUV TECH &amp; CONSULTANCY</span><span>YOUR VISION. OUR EXPERTISE.</span><span>© 2026</span></footer>
        </section>
      </main>

      {(selectedProject || showShowreel) && <div className="im-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) { setSelectedProject(null); setShowShowreel(false); } }}>
        <div className="im-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-label={showShowreel ? "Showreel" : `${selectedProject?.name} case study`}>
          <div className="im-dialog-top"><span>{showShowreel ? "SHOWREEL / INTRODUCTION" : `CASE STUDY / ${selectedProject?.number}`}</span><button ref={closeRef} type="button" onClick={() => { setSelectedProject(null); setShowShowreel(false); }} aria-label="Close dialog">CLOSE ×</button></div>
          {showShowreel ? <div className="im-showreel">
            <p className="im-eyebrow">A SHORT INTRODUCTION</p><h2>Selected work.<br /><em>In motion.</em></h2>
            {showreelUrl ? <div className="im-video-frame"><iframe src={showreelUrl} title="Umang Sharma showreel" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></div> : <div className="im-showreel-placeholder"><div className="im-placeholder-shape">U<span>.</span></div><strong>Showreel slot ready</strong><p>Add a public YouTube or Vimeo URL as <code>NEXT_PUBLIC_SHOWREEL_URL</code> in the Vercel project environment to activate the embedded reel. No demo video or third-party work has been substituted.</p></div>}
          </div> : selectedProject && <div className="im-case-study">
            <p className="im-eyebrow">{selectedProject.category}</p><h2>{selectedProject.name}</h2><div className="im-case-meta"><span>STATUS / {selectedProject.status}</span><span>PROJECT / {selectedProject.number}</span><span>STACK / {selectedProject.stack.slice(0, 2).join(" · ")}</span></div>
            <section><span>01 / OVERVIEW</span><p>{selectedProject.details}</p></section>
            <section><span>02 / DIRECTION &amp; SCOPE</span><p>{selectedProject.description}</p><div className="im-case-features">{selectedProject.features.map((feature) => <div key={feature}><i />{feature}</div>)}</div></section>
            <section><span>03 / BUILD BREAKDOWN</span><p>{selectedProject.architecture}</p><div className="im-case-tags">{selectedProject.stack.map((tag) => <i key={tag}>{tag}</i>)}</div></section>
            <section><span>04 / VISUAL STUDY</span><p>The abstract artwork above is a CSS-generated portfolio study. Production screenshots, original renders, wireframes and turntable footage can be added when the approved project assets are supplied.</p><button className="im-study-toggle" type="button" aria-expanded={show3DStudy} onClick={() => setShow3DStudy((value) => !value)}>{show3DStudy ? "HIDE 3D STUDY" : "VIEW 3D STUDY"} ↗</button>{show3DStudy && <div className="im-mini-study" aria-label="CSS generated 3D study"><div className="im-mini-study-object"><i /><b /><em /></div><span>INTERACTIVE CSS STUDY / NOT A GLB MODEL</span></div>}</section>
            {selectedProject.verificationNote && <p className="im-case-note">{selectedProject.verificationNote}</p>}
            <div className="im-case-actions">{selectedProject.repository ? <a href={selectedProject.repository} target="_blank" rel="noreferrer">OPEN PROJECT REPOSITORY ↗</a> : <span>Private / unpublished repository</span>}<button type="button" onClick={() => setSelectedProject(null)}>BACK TO WORK</button></div>
          </div>}
        </div>
      </div>}
    </div>
  );
}
