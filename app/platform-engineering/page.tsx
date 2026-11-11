"use client";

import "./platform-engineering.css";

const groups = [
  { title: "CI/CD & Delivery", items: ["GitHub Actions", "Vercel deployments", "Cloudflare Wrangler", "Release runbooks", "Smoke-test workflows"] },
  { title: "Cloud & Runtime", items: ["Vercel", "Cloudflare Workers", "Cloudflare D1 / R2 / Queues", "Railway PostgreSQL (documented target)", "Linux VPS deployment (Nginx / PM2)"] },
  { title: "Containers & Orchestration", items: ["Docker", "Docker Compose", "Multi-stage image builds", "Non-root runtime", "Persistent volumes", "Container health checks"] },
  { title: "Data & State", items: ["PostgreSQL", "MongoDB", "SQLite / MySQL", "Prisma ORM", "Drizzle ORM", "Redis / Upstash"] },
  { title: "Security & Reliability", items: ["Tenant isolation", "Role-based access", "Environment secrets", "Rate limiting", "Credential-vault patterns", "Migration safety", "Automated security tests"] },
  { title: "Engineering & Automation", items: ["TypeScript", "JavaScript", "Node.js", "SQL", "PHP", "Git / GitHub", "Playwright", "Power BI"] },
];

const projects = [
  {
    number: "01", name: "TRUV CA / LedgerOS", label: "Multi-tenant financial operations platform", status: "IN DEVELOPMENT",
    stack: "Next.js · TypeScript · PostgreSQL · Prisma · Redis · Vercel · Docker Compose",
    problem: "Financial and compliance workflows need controlled access, recurring work, document handling, auditable reviews and safe database changes across multiple firms.",
    work: ["Designed tenant-aware application and data boundaries with role enforcement.", "Added database-readiness checks and guarded migration tooling.", "Built security-focused tests covering tenant isolation, credentials and financial workflows.", "Documented staging promotion, environment validation and post-deployment smoke checks.", "Configured Redis-backed rate limiting and scheduled automation patterns."],
    evidence: "Repository includes a deployment runbook, deployment truth report, staging checklist and a test runner with 18 named suites. A 412-test release gate is documented as a target; it is not presented here as a verified passing production result.",
    link: "https://github.com/mkcumang-sketch/truvledgeros2", linkLabel: "Open TRUV LedgerOS repository",
    impact: "Operational contribution: safer migration practices, clearer release gates and stronger tenant/security validation. No verified uptime, MTTR, latency or cost-saving metric is published."
  },
  {
    number: "02", name: "Mailflare deployment & maintenance", label: "Container and edge-platform engineering", status: "UPSTREAM-DERIVED TECHNICAL WORK",
    stack: "Docker · Docker Compose · GitHub Actions · Cloudflare Workers · Wrangler · D1 · R2 · Queues",
    problem: "A self-hosted collaboration platform needs repeatable container builds, persistent runtime data, background processing and a maintainable upstream update path.",
    work: ["Inspected and worked with a multi-stage Docker build using a slim Node.js runtime.", "Configured non-root container execution, persistent /data storage and a health check.", "Reviewed Cloudflare resource bindings, cron triggers, queue retries and observability traces.", "Used a manually triggered GitHub Actions workflow for upstream repository synchronization."],
    evidence: "The repository identifies hieunc229/mailflare as its upstream source. This is presented as deployment, containerization and maintenance work—not as an application authored from scratch.",
    link: "https://github.com/mkcumang-sketch/mailflare", linkLabel: "Open Mailflare repository",
    impact: "Demonstrates container lifecycle, persistent storage, edge-resource configuration and workflow maintenance. No independently verified production SLO or benchmark is available."
  },
  {
    number: "03", name: "TaskFlow / Ask2Global", label: "Team workflow and task platform", status: "LIVE DEMO — PORTFOLIO STATUS",
    stack: "Next.js · React · TypeScript · Prisma · MongoDB schema · JWT · Google OAuth",
    problem: "Distributed teams need clear task ownership, deadlines, organization-scoped records and reliable workflow visibility.",
    work: ["Built task assignment, project, calendar and activity workflows.", "Implemented server-side authentication and organization-scoped authorization patterns.", "Documented security and deployment practices.", "Added a workflow-integrity test script for task transitions and organization boundaries."],
    evidence: "The current Prisma schema declares MongoDB, while some deployment documentation describes PostgreSQL as a production option. This discrepancy is disclosed rather than silently reconciled.",
    link: "https://github.com/mkcumang-sketch/TaskFlowAsk2", linkLabel: "Open TaskFlow repository",
    impact: "Provides a practical example of application delivery, authentication, tenant-aware data access and workflow testing. No measured uptime or performance figures are published."
  },
  {
    number: "04", name: "TRUV Tech CRM", label: "Multi-tenant business CRM", status: "LIVE DEMO — PORTFOLIO STATUS",
    stack: "Next.js 16 · React 19 · TypeScript · PostgreSQL · NextAuth · Tailwind · Recharts",
    problem: "Small businesses need a maintainable shared workspace for contacts, companies, deals, tasks and team operations.",
    work: ["Implemented organization-oriented CRM foundations.", "Built contact, company, deal pipeline and task modules.", "Added CSV import and drag-and-drop pipeline interactions.", "Documented deployment and self-hosting configuration."],
    evidence: "The repository README identifies email integration, advanced reporting, workflow automation, granular RBAC and calendar sync as roadmap items. They are not claimed as shipped features.",
    link: "https://github.com/mkcumang-sketch/TruvtechCRM", linkLabel: "Open TRUV CRM repository",
    impact: "Shows full-stack platform architecture and deployable application foundations. No production SLO or cost metrics were identified."
  },
  {
    number: "05", name: "Dream Properties", label: "Client property portal", status: "CLIENT PROJECT",
    stack: "PHP 8 · MySQL / MariaDB · MySQLi · Bootstrap 5 · Nginx · PM2 (documented VPS path)",
    problem: "A property business needs discoverable listings, enquiry capture and a protected administration workflow.",
    work: ["Built database-backed listing, filtering and property-detail workflows.", "Implemented enquiry handling with validation and CSRF protection.", "Documented managed-hosting and Linux VPS deployment options.", "Documented environment setup, database seeding and production handover steps."],
    evidence: "The repository describes email delivery as not configured and identifies some dashboard placeholders. Demo administrator credentials in documentation require removal before production distribution.",
    link: "https://github.com/mkcumang-sketch/DreamProperty", linkLabel: "Open DreamProperty repository",
    impact: "Demonstrates server-side application delivery, relational data workflows and deployment planning across managed hosting and VPS environments."
  },
  {
    number: "06", name: "TRUVAcademy", label: "Education administration system", status: "REPOSITORY / IMPLEMENTATION",
    stack: "Laravel · PHP · MySQL / MariaDB · Composer · Apache / Nginx",
    problem: "Education administration requires role-specific workflows for students, teachers, parents, finance and library operations.",
    work: ["Worked with Laravel installation and environment configuration guidance.", "Documented application-key generation, migrations and seeders.", "Reviewed seven role areas across the application workflow.", "Documented MySQL and web-server prerequisites."],
    evidence: "The repository provides setup and deployment requirements. No cloud deployment, CI/CD pipeline or uptime measurement was verified.",
    link: "https://github.com/mkcumang-sketch/TruvSchool", linkLabel: "Open TRUVAcademy repository",
    impact: "Shows backend application setup, relational database configuration and role-based operational design."
  },
];

