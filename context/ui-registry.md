# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

### Navbar

**File:** `components/layout/Navbar.tsx`
**Classes:** `bg-surface border-b border-border` (header), `max-w-360 mx-auto px-6 h-16 flex items-center justify-between` (container), `text-sm font-medium text-text-dark hover:text-accent transition-colors` (nav links), `bg-accent text-accent-foreground text-sm font-medium px-4 py-2 rounded-md hover:bg-accent-dark transition-colors` (CTA button). Logo image only — no text label.

### Footer

**File:** `components/layout/Footer.tsx`
**Classes:** `bg-surface border-t border-border` (footer), `max-w-360 mx-auto px-6 py-8 flex items-center justify-between` (container), `text-sm text-text-muted` (copyright). Logo image only — no text label.

### Hero

**File:** `components/homepage/Hero.tsx`
**Classes:** `bg-surface py-20 px-6` (section), `text-5xl font-bold text-text-primary leading-[1.15]` (h1), `text-base text-text-secondary leading-relaxed` (subtitle), `bg-accent text-accent-foreground px-5 py-2.5 rounded-md text-sm font-medium` (primary CTA), `bg-surface border border-border text-text-primary px-5 py-2.5 rounded-md text-sm font-medium` (secondary CTA), `rounded-xl border border-border shadow-xl overflow-hidden` (dashboard card), `bg-surface-secondary flex items-center gap-1.5 px-4 py-3 border-b border-border` (browser chrome). Glow: `absolute -inset-x-192 -top-16 -bottom-8 pointer-events-none bg-[radial-gradient(ellipse_70%_90%_at_50%_40%,var(--color-accent-light)_0%,var(--color-info-lightest)_50%,transparent_75%)]` inside a `relative` text container wrapper.

### HowItWorks

**File:** `components/homepage/HowItWorks.tsx`
**Classes:** `bg-surface py-24 px-6` (section), `max-w-[1440px] mx-auto grid grid-cols-2 gap-20 items-center` (grid), `text-4xl font-bold text-text-primary leading-tight` (h2), `flex-shrink-0 w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center` (icon box), `text-sm font-semibold text-text-primary` (feature title), `text-sm text-text-secondary leading-relaxed` (feature description), `rounded-xl border border-border shadow-lg overflow-hidden` (screenshot card)

### Features

**File:** `components/homepage/Features.tsx`
**Classes:** Same section/grid/feature point classes as HowItWorks. Image appears on left, text on right (reversed column order).

### Testimonial

**File:** `components/homepage/Testimonial.tsx`
**Classes:** `bg-background py-24 px-6` (section), `max-w-3xl mx-auto text-center` (container), `text-2xl font-medium text-text-primary leading-relaxed italic` (blockquote), `w-12 h-12 rounded-full overflow-hidden border-2 border-border` (avatar), `text-sm font-semibold text-text-primary` (name), `text-xs text-text-muted mt-0.5` (role)

### BottomCTA

**File:** `components/homepage/BottomCTA.tsx`
**Classes:** `py-24 px-6 bg-linear-to-r from-accent-muted via-info-lightest to-accent-light` (section), `max-w-2xl mx-auto text-center` (container), `text-4xl font-bold text-text-primary leading-tight` (h2), `text-base text-text-secondary` (subtitle), primary and secondary button classes match Hero CTA pattern

### LoginCard

**File:** `components/auth/LoginCard.tsx`
**Used in:** `app/(auth)/login/page.tsx` (wrapped in `<Suspense>` — required by `useSearchParams`)
**Classes:** `relative w-full max-w-md` (outer wrapper), logo via `<Image src="/logo.png" className="h-9 w-auto mx-auto" />` (matches Navbar logo exactly), `text-2xl font-bold text-text-primary mb-2` (heading), `text-text-secondary text-sm` (subheading), `relative bg-surface border border-border rounded-2xl p-8 shadow` (card — `relative` required to clear glow layer), `flex items-center justify-center gap-3 w-full bg-surface border border-border rounded-md py-2.5 px-4 text-sm font-medium text-text-primary hover:bg-surface-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed` (OAuth button), `text-error text-sm text-center mb-4` (inline error message), `text-xs text-text-muted` (legal copy), `text-accent hover:underline` (inline links)
**Glow:** `absolute -inset-x-48 -inset-y-24 pointer-events-none bg-[radial-gradient(ellipse_70%_90%_at_50%_40%,var(--color-accent-light)_0%,var(--color-info-lightest)_50%,transparent_75%)]` inside outer `relative` wrapper — identical gradient to Hero section. Logo section and card both carry `relative` to sit above the glow layer.
**Error state:** Reads `?error=auth_failed` from URL via `useSearchParams`. Renders `text-error text-sm text-center mb-4` message above the buttons. Callback page redirects here with this param on OAuth exchange failure.
**Notes:** Self-contained — owns `oauthClient`, `handleOAuth`, and both provider icons. Page wraps it in `min-h-screen bg-background flex items-center justify-center px-4`.

### SignOutButton

**File:** `components/auth/SignOutButton.tsx`
**Used in:** `app/dashboard/page.tsx`, `app/profile/page.tsx`, `app/find-jobs/page.tsx`
**Classes:** `bg-surface border border-border text-text-primary text-sm font-medium px-4 py-2 rounded-md hover:bg-surface-secondary transition-colors` (button) — matches secondary CTA pattern from Hero/BottomCTA.
**Notes:** Server Component. Uses `<form action={signOut}>` to call the `signOut` Server Action directly — no `"use client"` needed. Always redirects to `/login` after sign-out, even if the server-side call errors.

### Callback Page

**File:** `app/(auth)/callback/page.tsx`
**Classes:** `min-h-screen bg-background flex items-center justify-center` (page), `w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4` (spinner), `text-text-secondary text-sm` (loading text).
**Notes:** Client Component. Reads `code` (or `insforge_code`) from URL params and PKCE verifier from `sessionStorage["insforge_pkce_verifier"]`. Calls `exchangeOAuthCode` Server Action. On success → `/dashboard`; on failure → `/login?error=auth_failed`. Uses `useRef(handled)` to prevent double-firing in React strict mode.

### Placeholder Pages (Auth-protected)

**Files:** `app/dashboard/page.tsx`, `app/profile/page.tsx`, `app/find-jobs/page.tsx`
**Classes:** `min-h-screen bg-background flex flex-col items-center justify-center gap-6` (page), `text-3xl font-bold text-text-primary` (h1), `text-text-secondary text-sm` (subtitle).
**Notes:** Server Components. Each imports `SignOutButton`. Stubs to be replaced in later features (14, 05, 09 respectively).
