import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const E164 = /^\+[1-9]\d{7,14}$/;

export async function POST(request: NextRequest) {
  let body: { phone?: unknown; consent?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  if (body.consent !== true) {
    return NextResponse.json({ error: "Please confirm that you own or are authorised to use this phone number." }, { status: 400 });
  }

  const phone = typeof body.phone === "string" ? body.phone.replace(/[\s()-]/g, "") : "";
  if (!E164.test(phone)) {
    return NextResponse.json({ error: "Enter a valid phone number in international format, for example +919876543210." }, { status: 400 });
  }

  const apiKey = process.env.SARVAM_API_KEY?.trim();
  const orgId = process.env.SARVAM_ORG_ID?.trim();
  const workspaceId = process.env.SARVAM_WORKSPACE_ID?.trim();
  const appId = process.env.SARVAM_APP_ID?.trim();
  const connectionId = process.env.SARVAM_CONNECTION_ID?.trim();
  const agentPhone = process.env.SARVAM_AGENT_PHONE_NUMBER?.trim();
  const appVersion = Number(process.env.SARVAM_APP_VERSION || "1");
  const allowedNumbers = (process.env.SARVAM_ALLOWED_TEST_NUMBERS || "")
    .split(",").map((value) => value.trim().replace(/[\s()-]/g, "")).filter(Boolean);

  if (!apiKey || !orgId || !workspaceId || !appId || !connectionId || !agentPhone) {
    return NextResponse.json({
      error: "Sarvam calling is not configured. Add the required SARVAM_* server environment values.",
      code: "VOICE_NOT_CONFIGURED",
    }, { status: 503 });
  }

  if (!E164.test(agentPhone) || !Number.isInteger(appVersion) || appVersion < 1) {
    return NextResponse.json({ error: "The Sarvam agent phone number or app version is invalid in server configuration." }, { status: 500 });
  }

  if (allowedNumbers.length === 0 || !allowedNumbers.includes(phone)) {
    return NextResponse.json({
      error: "Live calls are currently restricted to approved test numbers. Ask the site owner to add your number to the allowlist.",
      code: "VOICE_NUMBER_NOT_ALLOWLISTED",
    }, { status: 403 });
  }

  const endpoint = `https://apps.sarvam.ai/api/outbounds/v1/orgs/${encodeURIComponent(orgId)}/workspaces/${encodeURIComponent(workspaceId)}/outbounds`;

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        app_config: {
          app_id: appId,
          app_version: appVersion,
          connection_config: {
            connection_id: connectionId,
            agent_phone_number: agentPhone,
          },
        },
        user_config: { user_phone_number: phone },
      }),
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    });

    const payload = await upstream.json().catch(() => null) as { attempt_id?: string; detail?: unknown; message?: string } | null;
    if (!upstream.ok) {
      return NextResponse.json({
        error: typeof payload?.message === "string" ? payload.message : `Sarvam rejected the call request (HTTP ${upstream.status}).`,
      }, { status: upstream.status === 422 ? 422 : 502 });
    }

    if (!payload?.attempt_id) {
      return NextResponse.json({ error: "Sarvam accepted the request without returning an attempt ID." }, { status: 502 });
    }

    return NextResponse.json({ accepted: true, attemptId: payload.attempt_id });
  } catch {
    return NextResponse.json({ error: "Could not reach Sarvam. Please try again later." }, { status: 502 });
  }
}