const experience = [
  { role: "Co-Founder & Technical Lead", company: "TRUV Tech & Consultancy (TRUV Pvt. Ltd.)", dates: "September 2026 – Present", points: ["Technical architecture and end-to-end delivery of internal SaaS platforms and client solutions.", "AI-assisted Power BI dashboards for KPIs, client retention and operational bottlenecks.", "Integrations across WhatsApp Cloud API, Razorpay, Cashfree and custom webhooks.", "Resume-reported 3× release-cycle improvement through AI-assisted development and iteration; not independently measured as deployment frequency."] },
  { role: "Operations & Design Lead", company: "Mushroom Arte Architecture & Interiors (with MagnetikMedia.io)", dates: "June 2025 – Present", points: ["Vendor procurement, lead-generation operations and client billing schedules across Kanpur and Lucknow.", "Generative image/video workflows and 3D spatial visualizations, modular layouts and BOQ cost matrices."] },
  { role: "Project Manager", company: "Excellent Event Group", dates: "January 2025 – May 2025", points: ["Managed promotional activations as an authorized Indian Oil Corporation vendor.", "Coordinated on-site logistics, vendor compliance, documentation and client billing."] },
  { role: "Store Manager", company: "The Mansion", dates: "August 2024 – November 2024", points: ["Managed inventory, dispatch tracking, stock ledgers and supply-chain coordination."] },
  { role: "Administrative Officer & Operations Partner", company: "Nyaksha.com", dates: "January 2024 – August 2024", points: ["Co-built operations and educational content workflows for a financial technology platform.", "Managed onboarding, documentation and internal coordination."] },
  { role: "Sales Executive & Team Lead", company: "Ruchir Gupta Training Academy", dates: "March 2023 – February 2024", points: ["Promoted to Team Lead / Manager within three months, according to the resume.", "Coached sales staff, reviewed call quality and tracked regional revenue targets."] },
];

