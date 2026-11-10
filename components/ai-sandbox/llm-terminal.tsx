"use client";

import { useEffect, useRef, useState } from "react";
import { RetroWindow } from "@/components/os-windows/retro-window";

const quickPrompts = ["What does Umang build?", "Explain the voice agent architecture.", "What is TRUV LedgerOS?", "How does the MCP demo work?"];

function answerFor(question: string) {
  const q = question.toLowerCase();
  if (q.includes("ledger") || q.includes("ca")) return "TRUV CA / LedgerOS is an in-development CA practice and accounting workflow platform. Its current portfolio status is In Development; planned capabilities are not presented as released features.";
  if (q.includes("voice") || q.includes("call")) return "The voice showcase is a scripted interaction model for inbound lead qualification, compliance follow-up and Hinglish appointment flows. A production version would connect streaming audio, a voice runtime and controlled business actions.";
  if (q.includes("mcp") || q.includes("llm") || q.includes("ollama")) return "The proposed LLM architecture combines local model runtimes such as Ollama, a LiteLLM routing layer, MCP tool interfaces and Python automation bridges. This terminal demonstrates the interaction pattern; it is not connected to a live model.";
  if (q.includes("mushroom") || q.includes("arte")) return "Umang lists Operations & Design Lead at Mushroom Arte. The portfolio presents this as a user-provided role and does not invent project metrics or client outcomes.";
  return "Umang Sharma builds practical web products, AI-assisted workflows, voice-agent concepts and business automation systems. He is the founder of TRUV Tech & Consultancy and focuses on clear interfaces, useful architecture and real operational execution.";
}

export function LlmTerminal() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [visible, setVisible] = useState("");
  const [busy, setBusy] = useState(false);
  const [toolLabel, setToolLabel] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!busy || !response) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 3;
      setVisible(response.slice(0, index));
      if (index >= response.length) { window.clearInterval(timer); setBusy(false); setToolLabel("MCP: response assembled · local demo"); }
    }, 22);
    return () => window.clearInterval(timer);
  }, [busy, response]);
  useEffect(() => { outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" }); }, [visible, history]);
  const ask = (value: string) => {
    const prompt = value.trim();
    if (!prompt || busy) return;
    setQuestion("");
    setHistory((items) => [...items.slice(-4), prompt]);
    setVisible("");
    setToolLabel("LiteLLM: routing query · simulated");
    setResponse(answerFor(prompt));
    setBusy(true);
  };
  return <RetroWindow title="C:/UMANG.DEV/AI/LLM_TERMINAL.EXE" className="sandbox-window" accent="amber">
    <div className="sandbox-label"><span className="system-chip system-chip-amber">INTERACTIVE PORTFOLIO KNOWLEDGE ENGINE</span><span className="simulation-dot">LOCAL SCRIPTED DEMO</span></div>
    <div className="terminal-window-output" ref={outputRef} aria-live="polite">
      <p className="terminal-welcome">UMANGOS KNOWLEDGE SHELL [v1.0.0]<br/>Type a question or choose a prompt. No external model is connected.</p>
      {history.map((item, index) => <div className="terminal-exchange" key={index}><p className="terminal-user"><span>visitor@umang.dev $</span> {item}</p>{index === history.length - 1 && <><p className="terminal-tool">[{toolLabel || "MCP: preparing context…"}]</p><p className="terminal-answer">{visible}{busy && <i className="terminal-cursor"/>}</p></>}</div>)}
      {!history.length && <p className="terminal-idle">Awaiting input<span className="terminal-cursor"/></p>}
    </div>
    <div className="terminal-quick-prompts">{quickPrompts.map((prompt) => <button key={prompt} type="button" disabled={busy} onClick={() => ask(prompt)}><kbd>↵</kbd>{prompt}</button>)}</div>
    <form className="terminal-input-row" onSubmit={(event) => { event.preventDefault(); ask(question); }}><label htmlFor="llm-question">visitor@umang.dev $</label><input id="llm-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about skills, systems or projects…" disabled={busy}/><button type="submit" disabled={busy || !question.trim()}>SEND ↗</button></form>
    <div className="sandbox-stack-tags"><span>Ollama / Llama / Gemma</span><span>LiteLLM Proxy</span><span>MCP</span><span>Python Bridges</span></div>
    <p className="sandbox-footnote">Responses are curated local demo content with simulated tool-call labels, not a live chatbot or connected MCP server.</p>
  </RetroWindow>;
}
