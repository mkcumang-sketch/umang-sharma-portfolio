"use client";

import { RetroWindow } from "@/components/os-windows/retro-window";

const bootWindows = [
  ["system.alert", "Initializing UmangOS creative & AI modules…"],
  ["voice_engine.exe", "Calibrating low-latency real-time voice agent pipelines…"],
  ["llm_router.dll", "Mounting Ollama, LiteLLM proxy & MCP tool servers… Complete."],
  ["vibe_coder.sys", "Syncing Cursor + Next.js + Tailwind minimalist design tokens…"],
  ["whatsapp_bridge.exe", "Connecting automated Python action handlers & CRM triggers…"],
  ["truv_ledgeros.sys", "Loading enterprise Chartered Accountant practice modules…"],
  ["spatial_3d.dll", "Rendering architectural & modular visualization assets…"],
  ["system.scan", "Scanning execution velocity… Levels optimal."],
  ["portfolio_loader.sys", "Assembling projects from /Umang/TRUV_Tech…"],
  ["portfolio.exe", "The interactive portfolio & AI sandbox are ready. Open now?"],
] as const;

export function WindowCascade() {
  return <section className="windows-section section-shell" id="windows" aria-labelledby="windows-title">
    <div className="section-kicker"><span>05 / BOOT SEQUENCE</span><span>UMANGOS / WINDOW MANAGER</span></div>
    <div className="windows-heading"><div><p className="terminal-eyebrow">C:/UMANG.DEV/BOOT</p><h2 id="windows-title">A little chaos.<br/><em>A lot of architecture.</em></h2></div><p>Ten processes, one connected system. Drag the windows on desktop, minimize what you don’t need, or restore any closed process.</p></div>
    <div className="window-cascade-stage">
      {bootWindows.map(([title, copy], index) => <RetroWindow key={title} title={title} index={index} cascade accent={index === 9 ? "amber" : "green"} className={"boot-window boot-window-" + index}>
        <div className="boot-window-content"><span className="boot-window-index">PROCESS {String(index + 1).padStart(2, "0")} / 10</span><p>{copy}</p>{index === 9 && <div className="boot-window-actions"><a className="terminal-button" href="#ai-sandbox">Explore AI Sandbox ↗</a><a className="terminal-button terminal-button-muted" href="#projects">View Projects ↘</a></div>}</div>
      </RetroWindow>)}
    </div>
    <p className="window-hint"><kbd>DRAG</kbd> MOVE WINDOW <span/> <kbd>□</kbd> MAXIMIZE <span/> <kbd>×</kbd> CLOSE</p>
  </section>;
}
