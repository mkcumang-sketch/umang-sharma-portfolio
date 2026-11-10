import { ExperienceModeProvider } from "@/components/experience-mode";
import { MotionAtmosphere } from "@/components/motion-atmosphere";
import { Hero } from "@/components/hero";
import { CreatorCard, NarrativeSections } from "@/components/scrollytelling/narrative-sections";
import { WindowCascade } from "@/components/os-windows/window-cascade";
import { VoiceAgent } from "@/components/ai-sandbox/voice-agent";
import { LlmTerminal } from "@/components/ai-sandbox/llm-terminal";
import { ProjectsArcade } from "@/components/projects-arcade";
import { StackArcade } from "@/components/stack-arcade";
import { SectionRail } from "@/components/arcade-nav/section-rail";
import { QuickDock } from "@/components/arcade-nav/quick-dock";
import { links } from "@/data/portfolio";

export default function HomePage() {
  return <ExperienceModeProvider>
    <MotionAtmosphere/>
    <SectionRail/>
    <main id="main-content">
      <Hero/>
      <CreatorCard/>
      <NarrativeSections/>
      <WindowCascade/>
      <section className="ai-sandbox-section section-shell" id="ai-sandbox" aria-labelledby="ai-sandbox-title">
        <div className="section-kicker"><span>07 / INTERACTIVE AI CENTER</span><span>SIMULATION MODE / NO LIVE API</span></div>
        <div className="ai-sandbox-heading"><div><p className="terminal-eyebrow">C:/UMANG.DEV/AI</p><h2 id="ai-sandbox-title">Try the systems.<br/><em>Explore the logic.</em></h2></div><p>Two hands-on portfolio demos. They show interaction patterns and architecture honestly; neither is connected to a live voice service, LLM, WebSocket or MCP server.</p></div>
        <div className="ai-sandbox-grid"><VoiceAgent/><LlmTerminal/></div>
      </section>
      <ProjectsArcade/>
      <StackArcade/>
      <section className="contact-os section-shell" id="contact" aria-labelledby="contact-title">
        <div className="section-kicker"><span>10 / OPEN A NEW SESSION</span><span>ENDPOINT / CONTACT</span></div>
        <div className="contact-dialog">
          <div className="contact-dialog-bar"><span><i/> C:/UMANG.DEV/CONTACT</span><span>×</span></div>
          <div className="contact-dialog-body"><p className="terminal-eyebrow">CONNECTION REQUEST / READY</p><h2 id="contact-title">Good ideas deserve great execution. Let’s build your next system, one pixel and prompt at a time.</h2><p className="contact-dialog-copy">Tell me what you want to improve, launch or connect. We can start with the problem and shape the right system around it.</p><div className="contact-actions"><a className="terminal-button" href={"mailto:" + links.email}>Email Umang <b>↗</b></a><a className="contact-link" href={links.github} target="_blank" rel="noreferrer">GitHub / mkcumang-sketch ↗</a></div><div className="contact-endpoints"><span>MAILTO://{links.email}</span><span>GITHUB://MKCUMANG-SKETCH</span></div></div>
        </div>
      </section>
    </main>
    <QuickDock/>
  </ExperienceModeProvider>;
}
