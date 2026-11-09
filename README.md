# Umang Sharma — Technical Product Builder

A responsive, editorial personal portfolio built with Next.js, React, TypeScript, Tailwind CSS and Framer Motion.

## Experience
- Swiss-minimalist graphite / bone palette with restrained monochrome motion
- Interactive cursor-responsive hero sculpture built with CSS 3D transforms
- Staggered scroll reveals and hover tilt with reduced-motion support
- Expandable project case notes with honest project-stage labels
- Responsive navigation and `Ctrl/Cmd + K` quick navigation
- Contact form that prepares an email draft; it does not pretend to submit to a backend

## Projects
Project statuses reflect the supplied portfolio information. Public repository links are included only where verified. No unverified demo URLs, customer metrics, or testimonials are presented.

## Stack
- Next.js + React + TypeScript
- Tailwind CSS
- Framer Motion
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
- **Vercel:** Uses the native Next.js build and `.next/` output so Vercel can read the Next.js route manifests. Keep the Framework Preset set to **Next.js** and the Output Directory set to `.next` (the repository `vercel.json` pins this value).
- **GitHub Pages:** The included GitHub Actions workflow sets `GITHUB_ACTIONS=true`, enabling `output: "export"` and the repository base path, then publishes the generated `out/` directory. These settings are isolated from Vercel builds.

The contact form opens a pre-filled `mailto:` draft. Configure a real form endpoint before representing it as a server-submitted form.

## Contact
- Email: truvtechteam@gmail.com
- Phone: +91 8960082060
- Company: TRUV TECH & CONSULTANCY
- Tagline: Your Vision. Our Expertise.
