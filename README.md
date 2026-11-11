# Umang Sharma — Immersive Developer Portfolio

A cinematic, responsive portfolio built on the existing Next.js App Router site. The homepage is an explorable 3D environment with an accessible quick-navigation mode and a lightweight static fallback.

## Experience

- Cinematic introduction for Umang Sharma — Vibe Coder, Systems Builder, AI Solutions Architect and Founder at TRUV Tech & Consultancy.
- Interactive 3D portfolio scene using Three.js, React Three Fiber and Drei.
- Six explorable destinations: About, Skills, Projects, Platform Engineering, Experience and Contact.
- Explore mode with clickable 3D portals and Quick Navigation with standard HTML links.
- Pause control for the animated 3D scene.
- Reduced-motion, mobile and lower-powered-device fallbacks.
- Project archive with filters, keyboard-accessible case-study dialogs and verified public repository links where available.
- Interactive reference architecture diagram, technical toolkit and learning-focus disclosure.
- Dedicated evidence-led career page at `/platform-engineering`.
- No voice agent, microphone interaction, fake achievements, fabricated metrics or unsupported production claims.

## Visual direction

Graphite and black foundations, warm metallic gold, warm white and restrained emerald accents. The 3D environment uses procedural geometry rather than unverified client assets or third-party model credits.

## Stack

- Next.js 15 App Router, React 19 and TypeScript
- Tailwind CSS (existing project utilities)
- Three.js, React Three Fiber and React Three Drei
- GSAP + ScrollTrigger for section reveals
- Lenis for smooth scrolling
- Vercel deployment

The WebGL scene is dynamically imported and only enabled on suitable desktop devices. Mobile, reduced-motion and low-resource environments receive a CSS-based fallback. Core portfolio content remains standard HTML and does not require 3D controls.

## Project integrity

The six portfolio project statuses remain unchanged:
- TRUV CA — In Development
- Ask2Global / TaskFlow — Live Demo
- Dream Properties — Client Project
- TRUV Tech CRM — Live Demo
- TRUV Tech Official Website — In Development
- EssentialRush — Client Project

The project archive separates documented implementation from roadmap or externally configured features. Repository links are shown only when publicly verifiable. The TRUV Tech CRM repository is private and is not exposed as a public link. The Dream Properties link points to the verified PHP/MySQL property application repository, not the separate interior-design project.

## Platform Engineering evidence

The career page includes eight engineering case studies, a six-role experience timeline, education and a learning roadmap. Linux administration, networking, Infrastructure as Code, monitoring/observability and incident handling are explicitly labelled as developing areas unless direct repository evidence supports a stronger claim. No unverified certifications, tools or production metrics are invented.

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

Vercel uses the existing Next.js project configuration. Preview protection should remain enabled; validate protected previews using an authenticated browser session rather than weakening access controls.

## Contact

- Email: truvtechteam@gmail.com
- Phone: +91 89600 82060
- Company: TRUV TECH & CONSULTANCY
- Tagline: Your Vision. Our Expertise.
