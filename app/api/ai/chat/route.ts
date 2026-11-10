import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are UmangOS, the portfolio assistant for Umang Sharma.
Answer questions about Umang's work using only the supplied portfolio facts.
Umang builds web products, AI-assisted workflows, business automation systems and digital experiences. He is founder of TRUV TECH & CONSULTANCY.
TRUV CA / LedgerOS is in development. EssentialRush and Dream Properties are client projects. Ask2Global / TaskFlow and TRUV Tech CRM are live demos. TRUV Tech Official Website is in development.
Do not invent customers, testimonials, revenue, performance metrics, production integrations, or project capabilities. If a detail is not supplied, say you do not have verified information.
Keep answers concise, useful, and professional. Hinglish is welcome when the visitor uses it.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

const rateBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 12;

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  if (rateBuckets.size > 1000) {
    for (const [key, value] of rateBuckets) if (value.resetAt <= now) rateBuckets.delete(key);
  }
  const bucket = rateBuckets.get(clientKey);
  if (bucket && bucket.resetAt > now && bucket.count >= RATE_LIMIT) {
    return NextResponse.json({ error: "Too many questions from this network. Please wait a few minutes and try again." }, { status: 429 });
  }
  if (!bucket || bucket.resetAt <= now) rateBuckets.set(clientKey, { count: 1, resetAt: now + RATE_WINDOW_MS });
  else bucket.count += 1;
  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > 12) {
    return NextResponse.json({ error: "Send between 1 and 12 chat messages." }, { status: 400 });
  }

  const messages: ChatMessage[] = [];
  for (const item of body.messages) {
    if (!item || typeof item !== "object") {
      return NextResponse.json({ error: "Invalid message format." }, { status: 400 });
    }
    const candidate = item as Record<string, unknown>;
    if ((candidate.role !== "user" && candidate.role !== "assistant") ||
        typeof candidate.content !== "string" ||
        candidate.content.length < 1 || candidate.content.length > 2000) {
      return NextResponse.json({ error: "Each message needs a valid role and 1–2,000 characters of text." }, { status: 400 });
    }
    messages.push({ role: candidate.role, content: candidate.content });
  }

  if (messages[messages.length - 1]?.role !== "user") {
    return NextResponse.json({ error: "The latest message must be from the visitor." }, { status: 400 });
  }

  const baseUrl = process.env.LLM_BASE_URL?.trim();
  const model = process.env.LLM_MODEL?.trim();
  const apiKey = process.env.LLM_API_KEY?.trim();

  if (!baseUrl || !model) {
    return NextResponse.json({
      error: "LLM connector is not configured yet. Add LLM_BASE_URL and LLM_MODEL in the server environment.",
      code: "LLM_NOT_CONFIGURED",
    }, { status: 503 });
  }

  let endpoint: URL;
  try {
    endpoint = new URL(`${baseUrl.replace(/\/+$/, "")}/chat/completions`);
    if (endpoint.protocol !== "https:" && endpoint.hostname !== "localhost" && endpoint.hostname !== "127.0.0.1") {
      return NextResponse.json({ error: "LLM_BASE_URL must use HTTPS outside localhost." }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ error: "LLM_BASE_URL is not a valid URL." }, { status: 500 });
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.35,
        max_tokens: 450,
        stream: false,
      }),
      signal: AbortSignal.timeout(30_000),
      cache: "no-store",
    });

    const payload = await upstream.json().catch(() => null) as {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string } | string;
    } | null;

    if (!upstream.ok) {
      const providerError = payload?.error;
      const detail = typeof providerError === "string" ? providerError : providerError?.message;
      return NextResponse.json({ error: detail || `LLM provider returned HTTP ${upstream.status}.` }, { status: 502 });
    }

    const answer = payload?.choices?.[0]?.message?.content;
    if (typeof answer !== "string" || !answer.trim()) {
      return NextResponse.json({ error: "The LLM provider returned an empty response." }, { status: 502 });
    }

    return NextResponse.json({ answer: answer.trim(), model });
  } catch (error) {
    const message = error instanceof Error && error.name === "TimeoutError"
      ? "The LLM provider took too long to respond. Please try again."
      : "Could not reach the configured LLM provider. Check the server endpoint and network access.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
