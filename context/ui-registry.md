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

**Files:** `app/dashboard/page.tsx`, `app/find-jobs/page.tsx`
**Classes:** `min-h-screen bg-background flex flex-col items-center justify-center gap-6` (page), `text-3xl font-bold text-text-primary` (h1), `text-text-secondary text-sm` (subtitle).
**Notes:** Server Components. Each imports `SignOutButton`. Stubs to be replaced in later features (14, 09 respectively). `app/profile/page.tsx` replaced in Feature 05 — see below.

### Profile Page

**File:** `app/profile/page.tsx`
**Classes:** `min-h-screen bg-background` (page), `max-w-4xl mx-auto px-8 py-8 flex flex-col gap-6` (main content column — narrower than the 1440px page invariant since this is a single-column form, matching `profile.png`'s proportions).
**Notes:** Server Component. Renders `Navbar`, then `CompletionIndicator`, `ResumeUpload`, `ProfileForm` in a vertical stack. Mock `Profile` object (matching `profile.png`'s values exactly, including intentionally-empty phone/location/institution/graduation_year to reproduce the 70% completion state) is defined here and passed down. `calculateProfileCompletion()` (in `lib/utils.ts`) runs once against the initial mock object — not recomputed live as the user edits, since the design shows one static banner state per page load; Feature 06 will decide whether to make it live.
**Scope note:** `build-plan.md` §05 also specs a "Connected Accounts" (LinkedIn) section — omitted here because it does not appear in `profile.png`, which was designated the literal source of truth for this feature. Similarly, `cover_letter_tone` exists on the `Profile` type (matches `architecture.md`'s DB schema) but has no form control in this UI — not shown in the design either. Both can be added later as their own scoped work if actually needed.

### CompletionIndicator

File: `components/profile/CompletionIndicator.tsx`
Last updated: 2026-07-13

| Property         | Class                                                             |
| ---------------- | ------------------------------------------------------------------ |
| Background       | `bg-surface`                                                      |
| Border            | `border border-border`                                            |
| Border radius     | `rounded-2xl` (card), `rounded-full` (missing-field pill)          |
| Text — primary    | `text-text-primary` (percentage, heading)                         |
| Text — secondary  | `text-text-secondary` (description)                               |
| Spacing           | `p-6`, `gap-6` (card), `gap-2` (pill wrap), `mt-2`/`mt-3`          |
| Hover state       | none — no interactive elements in this component                  |
| Shadow            | `shadow`                                                          |
| Accent usage      | none — this component is error-toned (incomplete-profile warning), not accent-toned |

**Pattern notes:**
Missing-field pills and the SVG progress ring both use `text-error`/`bg-error/10`/`stroke-error/15` (Tailwind opacity modifiers on the `--color-error` token) rather than a dedicated light/lightest error token. `ui-tokens.md` defines `-light`/`-lightest` variants for success/info/warning but not for error — flagging this as a gap worth adding to `ui-tokens.md` if another error-toned surface is needed later, so future components use a named token instead of an opacity modifier. Pure presentational — no `"use client"`; returns `null` when the profile is 100% complete.

### ResumeUpload

File: `components/profile/ResumeUpload.tsx`
Last updated: 2026-07-13

| Property         | Class                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| Background       | `bg-surface` (card), `bg-surface-secondary` (dropzone default), `bg-accent-muted` (dropzone dragging)         |
| Border            | `border border-border` (card), `border-2 border-dashed border-border-muted` (dropzone default), `border-accent` (dropzone dragging) |
| Border radius     | `rounded-2xl` (card), `rounded-xl` (dropzone), `rounded-md` (buttons), `rounded-full` (upload icon badge)     |
| Text — primary    | `text-text-primary` (headline / filename)                                                                    |
| Text — muted      | `text-text-muted` (helper copy)                                                                              |
| Spacing           | `p-6` (card), `py-12` (dropzone), `px-4 py-2` (buttons), `gap-3` (dropzone stack)                             |
| Hover state       | `hover:bg-surface-secondary` (secondary button), `hover:bg-surface-tertiary` (dropzone idle), `hover:bg-accent-dark` (primary button) |
| Shadow            | `shadow` (card only — dropzone and buttons have none)                                                        |
| Accent usage      | `bg-accent text-accent-foreground` (Generate Resume button), `border-accent`/`bg-accent-muted` (drag-active state), `text-accent` (upload icon) |

**Pattern notes:**
Client Component — `useState` for selected file + drag-over state only, nothing persists. `ResumePreview.tsx` (present in `architecture.md`'s file registry) was deferred: `profile.png` only shows the empty dropzone state, never an "existing resume" preview, so there's no design to build it against. Selected-file display was folded inline into this component instead. Build `ResumePreview.tsx` once a feature needs to render a persisted resume.

### ProfileForm

File: `components/profile/ProfileForm.tsx`
Last updated: 2026-07-13

| Property         | Class                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| Background       | `bg-surface` (card + inputs), `bg-surface-secondary` (disabled input, tag pill)                              |
| Border            | `border border-border` (card, inputs, tag pill), `border-border` (role sub-card)                            |
| Border radius     | `rounded-2xl` (outer card), `rounded-lg` (role sub-card), `rounded-md` (inputs/buttons), `rounded-full` (tag pill) |
| Text — primary    | `text-text-primary` (input values, subsection headings)                                                      |
| Text — secondary  | `text-text-secondary` (field labels — `uppercase text-xs tracking-wide`)                                     |
| Text — muted      | `placeholder:text-text-muted`, `text-text-muted` (disabled input)                                            |
| Spacing           | `p-6` (card), `px-3 py-2` (inputs), `gap-4` (field grids), `my-6` (section `hr`)                              |
| Hover state       | `hover:bg-surface-secondary` (secondary/tag buttons), `hover:text-accent-dark` (Add role link), `hover:bg-accent-dark` (Save button) |
| Focus state       | `focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent` — standard input focus pattern, apply to every future text/select input |
| Shadow            | `shadow` (outer card only — role sub-cards use border only, no shadow, to avoid stacking two shadow levels) |
| Accent usage      | focus ring (all inputs), Add role link, Save Profile button, `accent-accent` on the native checkbox         |

**Pattern notes:**
Single `useState<Profile>` seeded from the `initialProfile` prop; nothing persists (Feature 06 wires the save). Local unexported helpers `TextField`/`SelectField`/`Tag` live in the same file rather than separate files — mirrors the existing `GoogleIcon`/`GitHubIcon` pattern in `LoginCard.tsx` for small, non-reusable-elsewhere pieces. This establishes `inputClass`/`labelClass`/focus-ring pattern above as the canonical form-field look for the whole app — match it exactly for any future form (e.g. no separate input styling in Find Jobs' search controls). Known gotcha: `<input type="month">` renders in the browser/OS locale (e.g. "janvier 2022" seen in a French-locale test run) — native behavior, not a bug.
