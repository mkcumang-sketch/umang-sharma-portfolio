"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type RetroWindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
  index?: number;
  cascade?: boolean;
  accent?: "green" | "amber";
};

export function RetroWindow({ title, children, className = "", index = 0, cascade = false, accent = "green" }: RetroWindowProps) {
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [closed, setClosed] = useState(false);
  const reduceMotion = useReducedMotion();

  if (closed) return <div className="window-closed"><span>{title}</span><button type="button" onClick={() => setClosed(false)}>Restore window ↗</button></div>;

  const style = cascade ? ({ left: (5 + index * 2.2) + "%", top: (index * 23) + "px", zIndex: 10 + index } as CSSProperties) : undefined;
  return (
    <motion.section
      className={"retro-window " + (minimized ? "is-minimized " : "") + (maximized ? "is-maximized " : "") + className}
      style={style}
      drag={!maximized && !reduceMotion}
      dragMomentum={false}
      dragElastic={0.04}
      initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.42, delay: index * 0.045 }}
      aria-label={title}
    >
      <header className="retro-window-bar">
        <span className={"window-status-led " + (accent === "amber" ? "is-amber" : "")} />
        <span className="retro-window-title">{title}</span>
        <div className="retro-window-controls">
          <button type="button" aria-label={"Minimize " + title} onClick={() => setMinimized((value) => !value)}>−</button>
          <button type="button" aria-label={maximized ? "Restore " + title : "Maximize " + title} onClick={() => setMaximized((value) => !value)}>□</button>
          <button type="button" aria-label={"Close " + title} onClick={() => setClosed(true)}>×</button>
        </div>
      </header>
      {!minimized && <div className="retro-window-body">{children}</div>}
    </motion.section>
  );
}
