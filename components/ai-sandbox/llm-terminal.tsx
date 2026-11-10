"use client";

import { useEffect, useRef, useState } from "react";
import { RetroWindow } from "@/components/os-windows/retro-window";

const quickPrompts = ["What does Umang build?", "How do Umang’s systems connect?", "What is TRUV LedgerOS?", "How does the MCP demo work?"];
type Exchange = { question: string; answer: string };

export function LlmTerminal() {
  const [question, setQuestion] = useState("");
  const [visible, setVisible] = useState("");
  const [responseText, setResponseText] = useState("");
  const [busy, setBusy] = useState(false);
  const [typing, setTyping] = useState(false);
  const [toolLabel, setToolLabel] = useState("LLM API / READY");
  const [history, setHistory] = useState<Exchange[]>([]);
  const [error, setError] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!typing || !responseText) return;
    let index = 0;
    const timer = window.setInterval(() => {
      index += 3;
      setVisible(responseText.slice(0, index));
      if (index >= responseText.length) {
        window.clearInterval(timer);
        setTyping(false);
        setBusy(false);
      }
    }, 18);
    return () => window.clearInterval(timer);
  }, [typing, responseText]);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
  }, [visible, history, error]);

  const ask = async (value: string) => {
    const prompt = value.trim();
    if (!prompt || busy) return;
    setQuestion("");
    setError("");
    setVisible("");
    setResponseText("");
    setBusy(true);
    setToolLabel("LLM GATEWAY / REQUESTING");
    const nextHistory = [...history, { question: prompt, answer: "" }].slice(-6);
    setHistory(nextHistory);
    const messages = nextHistory.flatMap((item) => [
      { role: "user", content: item.question },
      ...(item.answer ? [{ role: "assistant", content: item.answer }] : []),
    ]);
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      const payload = await response.json() as { answer?: string; model?: string; error?: string };
      if (!response.ok) throw new Error(payload.error || "The LLM request failed.");
      const answer = payload.answer || "The model returned an empty response.";
      setHistory((items) => items.map((item, index) => index === items.length - 1 ? { ...item, answer } : item));
      setToolLabel(`MODEL / ${payload.model || "CONNECTED"}`);
      setResponseText(answer);
      setTyping(true);
    } catch (requestError) {
      setHistory((items) => items.slice(0, -1));
      setError(requestError instanceof Error ? requestError.message : "Unable to reach the LLM service.");
      setToolLabel("LLM GATEWAY / ERROR");
      setBusy(false);
    }
  };

  return <RetroWindow title="C:/UMANG.DEV/AI/LLM_TERMINAL.EXE" className="sandbox-window" accent="amber">
    <div className="sandbox-label"><span className="system-chip system-chip-amber">LIVE LLM KNOWLEDGE ENGINE</span><span className="simulation-dot">OLLAMA / LITELLM API</span></div>
    <div className="terminal-window-output" ref={outputRef} aria-live="polite">
      <p className="terminal-welcome">UMANGOS KNOWLEDGE SHELL [v2.0.0]<br/>Ask about skills, systems or projects. Requests are routed through the server-side LLM gateway.</p>
      {history.map((item, index) => <div className="terminal-exchange" key={index}><p className="terminal-user"><span>visitor@umang.dev $</span> {item.question}</p>{index === history.length - 1 && <><p className="terminal-tool">[{toolLabel}]</p><p className="terminal-answer">{visible}{typing && <i className="terminal-cursor"/>}</p></>}</div>)}
      {error && <p className="terminal-error" role="alert">{error}</p>}
      {!history.length && !error && <p className="terminal-idle">Awaiting input<span className="terminal-cursor"/></p>}
    </div>
    <div className="terminal-quick-prompts">{quickPrompts.map((prompt) => <button key={prompt} type="button" disabled={busy} onClick={() => void ask(prompt)}><kbd>↵</kbd>{prompt}</button>)}</div>
    <form className="terminal-input-row" onSubmit={(event) => { event.preventDefault(); void ask(question); }}><label htmlFor="llm-question">visitor@umang.dev $</label><input id="llm-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask the connected model…" disabled={busy}/><button type="submit" disabled={busy || !question.trim()}>{busy ? "WAIT…" : "SEND ↗"}</button></form>
    <div className="sandbox-stack-tags"><span>Ollama</span><span>LiteLLM</span><span>OpenAI-compatible</span><span>Server-side API</span></div>
    <p className="sandbox-footnote">The browser never receives provider keys. Configure an HTTPS-reachable LLM gateway in the deployment environment; a local Ollama localhost URL works only on the same machine.</p>
  </RetroWindow>;
}
