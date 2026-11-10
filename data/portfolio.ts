export type ProjectStatus = "In Development" | "Live Demo" | "Client Project" | "Capability";

export type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  status: ProjectStatus;
  visual: "ledger" | "commerce" | "automation" | "taskflow" | "property" | "crm" | "brand";
  stack: string[];
  repository?: string;
  details: string;
};

export const projects: Project[] = [
  {
    number: "01",
    name: "TRUV CA / LedgerOS",
    category: "CA automation · Financial operations",
    description: "A developing platform focused on accounting workflows, GST-related operations and CA practice automation.",
    status: "In Development",
    visual: "ledger",
    stack: ["Next.js", "TypeScript", "Prisma", "Workflow design"],
    repository: "https://github.com/mkcumang-sketch/truvledgeros2",
    details: "The product direction brings recurring practice workflows into a more connected workspace. The project is in development; this portfolio does not present planned workflows as released functionality.",
  },
  {
    number: "02",
    name: "EssentialRush",
    category: "E-commerce · Digital commerce",
    description: "An e-commerce project focused on product discovery, storefront experience and administrative operations.",
    status: "Client Project",
    visual: "commerce",
    stack: ["Next.js", "React", "MongoDB", "Razorpay"],
    repository: "https://github.com/mkcumang-sketch/EssentialRush",
    details: "The project explores a polished commerce experience alongside the operational tools needed to manage an online store. It is presented as client work, not as a claim about traffic or sales performance.",
  },
  {
    number: "03",
    name: "Custom Automation & Internal Tools",
    category: "AI workflows · Operations",
    description: "AI-agent bridges, webhook-driven workflows and operational dashboards shaped around repeatable business processes.",
    status: "Capability",
    visual: "automation",
    stack: ["APIs", "Webhooks", "Python", "LLM workflows"],
    details: "A capability area spanning small, focused automations and connected internal tools. Each workflow is scoped around the process it is meant to improve, rather than positioned as one released product.",
  },
  {
    number: "04",
    name: "Ask2Global / TaskFlow",
    category: "Workflow · Task management",
    description: "A task assignment and workflow product for organising projects, teams and day-to-day execution.",
    status: "Live Demo",
    visual: "taskflow",
    stack: ["Web application", "Task workflows", "Team operations"],
    repository: "https://github.com/mkcumang-sketch/TaskFlowAsk2",
    details: "TaskFlow focuses on making ownership and progress easier to follow across a shared set of work. The repository link is provided as the verified project reference.",
  },
  {
    number: "05",
    name: "Dream Properties",
    category: "Real estate · Digital experience",
    description: "A client project focused on a digital property experience and property discovery workflow.",
    status: "Client Project",
    visual: "property",
    stack: ["Web experience", "Property discovery", "Admin workflow"],
    repository: "https://github.com/mkcumang-sketch/DreamProperties",
    details: "The project explores a structured property browsing experience with room for listing details and supporting administration. The repository is the public reference; no customer or conversion metrics are claimed.",
  },
  {
    number: "06",
    name: "TRUV Tech CRM",
    category: "Business CRM · Operations",
    description: "A business-oriented CRM and operational platform for leads, communication, workflows and follow-up.",
    status: "Live Demo",
    visual: "crm",
    stack: ["CRM workflows", "Communication", "Dashboards"],
    details: "The product direction connects lead visibility with everyday communication and operational follow-through. A public demo URL is not listed here because one has not been verified for this portfolio.",
  },
  {
    number: "07",
    name: "TRUV Tech Official Website",
    category: "Brand · Digital presence",
    description: "The developing digital home for TRUV TECH & CONSULTANCY and its technology and consulting services.",
    status: "In Development",
    visual: "brand",
    stack: ["Brand experience", "Web design", "Responsive UI"],
    details: "A company-facing digital presence for TRUV TECH & CONSULTANCY. The site is still in development, so this card does not link to a live website.",
  },
];

export const toolkit = [
  { name: "Next.js", group: "Product engineering", note: "Application structure and routing" },
  { name: "React", group: "Product engineering", note: "Reusable interface systems" },
  { name: "TypeScript", group: "Product engineering", note: "Typed application code" },
  { name: "Tailwind CSS", group: "Interface", note: "Consistent, responsive styling" },
  { name: "JavaScript", group: "Interface", note: "Interactive browser experiences" },
  { name: "Python automation", group: "Automation", note: "Scripts and workflow utilities" },
  { name: "APIs & webhooks", group: "Integration", note: "Connecting tools and services" },
  { name: "Databases", group: "Architecture", note: "Application data and persistence" },
  { name: "AI coding agents", group: "AI-assisted development", note: "Agent-guided implementation workflows" },
  { name: "LLM tooling", group: "AI-assisted development", note: "Prompted workflows and orchestration" },
];

export const links = {
  github: "https://github.com/mkcumang-sketch",
  linkedin: "https://www.linkedin.com/in/umang-sharma-4a21a5350/",
  instagram: "https://www.instagram.com/truvofficial_/",
  email: "truvtechteam@gmail.com",
  phone: "+918960082060",
};