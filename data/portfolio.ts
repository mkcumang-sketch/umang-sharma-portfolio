export type ProjectStatus = "In Development" | "Live Demo" | "Client Project";

export type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  status: ProjectStatus;
  visual: "ledger" | "taskflow" | "property" | "crm" | "brand" | "commerce";
  stack: string[];
  repository?: string;
  details: string;
};

export const projects: Project[] = [
  {
    number: "01",
    name: "TRUV CA",
    category: "CA automation · Financial operations",
    description: "A practice operations platform being developed around accounting workflows, GST processes and CA-firm automation.",
    status: "In Development",
    visual: "ledger",
    stack: ["Next.js", "TypeScript", "Prisma", "Workflow design"],
    repository: "https://github.com/mkcumang-sketch/truvledgeros2",
    details: "TRUV CA is being shaped as a reusable workspace for CA practices. It is in development; planned capabilities are not presented as released functionality.",
  },
  {
    number: "02",
    name: "Ask2Global / TaskFlow",
    category: "Workflow · Task management",
    description: "A task assignment and workflow product for organising projects, team responsibilities and day-to-day execution.",
    status: "Live Demo",
    visual: "taskflow",
    stack: ["Web application", "Task workflows", "Team operations"],
    repository: "https://github.com/mkcumang-sketch/TaskFlowAsk2",
    details: "TaskFlow focuses on making ownership and progress easier to follow across a shared set of work. The repository is the verified public project reference.",
  },
  {
    number: "03",
    name: "Dream Properties",
    category: "Real estate · Digital experience",
    description: "A client project focused on a digital property experience and property discovery workflows.",
    status: "Client Project",
    visual: "property",
    stack: ["Web experience", "Property discovery", "Admin workflow"],
    repository: "https://github.com/mkcumang-sketch/DreamProperties",
    details: "A structured property browsing experience with supporting listing and administration workflows. No customer or conversion metrics are claimed.",
  },
  {
    number: "04",
    name: "TRUV Tech CRM",
    category: "Business CRM · Operations",
    description: "A business CRM and operating platform for lead management, communication, workflows and follow-up.",
    status: "Live Demo",
    visual: "crm",
    stack: ["CRM workflows", "Communication", "Dashboards"],
    details: "The product direction connects lead visibility with everyday communication and operational follow-through. A public demo URL is not listed until verified.",
  },
  {
    number: "05",
    name: "TRUV Tech Official Website",
    category: "Brand · Digital presence",
    description: "The developing digital home for TRUV TECH & CONSULTANCY and its technology and consulting services.",
    status: "In Development",
    visual: "brand",
    stack: ["Brand experience", "Web design", "Responsive UI"],
    details: "A company-facing digital presence for TRUV TECH & CONSULTANCY. The site is still in development.",
  },
  {
    number: "06",
    name: "EssentialRush",
    category: "E-commerce · Digital commerce",
    description: "A client e-commerce project focused on product discovery, storefront experience and administrative operations.",
    status: "Client Project",
    visual: "commerce",
    stack: ["Next.js", "React", "MongoDB", "Razorpay"],
    repository: "https://github.com/mkcumang-sketch/EssentialRush",
    details: "A considered commerce experience alongside the operational tools needed to manage an online store. It is presented as client work, not as a claim about traffic or sales performance.",
  },
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
  { name: "Python automation", group: "Automation", note: "Scripts and workflow utilities" },
  { name: "Databases", group: "Architecture", note: "Application data and persistence" },
  { name: "Webhooks & integrations", group: "Connected systems", note: "Moving information between business tools" },
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
