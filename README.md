# Umang Sharma — AI, Design & Operations

An immersive, responsive 3D game-world portfolio built with Next.js, React, TypeScript and CSS 3D transforms.

## Experience
- A floating-island spawn world with a game-style HUD and quest progress
- Five explorable zones: Spawn Point, Player Profile, Project Islands, Services & Skills, and Final Portal
- Keyboard navigation with W/S or arrow keys, Enter to jump to the selected zone, plus touch-friendly mobile navigation
- Project inspection dialogs with verified descriptions, statuses and repository links
- CSS-built 3D environments and portal effects; no heavy WebGL engine required
- Reduced-motion and responsive mobile layouts
- Direct email and phone contact actions

## Work and services
The portfolio presents TRUV CA, Ask2Global / TaskFlow, Dream Properties, TRUV Tech CRM, TRUV Tech Official Website and EssentialRush with their supplied project statuses. Services include CRM and business systems, CA and compliance automation, hospital automation, websites and digital products, AI workflows, and design experiences.

Project statuses are kept as supplied. Public repository links are included only where verified. No unverified demo URLs, customer metrics, or testimonials are presented.

## Stack
- Next.js + React + TypeScript
- Tailwind CSS
- CSS 3D transforms
- Native Next.js production output on Vercel; static export for GitHub Pages

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run typecheck
npm run build
```

## Deploying
- **Vercel:** Uses the native Next.js build and `.next/` output. Keep the Framework Preset set to **Next.js** and the Output Directory set to `.next`.
- **GitHub Pages:** The included GitHub Actions workflow sets `GITHUB_ACTIONS=true`, enabling `output: "export"` and the repository base path, then publishes the generated `out/` directory.

The contact actions open the visitor's email client or phone dialer; they do not submit data to a third-party form service.

## Contact
- Email: truvtechteam@gmail.com
- Phone: +91 89600 82060
- Company: TRUV TECH & CONSULTANCY
- Tagline: Your Vision. Our Expertise.

No voice agent, microphone interaction, outbound calling feature, or unconfigured AI terminal is included in the portfolio UI.
