import { Reveal } from "@/components/reveal";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { ContactForm } from "@/components/contact-form";
import { projects, toolkit, links } from "@/data/portfolio";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="section about-section" id="about">
        <div className="section-kicker"><span>01</span> THE VIBE CODING ERA</div>
        <div className="about-intro">
          <Reveal><h2>Ideas move faster when <em>execution</em> gets intentional.</h2></Reveal>
          <Reveal delay={0.1}><div className="about-copy"><p>I’m Umang — a vibe coder and technical product builder, and founder of TRUV Tech &amp; Consultancy.</p><p>I use AI-assisted development to move from idea to working software quickly, while keeping the architecture, interface and business problem in view.</p><a href="#contact" className="inline-link">Have a problem worth solving? <span>↗</span></a></div></Reveal>
        </div>
        <div className="capability-grid">
          {[
            ["01", "Rapid product execution", "Turning ideas into working prototypes and usable products."],
            ["02", "Full-stack orchestration", "Connecting interfaces, backend services, databases and APIs."],
            ["03", "AI-assisted development", "Using coding agents and LLM workflows to accelerate implementation."],
            ["04", "Business-focused systems", "Designing around real operational problems, not technology for its own sake."],
          ].map(([number, title, text]) => <Reveal key={number}><article className="capability-item"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><b>↗</b></article></Reveal>)}
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-kicker"><span>02</span> SELECTED WORK / CASE NOTES</div>
        <div className="section-heading"><Reveal><h2>Built around <em>real work.</em></h2></Reveal><Reveal delay={0.1}><p>Products, client projects and system concepts. Project stages are shown as supplied; case notes separate current work from future direction.</p></Reveal></div>
        <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} />)}</div>
      </section>

      <section className="section toolkit-section" id="toolkit">
        <div className="section-kicker"><span>03</span> TECHNOLOGY / TOOLKIT</div>
        <div className="toolkit-heading"><Reveal><h2>The tools are a means.<br /><em>The system is the craft.</em></h2></Reveal><Reveal delay={0.1}><p>A practical set of tools for designing, building and connecting digital products. The right stack depends on the problem being solved.</p></Reveal></div>
        <div className="toolkit-grid">{toolkit.map((item, index) => <Reveal key={item.name} delay={(index % 3) * 0.04}><article className="toolkit-card"><span className="toolkit-index">0{index + 1}</span><div><small>{item.group}</small><h3>{item.name}</h3><p>{item.note}</p></div><span className="toolkit-arrow">↗</span></article></Reveal>)}</div>
      </section>

      <section className="manifesto-section">
        <div className="section-kicker"><span>04</span> A WORKING PRINCIPLE</div>
        <Reveal><blockquote>“I don’t build for the sake of the stack. I build to make the <em>next action clearer.</em>”</blockquote></Reveal>
        <span className="manifesto-signature">UMANG SHARMA <i /> TRUV TECH &amp; CONSULTANCY</span>
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-kicker"><span>05</span> START A CONVERSATION</div>
        <div className="contact-heading"><Reveal><h2>Have a problem<br />worth <em>building for?</em></h2></Reveal><Reveal delay={0.1}><p>Share what you’re trying to improve, launch or connect. A useful first conversation starts with the problem — not a predefined tech stack.</p><a className="email-direct" href={`mailto:${links.email}`}>{links.email}<span>↗</span></a><a className="phone-direct" href={`tel:${links.phone}`}>+91 8960082060</a></Reveal></div>
        <div className="contact-bottom"><ContactForm /><aside className="contact-note"><span>DIRECT / CONTACT</span><p>TRUV TECH &amp; CONSULTANCY</p><strong>Your Vision.<br />Our Expertise.</strong><a href={links.github} target="_blank" rel="noreferrer">GitHub profile ↗</a></aside></div>
      </section>
    </main>
  );
}