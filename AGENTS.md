<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Read Before Anything Else

Read in this exact order before any implementation:

1. context/project-overview.md
2. context/architecture.md
3. context/ui-tokens.md
4. context/ui-rules.md
5. context/ui-registry.md
6. context/code-standards.md
7. context/library-docs.md
8. context/build-plan.md
9. context/progress-tracker.md

## Rules That Never Change

- Never use hardcoded hex values or raw Tailwind color classes
- Update `progress-tracker.md` and `ui-registry.md` after every feature
- Before any third party library — load its installed skill first,
  then read `context/library-docs.md` for project-specific rules
- If the same problem persists after one corrective prompt —
  stop immediately and run /recover

## Available Skills

- `/architect` — before any complex feature. Think before building.
- `/imprint` — after any new UI component. Capture patterns.
- `/review` — before demo or when something feels off.
- `/recover` — when something breaks after one failed correction.
- `/remember save` — when a feature spans multiple sessions.
- `/remember restore` — when returning after a multi-session feature.

---

## InsForge SDK Documentation - Overview

> Added by InsForge MCP installer. Project uses Tailwind CSS v4 — ignore the note below about v3.4.

### What is InsForge?

Backend-as-a-service (BaaS) platform providing:

- **Database**: PostgreSQL with PostgREST API
- **Authentication**: Email/password + OAuth (Google, GitHub)
- **Storage**: File upload/download
- **AI**: OpenRouter key provisioning and model catalog for direct OpenAI-compatible integrations
- **Functions**: Serverless function deployment
- **Realtime**: WebSocket pub/sub (database + client events)

### Getting Detailed Documentation

**CRITICAL: Always call `fetch-docs` or `fetch-sdk-docs` MCP tool before writing any InsForge integration code.**

Available `fetch-docs` types:

- `"instructions"` — Essential backend setup (START HERE)
- `"real-time"` — Real-time pub/sub via WebSockets
- `"db-sdk-typescript"` — Database operations with TypeScript SDK
- `"auth-sdk-typescript"` — TypeScript SDK methods for custom auth flows
- `"auth-components-nextjs"` — Pre-built auth UI for Next.js (SSR)
- `"storage-sdk"` — File storage operations
- `"functions-sdk"` — Serverless functions invocation
- `"ai-integration-sdk"` — AI integration with OpenRouter key
- `"deployment"` — Deploy frontend via MCP tool
- `"payments"` — Stripe Checkout, Billing Portal, webhooks

### When to Use SDK vs MCP Tools

**SDK (application logic):** auth, database CRUD, storage, AI, functions, payments checkout

**MCP tools (infrastructure):** schema management (`run-raw-sql`, `get-table-schema`), bucket creation, function deployment, frontend deployment, backend metadata

### SDK Notes

- SDK returns `{data, error}` for all operations
- Database inserts require array format: `[{...}]`
- Serverless functions have one endpoint, no nested route paths
- Storage: upload files to buckets, store URLs in database
- AI: call OpenRouter directly with `baseURL: "https://openrouter.ai/api/v1"` and server-side `OPENROUTER_API_KEY`
