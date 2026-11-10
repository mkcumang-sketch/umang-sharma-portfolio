"use client";

import { useEffect, useState } from "react";

const navItems = [
  ["Story", "#pixels"],
  ["About", "#about"],
  ["Systems", "#systems"],
  ["Work", "#work"],
  ["Toolkit", "#toolkit"],
  ["Contact", "#contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = commandOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [commandOpen]);

  const navigate = (href: string) => {
    setOpen(false);
    setCommandOpen(false);
    window.location.hash = href.slice(1);
  };

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Umang Sharma home">
          <span className="wordmark-symbol">U<span>.</span></span>
          <span className="wordmark-copy">UMANG SHARMA<small>INDEPENDENT BUILDER</small></span>
        </a>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Start a project <span>↗</span></a>
        </nav>
        <div className="header-actions">
          <button className="command-trigger" onClick={() => setCommandOpen(true)} aria-label="Open command menu">
            <span>CTRL K</span>
          </button>
          <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"}>
            <span /><span />
          </button>
        </div>
      </header>
      {commandOpen && (
        <div className="command-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCommandOpen(false); }}>
          <section className="command-panel" role="dialog" aria-modal="true" aria-labelledby="command-title">
            <div className="command-heading"><span id="command-title">QUICK NAVIGATION</span><button onClick={() => setCommandOpen(false)} aria-label="Close command menu">ESC</button></div>
            <div className="command-list">
              {navItems.map(([label, href], index) => (
                <button key={href} onClick={() => navigate(href)}><span className="command-index">0{index + 1}</span>{label}<span className="command-arrow">↗</span></button>
              ))}
              <a href="https://github.com/mkcumang-sketch" target="_blank" rel="noreferrer"><span className="command-index">↗</span>GitHub profile<span className="command-arrow">↗</span></a>
              <a href="mailto:truvtechteam@gmail.com"><span className="command-index">↗</span>Send an email<span className="command-arrow">↗</span></a>
            </div>
            <p>Use <kbd>ESC</kbd> to close · <kbd>⌘</kbd>/<kbd>CTRL</kbd> + <kbd>K</kbd> to toggle</p>
          </section>
        </div>
      )}
    </>
  );
}