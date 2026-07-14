# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 2 — Profile Page
**Last completed:** 04 Database Schema
**Next:** 05 Profile Page — Full UI

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [x] 03 PostHog Initialization
- [x] 04 Database Schema

### Phase 2 — Profile Page

- [ ] 05 Profile Page — Full UI
- [ ] 06 Profile Save Logic
- [ ] 07 AI Profile Extraction from Resume
- [ ] 08 Resume PDF Generation from Profile

### Phase 3 — Find Jobs Page

- [ ] 09 Find Jobs Page — Full UI
- [ ] 10 Adzuna Job Discovery
- [ ] 11 Filter + Sort + Pagination

### Phase 4 — Job Details Page

- [ ] 12 Job Details Page — Full UI
- [ ] 13 Company Research Agent

### Phase 5 — Dashboard

- [ ] 14 Dashboard Page — Full UI
- [ ] 15 Stats Bar — Real Data
- [ ] 16 Recent Activity — Real Data
- [ ] 17 Analytics Charts — PostHog Data

---

## Decisions Made During Build

- **Auth package**: Use `@insforge/sdk/ssr` — NOT `@insforge/ssr` (that package doesn't exist on npm). All SSR helpers (`createBrowserClient`, `createServerClient`, `updateSession`, `createRefreshAuthRouter`, `createAuthActions`) are exported from `@insforge/sdk/ssr`.
- **OAuth callback**: Client sends `code` + PKCE verifier (from `sessionStorage["insforge_pkce_verifier"]`) to a Server Action (`exchangeOAuthCode`), which calls `createAuthActions({ cookies }).exchangeOAuthCode()`. This sets refresh token cookies on the app domain, not InsForge domain.
- **Token refresh route**: `createRefreshAuthRouter()` creates the `POST` handler at `app/api/auth/refresh/route.ts`. `createBrowserClient()` calls this automatically when access token expires.
- **Proxy (not Middleware)**: Next.js 16 renamed `middleware.ts` → `proxy.ts` and `export function middleware` → `export function proxy`. Functionality is identical. `updateSession()` from `@insforge/sdk/ssr/middleware` handles session check + silent refresh inline. Returns `{ session }` — redirect to `/login` when `session` is null.
- **RLS uses `auth.uid()`**: InsForge's Postgres exposes a Supabase-style `auth.uid()` function. All 4 tables (`profiles`, `agent_runs`, `jobs`, `agent_logs`) have RLS enabled with SELECT/INSERT/UPDATE policies scoped to `auth.uid() = user_id` (or `= id` for `profiles`, whose PK is the user's own `auth.users.id`). No DELETE policies — no delete feature exists in the build plan.
- **Storage has no per-object RLS**: `storage.objects` has zero Postgres policies, and `create-bucket` only exposes a top-level `isPublic` flag. "Own files only" access for resumes is enforced by making the `resumes` bucket private and only ever exposing a user's `resume_key` through their own RLS-protected `profiles` row — not by the storage layer itself.
- **`profiles.resume_key` added**: Not in the original architecture.md spec. The real storage SDK's `upload()`/`uploadAuto()` return `{key, url}`, and `download()`/`remove()` require the key — without storing it, Features 06/08 can't replace or delete the old resume file.
- **Real InsForge DB SDK is namespaced under `.database`**: `insforge.database.from(...)`, not `insforge.from(...)`. `library-docs.md` was corrected — it previously showed the call without the `.database` namespace.
- **Real storage SDK has no `upsert` or `getPublicUrl()`**: `upload()` auto-renames on key collision; there is no overwrite flag. `getPublicUrl()` doesn't exist — files are accessed via `download()` using the stored `key`. `library-docs.md` was corrected to match.

---

## Notes

_Add notes here as the build progresses — workarounds, patterns, anything that differs from the context files._
