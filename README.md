# Marmar Kitchen — AI Restaurant Chatbot

A restaurant demo site with a **live AI concierge** powered by [Groq](https://groq.com), built with **Next.js 15 (App Router)**, **TypeScript** and **Tailwind CSS**. Statically exported for the frontend, with a small **Cloudflare Worker** handling the chat API so the AI provider key never reaches the browser.

Part of the [GulfAutomation](https://agency-website.pranaykuwait.workers.dev) portfolio — demonstrates the AI chatbot service the agency builds for restaurants and service businesses.

**Live:** https://restaurant-chatbot.pranaykuwait.workers.dev — auto-deploys on push to `main` via Cloudflare's Git integration.

## Architecture

Unlike the other two portfolio demos (which are 100% static), this site needs a real backend to call Groq without exposing the API key. It's still one Cloudflare deployment, just with two parts:

- **Frontend** — `next build` with `output: "export"` → static files in `./out`.
- **Backend** — `worker/index.ts`, a small Cloudflare Worker that:
  - Serves the static site for every normal request (via the `ASSETS` binding).
  - Handles `POST /api/chat`: validates the request, attaches the `GROQ_API_KEY` **secret** server-side, and streams Groq's response back to the browser.

The API key lives only as a Cloudflare secret — it is **never** committed to git, never sent to the browser, and never appears in the static export.

## Local development

```bash
npm install
npm run dev          # frontend only, http://localhost:3000 (chat widget calls will 404 — no worker running)
```

To test the chat end-to-end locally, use Wrangler instead (it runs the Worker + serves `./out`):

```bash
npm run build
cp .dev.vars.example .dev.vars   # then paste your real Groq key into .dev.vars
npm run worker:dev               # http://localhost:8787
```

`.dev.vars` is gitignored — it's read automatically by `wrangler dev` and is the correct way to test secrets locally. **Never commit it.**

## Deploy on Cloudflare

Create a **Workers** project (not Pages) from this repo, name it exactly **`restaurant-chatbot`**:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

Then set the secret so the deployed Worker can reach Groq — **required**, the chatbot won't respond without it:

```bash
npx wrangler secret put GROQ_API_KEY
# paste your key when prompted
```

Or via the dashboard: **Workers & Pages → restaurant-chatbot → Settings → Variables and Secrets → Add → Secret → `GROQ_API_KEY`**.

If the secret isn't set, the site still works — the chat widget just shows a friendly "temporarily unavailable" message instead of crashing.

## Guardrails already in place

- Requests are capped to the last 20 messages / 1000 characters each, and responses are capped at 400 tokens — keeps a single conversation cheap.
- The system prompt restricts the assistant to restaurant topics only (menu, hours, location, reservations).
- Requests are rejected if their `Origin` header doesn't match the deployed site or `localhost` — blocks casual scripted abuse of the key (not a substitute for real rate limiting on high traffic; add a Cloudflare Rate Limiting rule in the dashboard if this goes fully public).

## Customize

| What | Where |
| --- | --- |
| Menu items, prices, restaurant info | `lib/menu.ts` |
| AI system prompt / personality | `lib/systemPrompt.ts` |
| Chat model / token limits / origin allowlist | `worker/index.ts` |
| Chat widget UI | `components/ChatWidget.tsx` |
| Site URL (SEO) | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `worker/index.ts` (`ALLOWED_ORIGINS`) |
