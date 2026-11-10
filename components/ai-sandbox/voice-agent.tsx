"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { RetroWindow } from "@/components/os-windows/retro-window";

const scenarios = [
  { label: "TRUV TECH / LEAD", title: "Inbound Client Lead Qualification", turns: [["CALLER", "Hi, I need a website and an automated lead follow-up system."], ["AI AGENT", "Absolutely. I can capture the business type, lead volume and the workflow you want to improve."], ["CALLER", "We get enquiries from WhatsApp and Instagram."], ["AI AGENT", "Got it. I’d map those into one pipeline and route each enquiry to the right next action."]] },
  { label: "LEDGEROS / COMPLIANCE", title: "Automated Billing & Compliance Follow-up", turns: [["CLIENT", "I need to know which documents are pending for this month."], ["AI AGENT", "I can walk through the pending checklist and confirm the next required step."], ["CLIENT", "Can you remind me before the due date?"], ["AI AGENT", "In a live integration, that reminder would be scheduled through the connected practice workflow."]] },
  { label: "HINGLISH / APPOINTMENT", title: "Hindi/English Support & Appointment Booking", turns: [["CALLER", "Mujhe appointment book karni hai, kal afternoon mein."], ["AI AGENT", "Bilkul. Kal afternoon ke liye preferred time aur appointment ka purpose bata dijiye."], ["CALLER", "Around 3 PM, consultation ke liye."], ["AI AGENT", "Noted. A live booking system would now check the calendar and confirm availability."]] },
] as const;

function AudioCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(bounds.width * ratio));
    canvas.height = Math.max(1, Math.floor(bounds.height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    let frame = 0;
    let raf = 0;
    const draw = (time: number) => {
      const width = bounds.width;
      const height = bounds.height;
      context.clearRect(0, 0, width, height);
      const bars = 54;
      const gap = 4;
      const barWidth = (width - (bars - 1) * gap) / bars;
      for (let index = 0; index < bars; index += 1) {
        const wave = Math.sin(index * 0.43 + time * 0.004) * 0.5 + Math.cos(index * 0.19 - time * 0.003) * 0.5;
        const envelope = active ? 0.2 + Math.abs(wave) * 0.72 : 0.08 + Math.abs(wave) * 0.15;
        const barHeight = Math.max(3, height * envelope);
        context.fillStyle = index % 7 === 0 ? "#f59e0b" : "#10b981";
        context.globalAlpha = active ? 0.9 : 0.38;
        context.fillRect(index * (barWidth + gap), (height - barHeight) / 2, barWidth, barHeight);
      }
      context.globalAlpha = 1;
      if (active && !reduceMotion) raf = window.requestAnimationFrame(draw);
    };
    draw(0);
    if (active && !reduceMotion) raf = window.requestAnimationFrame(draw);
    return () => { if (raf) window.cancelAnimationFrame(raf); };
  }, [active, reduceMotion]);
  return <canvas ref={canvasRef} className="voice-canvas" aria-label={active ? "Animated simulated audio waveform" : "Idle simulated audio waveform"} role="img"/>;
}

export function VoiceAgent() {
  const [scenario, setScenario] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [turn, setTurn] = useState(0);
  const current = scenarios[scenario];
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setTurn((value) => {
      if (value >= current.turns.length - 1) { window.clearInterval(timer); setPlaying(false); return value; }
      return value + 1;
    }), 1900);
    return () => window.clearInterval(timer);
  }, [playing, current.turns.length]);
  const chooseScenario = (index: number) => { setScenario(index); setTurn(0); setPlaying(false); };
  const play = () => { if (playing) { setPlaying(false); return; } setTurn(0); setPlaying(true); };
  return <RetroWindow title="C:/UMANG.DEV/AI/VOICE_AGENT.EXE" className="sandbox-window" accent="green">
    <div className="sandbox-label"><span className="system-chip">INTERACTIVE VOICE PIPELINE SIMULATION</span><span className="simulation-dot">SIM / NOT LIVE AUDIO</span></div>
    <div className="voice-scenario-tabs" role="tablist" aria-label="Voice agent scenarios">{scenarios.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={scenario === index} className={scenario === index ? "is-active" : ""} onClick={() => chooseScenario(index)}>{item.label}</button>)}</div>
    <h3 className="voice-scenario-title">{current.title}</h3>
    <div className="voice-wave-panel"><AudioCanvas active={playing}/><div className="voice-wave-footer"><span>{playing ? "PIPELINE / ACTIVE" : "PIPELINE / IDLE"}</span><span>SIMULATED STREAM</span></div></div>
    <div className="voice-transcript" aria-live="polite" aria-label="Sample call transcript">{current.turns.slice(0, turn + 1).map(([speaker, text], index) => <div className="transcript-line" key={index}><span className={speaker === "AI AGENT" ? "agent-speaker" : ""}>{speaker}</span><p>{text}</p></div>)}</div>
    <div className="voice-controls"><button className="terminal-button" type="button" onClick={play}>{playing ? "Pause simulation" : "▶ Play scenario"}</button><span>TTFT TARGET <b>~320ms</b></span></div>
    <div className="sandbox-stack-tags"><span>Python</span><span>Audio Streaming</span><span>WebSockets</span><span>Custom Voice Pipeline</span></div>
    <p className="sandbox-footnote">Scenario playback is scripted UI simulation. No call is placed and no live WebSocket/WebRTC endpoint is connected.</p>
  </RetroWindow>;
}
