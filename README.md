# Umang Sharma — Technical Product Builder

An immersive, responsive 3D game-world portfolio built with Next.js, React, TypeScript, Tailwind CSS and Framer Motion.

## Experience
- 3D floating-island spawn world with a game-style player HUD and quest progress
- Five explorable zones: Spawn Point, Player Profile, Project Islands, Skill Inventory and Final Portal
- Keyboard navigation with W/S or arrow keys, Enter to jump to the selected zone, plus touch-friendly mobile navigation
- CSS-built 3D environments and portal effects; no heavy WebGL engine required
- Project stages and repository links remain grounded in the portfolio source data
- Reduced-motion and responsive mobile layouts

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


## Optional AI text terminal

The Skill Inventory zone includes an optional text-only AI terminal. It uses the server-side `/api/ai/chat` route and does not expose provider credentials to the browser. Set `LLM_BASE_URL`, `LLM_MODEL`, and (when required) `LLM_API_KEY` in the deployment environment. The base URL should include the API prefix, for example `https://your-gateway.example/v1`. A local Ollama address such as `http://127.0.0.1:11434/v1` is only reachable from the same machine, not from Vercel. For production, configure a private/reachable HTTPS gateway. No voice agent, microphone feature or outbound calling is included.