export default function PlatformEngineeringPage() {
  return (
    <main className="pe-page">
      <header className="pe-nav"><a href="/" className="pe-brand">UMANG SHARMA <span>/ PLATFORM ENGINEERING</span></a><nav><a href="#competencies">Competencies</a><a href="#projects">Case studies</a><a href="#experience">Experience</a><a href="https://github.com/mkcumang-sketch" target="_blank" rel="noreferrer">GitHub ↗</a></nav></header>
      <section className="pe-hero">
        <p className="pe-kicker">PLATFORM ENGINEERING · DEVOPS · CLOUD DELIVERY</p>
        <h1>Build it. Ship it.<br/><em>Keep it reliable.</em></h1>
        <p className="pe-lead">I’m Umang Sharma — a Technical Lead and full-stack product builder focused on deployment workflows, application infrastructure, database operations, automation and security-conscious platform engineering.</p>
        <p className="pe-intro">I work across the application and its operating environment: shaping multi-tenant systems, preparing cloud deployments, containerizing services, validating migrations and documenting release paths. My approach is practical and evidence-led: make the system deployable, make changes safer, and be explicit about what is verified versus still planned.</p>
        <div className="pe-actions"><a className="pe-primary" href="#projects">Explore engineering work ↘</a><a href="mailto:us7907us@gmail.com">Contact Umang ↗</a><a href="https://github.com/mkcumang-sketch" target="_blank" rel="noreferrer">GitHub profile ↗</a></div>
        <div className="pe-proofline"><span>06 ENGINEERING CASE STUDIES</span><span>CONTAINERS / CLOUD / DATA / SECURITY</span><span>KANPUR, INDIA</span></div>
      </section>
      <section className="pe-section" id="competencies">
        <div className="pe-section-head"><p className="pe-kicker">01 / TECHNICAL COMPETENCIES</p><h2>Tools backed by<br/><em>repository evidence.</em></h2><p>These are technologies and practices identified in the resume and inspected repositories. A configured integration is not automatically a claim of production operation.</p></div>
        <div className="pe-skills">{groups.map(g=><article key={g.title}><h3>{g.title}</h3><div>{g.items.map(x=><span key={x}>{x}</span>)}</div></article>)}</div>
        <div className="pe-honesty"><strong>Evidence boundary</strong><p>No Terraform, Ansible, Jenkins, Kubernetes manifests, Helm, ArgoCD, Prometheus, Grafana, ELK or Datadog implementation was identified in the inspected repositories. These are not presented as hands-on skills. Kubernetes appears in deployment planning documentation only.</p></div>
      </section>
      <section className="pe-section" id="projects">
        <div className="pe-section-head"><p className="pe-kicker">02 / SELECTED ENGINEERING WORK</p><h2>From application code<br/>to <em>operational reality.</em></h2><p>Case studies distinguish implementation evidence, documented deployment targets and measured outcomes. Where no metric exists, none is invented.</p></div>
        <div className="pe-projects">{projects.map(p=><article className="pe-project" key={p.number}><div className="pe-project-top"><span>{p.number} / CASE STUDY</span><span>{p.status}</span></div><h3>{p.name}</h3><p className="pe-label">{p.label}</p><p className="pe-stack">{p.stack}</p><div className="pe-detail"><h4>Problem</h4><p>{p.problem}</p></div><div className="pe-detail"><h4>Engineering work</h4><ul>{p.work.map(w=><li key={w}>{w}</li>)}</ul></div><div className="pe-detail"><h4>Evidence & verification</h4><p>{p.evidence}</p></div><div className="pe-impact"><strong>Operational impact</strong><p>{p.impact}</p></div><a className="pe-repo" href={p.link} target="_blank" rel="noreferrer">{p.linkLabel} ↗</a></article>)}</div>
      </section>
      <section className="pe-section" id="experience">
        <div className="pe-section-head"><p className="pe-kicker">03 / EXPERIENCE & OWNERSHIP</p><h2>Technical work with<br/><em>operational context.</em></h2></div>
        <div className="pe-timeline">{experience.map(e=><article key={e.company}><div><span>{e.dates}</span><h3>{e.role}</h3><p>{e.company}</p></div><ul>{e.points.map(p=><li key={p}>{p}</li>)}</ul></article>)}</div>
      </section>
      <section className="pe-section pe-recruiter">
        <p className="pe-kicker">04 / RECRUITER QUICK SCAN</p><h2>Why I bring<br/><em>useful range.</em></h2>
        <div className="pe-scan"><p><b>01</b> I understand both the application and the deployment environment it depends on.</p><p><b>02</b> I have hands-on repository evidence across Docker, GitHub Actions, Cloudflare, Vercel and database operations.</p><p><b>03</b> I build security and tenant boundaries into application workflows, not just interface features.</p><p><b>04</b> I document migration, staging, release and smoke-test procedures to make operations repeatable.</p><p><b>05</b> I combine technical ownership with delivery, analytics and cross-functional operations experience.</p></div>
      </section>
      <section className="pe-footer"><p className="pe-kicker">LET’S BUILD RELIABLE SYSTEMS</p><h2>Good engineering<br/>starts with <em>clarity.</em></h2><p>Open to platform engineering, DevOps, cloud deployment and technical product opportunities.</p><div><a href="mailto:us7907us@gmail.com">us7907us@gmail.com ↗</a><a href="tel:+918960366706">+91 89603 66706</a><a href="https://www.linkedin.com/in/umang-sharma-4a21a5350/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/mkcumang-sketch" target="_blank" rel="noreferrer">GitHub ↗</a></div><small>© 2026 UMANG SHARMA · BUILT WITH VERIFIED PROJECT EVIDENCE</small></section>
    </main>
  );
}
