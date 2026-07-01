import { buildSystemPrompt } from "../lib/systemPrompt";

export interface Env {
  ASSETS: Fetcher;
  GROQ_API_KEY: string;
}

const GROQ_MODEL = "llama-3.3-70b-versatile";
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 1000;

// Restrict who can call /api/chat. Browsers send an Origin header on same-
// origin POST requests, so this blocks naive scripted abuse of the key
// while real page traffic works normally. Not a substitute for auth on a
// high-traffic deployment, but reasonable for a portfolio demo.
const ALLOWED_ORIGINS = [
  "https://restaurant-chatbot.pranaykuwait.workers.dev",
  "http://localhost:3000",
  "http://localhost:8787",
];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/chat" && request.method === "POST") {
      return handleChat(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleChat(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin");
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return json({ error: "Forbidden" }, 403);
  }

  if (!env.GROQ_API_KEY) {
    return json({ error: "Chat is temporarily unavailable. Please try again later." }, 503);
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const messages = incoming
    .filter(
      (m): m is { role: string; content: string } =>
        !!m &&
        typeof m === "object" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }));

  if (messages.length === 0) {
    return json({ error: "No message provided." }, 400);
  }

  let groqRes: Response;
  try {
    groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
        temperature: 0.6,
        max_tokens: 400,
        stream: true,
      }),
    });
  } catch {
    return json({ error: "Couldn't reach the assistant. Please try again shortly." }, 502);
  }

  if (!groqRes.ok || !groqRes.body) {
    return json({ error: "The assistant is unavailable right now. Please try again shortly." }, 502);
  }

  return new Response(groqRes.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
