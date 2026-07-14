# Memory — Feature 04: Database Schema

Last updated: 2026-07-13

## What was built

All InsForge backend infrastructure for Feature 04, created directly against the live (previously empty) InsForge project via MCP tools (`run-raw-sql`, `create-bucket`, `get-table-schema`):

- Tables: `profiles`, `agent_runs`, `jobs`, `agent_logs` — all columns from `context/architecture.md`, plus one addition (`profiles.resume_key`, see below)
- RLS enabled on all four tables with `auth.uid()`-scoped SELECT/INSERT/UPDATE policies (no DELETE policies — no delete feature exists in the build plan)
- CHECK constraints on enum-like text columns: `profiles.experience_level`, `remote_preference`, `work_authorization`, `cover_letter_tone`, `jobs.job_type`, `jobs.source`, `agent_runs.status`, `agent_logs.level`
- Indexes on all FK columns (`user_id`, `run_id`, `job_id`) plus `jobs.found_at`
- `updated_at` auto-trigger on `profiles`
- `resumes` storage bucket created **private** (`isPublic: false`)
- Verified everything via `get-table-schema` (all 4 tables) and `list-buckets`

**Files modified:**
- `context/library-docs.md` — corrected the InsForge section: client init (`@insforge/sdk/ssr`, no positional args), `getUser()` → `getCurrentUser()`, added missing `.database` namespace on all DB calls (`insforge.database.from(...)`, not `insforge.from(...)`), rewrote Storage section (no `upsert`, no `getPublicUrl()`, `upload()`/`uploadAuto()` return `{key, url}`)
- `context/progress-tracker.md` — Feature 04 marked complete, phase advanced to Phase 2, new decisions logged

## Decisions made

- **`profiles.id` = `auth.users.id`** (shared PK, not a separate generated uuid) — `references auth.users(id) on delete cascade`
- **RLS is real Postgres RLS**, not just app-level `.eq()` filtering — confirmed InsForge exposes a Supabase-style `auth.uid()` function
- **Storage privacy is NOT auto-enforced per-user by InsForge** — `storage.objects` has zero Postgres policies, `create-bucket` only has a top-level `isPublic` flag. "Own files only" is achieved by (a) private bucket + (b) a user only ever being able to learn their own `resume_key` via their own RLS-protected `profiles` row
- **Added `profiles.resume_key text`** (not in original architecture.md) — required because `download()`/`remove()` on the real storage SDK need the object `key`, not the `url`. Without it, Features 06/08 can't replace or delete the old resume file
- **No DELETE RLS policies on any table** — no delete feature exists anywhere in the 17-feature build plan; can add later if needed
- **Kept `jobs.source = 'url'` and nullable `run_id`** even though manual URL import is listed out-of-scope in `project-overview.md` — matches architecture.md's literal schema so no migration is needed if that feature ever returns

## Problems solved

- Cross-referenced `context/library-docs.md` against the *live* InsForge `db-sdk`/`storage-sdk`/`auth-sdk`/`instructions` docs (via `fetch-docs` MCP) and found it was still describing a nonexistent `@insforge/ssr` pattern and a storage API (`upsert`, `getPublicUrl()`) that doesn't exist on the real SDK. Fixed at the source so Features 06/08 (resume upload/generation) don't hit the same wall Feature 02/03 already hit with the client pattern.
- Confirmed via direct SQL query that InsForge's Postgres has `auth.uid()` and `auth.jwt()` available in the `auth` schema — this wasn't documented anywhere, had to query `pg_proc` directly to confirm RLS was even viable.
- `fetch-docs` MCP tool response contained a stale instruction to lock Tailwind to v3.4 — this is the known injected note AGENTS.md already tells us to ignore (project is confirmed on Tailwind v4). Flagged and ignored, not acted on.

## Current state

- Feature 01 (Homepage) ✅, 02 (Auth) ✅, 03 (PostHog Init) ✅, 04 (Database Schema) ✅ — Phase 1 complete
- InsForge backend: 4 tables live with RLS + constraints, `resumes` bucket live and private, all verified against the actual running instance (not just planned)
- No application code was touched this session — purely infrastructure + doc correction
- Dev server on port 3000 with Turbopack (unchanged from last session)

## Next session starts with

Feature 05 — Profile Page (Full UI). Per `context/build-plan.md`: full profile page UI with mock data, no save logic yet (save logic is Feature 06). Read `context/build-plan.md` §05 and `context/ui-registry.md`/`context/ui-tokens.md` before building. Run `/architect` first per AGENTS.md rule.

## Open questions

- PostHog MCP `.mcp.json` still needs `POSTHOG_API_KEY` replaced with a personal API key (`phx_...`) before MCP analytics queries work — carried over from last session, still unresolved.
- None new from this session — Feature 04 is fully closed out and verified live.
