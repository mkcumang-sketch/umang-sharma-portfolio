"use client";

const actions = [
  { href: "#projects", label: "Projects", key: "P" },
  { href: "#ai-sandbox", label: "AI Sandbox", key: "AI" },
  { href: "#contact", label: "Contact", key: "↗" },
];

export function QuickDock() {
  return (
    <nav className="quick-dock" aria-label="Quick actions">
      {actions.map((action) => <a href={action.href} key={action.href}><kbd>{action.key}</kbd><span>{action.label}</span></a>)}
    </nav>
  );
}
