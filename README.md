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


## Live AI Sandbox connectors

The AI Sandbox uses server-side API routes. It does not expose provider credentials to the browser.

### LLM (Ollama / LiteLLM / OpenAI-compatible)

Set `LLM_BASE_URL`, `LLM_MODEL`, and (when required) `LLM_API_KEY` in the deployment environment. The base URL should include the API prefix, for example `https://your-gateway.example/v1`. A local Ollama example is `http://127.0.0.1:11434/v1`; that local address is only reachable from the same machine, not from Vercel. For production, configure a private/reachable HTTPS gateway.

### Sarvam outbound voice calls

Set `SARVAM_API_KEY`, `SARVAM_ORG_ID`, `SARVAM_WORKSPACE_ID`, `SARVAM_APP_ID` (or the legacy `SARVAM_AGENT_ID` name), `SARVAM_APP_VERSION`, `SARVAM_CONNECTION_ID`, and `SARVAM_AGENT_PHONE_NUMBER`. Also set `SARVAM_ALLOWED_TEST_NUMBERS` to a comma-separated allowlist of E.164 phone numbers. The allowlist is mandatory: it prevents anonymous visitors from triggering calls to arbitrary numbers and incurring telephony charges.

The voice demo sends an outbound call request to Sarvam's Voice Agents API. An accepted request returns an attempt ID; it does not mean the call was answered. Configure Sarvam call-result webhooks separately if you need post-call transcripts and dispositions. Never commit real keys or phone numbers.
