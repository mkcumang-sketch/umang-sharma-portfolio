export type ProjectStatus = "In Development" | "Live Demo" | "Client Project";

export type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  status: ProjectStatus;
  visual: "ledger" | "commerce" | "automation" | "taskflow" | "property" | "crm" | "brand";
  stack: string[];
  languages: string[];
  features: string[];
  architecture: string;
  verificationNote?: string;
  repository?: string;
  details: string;
};

export const projects: Project[] = [
  {
    number: "01",
    name: "TRUV CA",
    category: "CA practice OS · Financial operations",
    description: "A multi-firm practice operations platform connecting statutory work, client records, documents, billing and team review.",
    status: "In Development",
    visual: "ledger",
    stack: ["Next.js 14", "React 18", "Prisma", "PostgreSQL", "Supabase", "Redis"],
    languages: ["TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
    features: [
      "CA practice dashboard, task calendar and statutory GST / ITR timelines",
      "Client 360 profiles, bulk CSV import, PAN/GSTIN duplicate checks and DSC metadata",
      "Recurring compliance tasks, maker-checker reviews and evidence-based completion",
      "Sequential GST invoicing, partial payment tracking and Tally XML export",
      "Document requests, OTP upload portal, reminders and encrypted credential vault",
      "Role-based team management, multi-firm tenant switching and audit trails",
      "Practice MIS reports for collections, work-in-progress and realization"
    ],
    architecture: "Next.js App Router with TypeScript, React, Prisma-backed PostgreSQL, Supabase services and Redis-backed infrastructure. Server actions enforce tenant scope, role permissions and transactional workflows.",
    verificationNote: "The feature matrix marks core workflows as implemented. Direct GSTN / ITR portal sync, WhatsApp Cloud API, e-sign and live payment settlement remain dependent on external approvals or credentials. Bank-statement OCR and selected portal features are partial.",
    repository: "https://github.com/mkcumang-sketch/truvledgeros2",
    details: "TRUV CA (formerly LedgerOS) is being developed as a reusable operating system for CA practices. Its documented workflow audit covers client management, recurring statutory work, review controls, document handling, invoicing, payments, reporting and multi-tenant security. The project remains In Development; externally blocked integrations are not presented as live."
  },
  {
    number: "02",
    name: "Ask2Global / TaskFlow",
    category: "Workflow · Team accountability",
    description: "A task assignment and accountability platform built around teams, projects, schedules and operational visibility.",
    status: "Live Demo",
    visual: "taskflow",
    stack: ["Next.js App Router", "React", "Prisma", "PostgreSQL", "JWT sessions", "Google OAuth"],
    languages: ["TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
    features: [
      "Server-side login and session authentication",
      "Task creation, assignment, detail views, tags, checklists and subtasks",
      "My Day and calendar-oriented scheduling",
      "Projects, team, reports, settings and notification surfaces",
      "Organization-scoped records, membership roles and access checks",
      "Activity records and persistent task / notification API flows",
      "Google OAuth and calendar integration endpoints"
    ],
    architecture: "Next.js App Router with TypeScript and React, Prisma data models on PostgreSQL, secure JWT session cookies, server route handlers and organization-scoped authorization.",
    verificationNote: "Google and email integrations are environment-backed; they activate only when the required provider configuration is supplied.",
    repository: "https://github.com/mkcumang-sketch/TaskFlowAsk2",
    details: "TaskFlow focuses on making ownership, deadlines and progress visible across a shared set of work. The repository documentation describes persistent task workflows, organization-scoped data, secure server-side authentication and Google integration points."
  },
  {
    number: "03",
    name: "Dream Properties",
    category: "Real estate · Property discovery",
    description: "A Kanpur-focused property website for residential, commercial, rental and industrial enquiries, with a protected listing-management area.",
    status: "Client Project",
    visual: "property",
    stack: ["PHP 8", "MySQL / MariaDB", "MySQLi", "Bootstrap 5", "Chart.js", "DataTables"],
    languages: ["PHP", "JavaScript", "HTML", "CSS", "SQL"],
    features: [
      "Public home, about, contact, property listing and detail pages",
      "Database-backed property search, category / bedroom / price filters",
      "Sorting, pagination, image galleries, specifications and related listings",
      "Validated contact enquiries with CSRF protection and database persistence",
      "Protected admin sign-in and property / image CRUD workflows",
      "Validated property image uploads and responsive Bootstrap layouts"
    ],
    architecture: "PHP 8 server-rendered pages using MySQLi, MySQL / MariaDB persistence and PHP sessions. The interface uses Bootstrap 5 with JavaScript and admin-side Chart.js / DataTables.",
    verificationNote: "Repository documentation notes that email delivery is not configured, some dashboard links / analytics are placeholders, and contact submissions are stored in the database.",
    repository: "https://github.com/mkcumang-sketch/DreamProperties",
    details: "A client property experience covering discovery, enquiry and listing administration. The repository documentation identifies the current implementation as PHP and MySQL, with responsive public pages, protected admin workflows and database-backed enquiries."
  },
  {
    number: "04",
    name: "TRUV Tech CRM",
    category: "Business CRM · Sales operations",
    description: "A multi-tenant CRM foundation for contacts, companies, deal pipelines, tasks and team operations.",
    status: "Live Demo",
    visual: "crm",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "PostgreSQL", "NextAuth v5", "Recharts", "dnd-kit"],
    languages: ["TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
    features: [
      "Dashboard analytics for revenue, contacts, pipeline value and pending tasks",
      "Contact management with company links and lifecycle stages",
      "Company directory with industry, size, revenue and location fields",
      "Drag-and-drop Kanban deal pipeline",
      "Priority-based tasks with due dates and linked records",
      "Team invitations and organization-isolated multi-tenant data",
      "CSV bulk import for deals"
    ],
    architecture: "Next.js App Router and TypeScript with PostgreSQL, NextAuth credentials authentication, Tailwind CSS, Recharts and dnd-kit drag-and-drop interactions.",
    verificationNote: "The repository README lists email integration, advanced reporting, workflow automation, granular RBAC and calendar sync in its future roadmap; these are not claimed as shipped features.",
    details: "The Open TRUV codebase is a self-hostable CRM foundation for small teams. Its README documents contact and company records, deal pipelines, task management, organization isolation, authentication and CSV import. The repository is private, so no public source link is shown."
  },
  {
    number: "05",
    name: "TRUV Tech Official Website",
    category: "Brand · Digital presence",
    description: "The developing digital home for TRUV TECH & CONSULTANCY and its technology and consulting services.",
    status: "In Development",
    visual: "brand",
    stack: ["Technical stack not publicly verified"],
    languages: ["Not publicly verified"],
    features: [
      "Company identity and service presentation",
      "Technology and consultancy positioning",
      "Responsive digital brand experience"
    ],
    architecture: "In development. Framework, language and deployment details will be added after the project repository is verified.",
    verificationNote: "No public repository or implementation README is currently linked for this project.",
    details: "A company-facing digital presence for TRUV TECH & CONSULTANCY. It remains in development; implementation details are intentionally not guessed."
  },
  {
    number: "06",
    name: "EssentialRush",
    category: "E-commerce · Luxury storefront",
    description: "A premium watch storefront concept with video-led presentation, product discovery and commerce-oriented account flows.",
    status: "Client Project",
    visual: "commerce",
    stack: ["Next.js 16", "React 19", "TypeScript", "MongoDB / Mongoose", "Prisma", "NextAuth", "Razorpay", "Three.js"],
    languages: ["TypeScript", "JavaScript", "HTML", "CSS"],
    features: [
      "Cinematic image / video hero and promotional content sections",
      "Luxury watch brand presentation and product discovery",
      "Product records with price, description, images, category and stock",
      "Shopping cart state and session-aware account experience",
      "Product image upload and media handling components",
      "Commerce, payment, AI and 3D-rendering dependencies in the project stack"
    ],
    architecture: "Next.js App Router and React with TypeScript, Mongoose / MongoDB product models, Prisma dependencies, NextAuth, Framer Motion / GSAP and Three.js / React Three Fiber. Razorpay and Gemini packages are present in the dependency manifest.",
    verificationNote: "The repository has no README at its root. Feature notes are based on the inspected app entry point, product model and package manifest; payment and AI dependencies are not a claim that live merchant / API credentials are configured.",
    repository: "https://github.com/mkcumang-sketch/EssentialRush",
    details: "EssentialRush is presented as a client commerce project. Source inspection confirms a video/image-led storefront, luxury watch positioning, a product model with price / category / stock / images, cart state and account-aware UI. The repository dependency manifest includes payment, AI and 3D tooling."
  }
];

export const services = [
  { name: "Custom CRM & business systems", group: "Business operations", note: "Lead pipelines, follow-ups, dashboards and team workflows" },
  { name: "CA & compliance automation", group: "Professional services", note: "Practice workflows for accounting, GST and client coordination" },
  { name: "Hospital automation", group: "Healthcare operations", note: "Digital workflows designed around everyday administrative processes" },
  { name: "Websites & digital products", group: "Product development", note: "Responsive websites, portals and practical web applications" },
  { name: "AI workflows & integrations", group: "Applied AI", note: "API-connected assistants, automations and internal tools" },
  { name: "Design & digital experiences", group: "Creative technology", note: "Clear interfaces, product presentation and brand experiences" },
];

export const toolkit = [
  { name: "Next.js & React", group: "Product engineering", note: "Modern web application interfaces and routing" },
  { name: "TypeScript & JavaScript", group: "Engineering", note: "Interactive, maintainable application code" },
  { name: "Node.js & APIs", group: "Backend integration", note: "Application services and connected systems" },
  { name: "PHP & SQL", group: "Web and data", note: "Server-rendered applications and relational data workflows" },
  { name: "Python automation", group: "Automation", note: "Scripts and workflow utilities" },
  { name: "Databases", group: "Architecture", note: "Application data and persistence" },
  { name: "AI coding agents & LLMs", group: "AI-assisted development", note: "Agent-guided building and language-model workflows" },
  { name: "Git & GitHub", group: "Delivery", note: "Version control and collaborative development" },
];

export const links = {
  github: "https://github.com/mkcumang-sketch",
  linkedin: "https://www.linkedin.com/in/umang-sharma-4a21a5350/",
  instagram: "https://www.instagram.com/truvofficial_/",
  email: "truvtechteam@gmail.com",
  phone: "+918960082060",
  phoneDisplay: "+91 89600 82060",
  company: "TRUV TECH & CONSULTANCY",
  tagline: "Your Vision. Our Expertise.",
};
