# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 1 — Foundation
**Last completed:** 02 Auth
**Next:** 03 PostHog Initialization

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [ ] 03 PostHog Initialization
- [ ] 04 Database Schema

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

---

## Notes

_Add notes here as the build progresses — workarounds, patterns, anything that differs from the context files._
