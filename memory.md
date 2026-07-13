# Memory — PostHog Integration + Auth Bug Fixes

Last updated: 2026-07-13

## What was built

No new features — this session was bug fixes, infrastructure config, and context doc cleanup.

**Files modified:**
- `.mcp.json` — created; PostHog MCP server configured via `npx @posthog/mcp` (gitignored, local only)
- `.claude/settings.local.json` — added `"posthog"` to `enabledMcpjsonServers`
- `app/providers.tsx` — fixed `PostHogIdentifier`: `getUser()` → `getCurrentUser()`, correct destructuring, removed non-existent `onAuthStateChange`, added error logging
- `lib/posthog-client.ts` — removed incorrect `"use client"` directive; removed unused `posthog` re-export
- `context/architecture.md` — updated InsForge client patterns to match actual SDK (was showing `@insforge/ssr` with positional args; now shows `@insforge/sdk/ssr` with options object)
- `context/code-standards.md` — updated dependency entry from `@insforge/ssr` to `@insforge/sdk` + `@insforge/sdk/ssr`

## Decisions made

- **PostHog MCP uses local `.mcp.json` only** — gitignored, never committed. Current API key in that file is the project ingestion key (`phc_...`). MCP querying analytics data requires replacing it with a personal API key (`phx_...`) from PostHog Settings → Personal API Keys.
- **`createBrowserClient()` called with no args** — the SDK reads `NEXT_PUBLIC_INSFORGE_URL` and `NEXT_PUBLIC_INSFORGE_ANON_KEY` automatically. Do not pass positional args.
- **`createServerClient({ cookies: cookieStore })`** — pass the full Next.js cookie store directly as the `cookies` option. No manual `getAll`/`setAll` wiring needed.
- **No `onAuthStateChange` on browser client** — `BrowserInsForgeClient` only exposes `getCurrentUser`, `getProfile`, and `getPublicAuthConfig`. Auth state change listeners do not exist on the browser client. Identity sync happens on mount only; full-page redirects from OAuth flow make this sufficient.

## Problems solved

- **`insforge.auth.getUser is not a function`** — The browser client (`createBrowserClient`) exposes only `getCurrentUser`, not `getUser`. Fixed call site in `providers.tsx`.
- **`getCurrentUser` destructuring** — `getCurrentUser()` returns `{ data: { user }, error }`. The `user` is nested inside `data`. Use two lines: `const { data, error } = await ...; const user = data.user;` to avoid TypeScript nested-destructuring confusion.
- **OAuth "Failed to fetch"** — Was the InsForge backend project being offline/disconnected, not a code issue. Reconnecting the backend resolved it.
- **PostHog "Unique user id has not been set"** — Caused by wrong destructuring: `data` was being passed as `user`, so `user.id` was `undefined`. Fixed by correct two-line destructuring.

## Current state

- Feature 01 (Homepage) ✅
- Feature 02 (Auth) ✅
- Feature 03 (PostHog Initialization) ✅ — page tracking and user identity working
- PostHog MCP connector configured but needs personal API key before analytics queries work
- Dev server on port 3000 with Turbopack

## Next session starts with

Feature 04 — Database Schema. Read `context/build-plan.md` for the spec, then run `/architect` before writing any SQL or SDK calls.

## Open questions

- PostHog MCP `.mcp.json` needs `POSTHOG_API_KEY` replaced with a personal API key (`phx_...`) from PostHog Settings → Personal API Keys before MCP analytics queries will work.
