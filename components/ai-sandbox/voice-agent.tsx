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
    let raf = 0;
    const draw = (time: number) => {
      context.clearRect(0, 0, bounds.width, bounds.height);
      const bars = 54;
      const gap = 4;
      const barWidth = (bounds.width - (bars - 1) * gap) / bars;
      for (let index = 0; index < bars; index += 1) {
        const wave = Math.sin(index * 0.43 + time * 0.004) * 0.5 + Math.cos(index * 0.19 - time * 0.003) * 0.5;
        const envelope = active ? 0.2 + Math.abs(wave) * 0.72 : 0.08 + Math.abs(wave) * 0.15;
        const barHeight = Math.max(3, bounds.height * envelope);
        context.fillStyle = index % 7 === 0 ? "#f59e0b" : "#10b981";
        context.globalAlpha = active ? 0.9 : 0.38;
        context.fillRect(index * (barWidth + gap), (bounds.height - barHeight) / 2, barWidth, barHeight);
      }
      context.globalAlpha = 1;
      if (active && !reduceMotion) raf = window.requestAnimationFrame(draw);
    };
    draw(0);
    if (active && !reduceMotion) raf = window.requestAnimationFrame(draw);
    return () => { if (raf) window.cancelAnimationFrame(raf); };
  }, [active, reduceMotion]);
  return <canvas ref={canvasRef} className="voice-canvas" aria-label="Decorative voice pipeline waveform" role="img"/>;
}

export function VoiceAgent() {
  const [scenario, setScenario] = useState(0);
  const [turn, setTurn] = useState(0);
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [attemptId, setAttemptId] = useState("");
  const current = scenarios[scenario];

  const chooseScenario = (index: number) => { setScenario(index); setTurn(0); };
  const requestCall = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phone.trim() || !consent || submitting) return;
    setSubmitting(true);
    setStatus("Connecting securely to Sarvam…");
    setAttemptId("");
    try {
      const response = await fetch("/api/voice/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, consent }),
      });
      const payload = await response.json() as { accepted?: boolean; attemptId?: string; error?: string };
      if (!response.ok) throw new Error(payload.error || "The call request could not be created.");
      setAttemptId(payload.attemptId || "");
      setStatus("Sarvam accepted the call request. Your phone may ring shortly.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to request a call right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return <RetroWindow title="C:/UMANG.DEV/AI/VOICE_AGENT.EXE" className="sandbox-window" accent="green">
    <div className="sandbox-label"><span className="system-chip">SARVAM VOICE AGENT</span><span className="simulation-dot">LIVE CALL / ALLOWLISTED</span></div>
    <div className="voice-scenario-tabs" role="tablist" aria-label="Voice agent conversation previews">{scenarios.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={scenario === index} className={scenario === index ? "is-active" : ""} onClick={() => chooseScenario(index)}>{item.label}</button>)}</div>
    <h3 className="voice-scenario-title">{current.title}</h3>
    <div className="voice-wave-panel"><AudioCanvas active={false}/><div className="voice-wave-footer"><span>VOICE RUNTIME / SARVAM</span><span>PREVIEW ONLY</span></div></div>
    <div className="voice-transcript" aria-label="Sample conversation preview">{current.turns.slice(0, turn + 2).map(([speaker, text], index) => <div className="transcript-line" key={index}><span className={speaker === "AI AGENT" ? "agent-speaker" : ""}>{speaker}</span><p>{text}</p></div>)}</div>
    <div className="voice-controls"><button className="terminal-button" type="button" onClick={() => setTurn((value) => (value + 2) % current.turns.length)}>Next preview turn ↗</button><span>SARVAM / OUTBOUND</span></div>
    <form className="voice-call-panel" onSubmit={requestCall}>
      <div className="voice-call-heading"><strong>REQUEST A LIVE DEMO CALL</strong><span>TEST NUMBERS ONLY</span></div>
      <label className="voice-call-label" htmlFor="voice-demo-phone">Your phone number (international format)</label>
      <input id="voice-demo-phone" className="voice-call-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+919876543210" value={phone} onChange={(event) => setPhone(event.target.value)} required maxLength={18}/>
      <label className="voice-call-consent"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)}/><span>I own this number or have permission to receive this automated demo call. I understand carrier charges may apply.</span></label>
      <button className="terminal-button voice-call-submit" type="submit" disabled={submitting || !phone.trim() || !consent}>{submitting ? "Requesting call…" : "Request demo call ↗"}</button>
      {status && <p className="voice-call-status" role="status">{status}{attemptId ? <span> Attempt: {attemptId}</span> : null}</p>}
    </form>
    <div className="sandbox-stack-tags"><span>Sarvam Voice Agents</span><span>Outbound API</span><span>Server-side key</span><span>Test allowlist</span></div>
    <p className="sandbox-footnote">A successful request means Sarvam accepted the attempt, not that the call was answered. Live calling stays disabled until server credentials and an approved test-number allowlist are configured.</p>
  </RetroWindow>;
}
