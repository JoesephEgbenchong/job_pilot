# JobPilot

An AI-powered job hunting assistant. Set up your profile once, upload your resume, and let the agent find, score, and research jobs for you — so you arrive at every application fully prepared.

## What it does

- **Finds relevant jobs** — searches Adzuna and filters to IT roles matching your title and location
- **Scores every match** — GPT-4o rates each job 0–100 against your actual skills with a clear reason why
- **Researches companies** — a Browserbase + Stagehand agent browses the company's public site and builds a structured dossier: tech stack, culture, why the role exists, your edge, gaps to address, and smart interview questions
- **Manages your resume** — upload an existing PDF to auto-fill your profile via GPT-4o, or generate a clean professional resume from your profile data
- **Tracks everything** — dashboard with stats, recent activity, and PostHog-powered analytics charts

## Stack

| Layer | Tool |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Auth / DB / Storage | InsForge |
| Cloud browser | Browserbase |
| AI browser control | Stagehand |
| Job discovery | Adzuna API |
| AI model | OpenAI GPT-4o |
| Analytics | PostHog |
| PDF generation | @react-pdf/renderer |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Language | TypeScript (strict) |

## Pages

| Route | Description |
| --- | --- |
| `/` | Homepage |
| `/login` | Google + GitHub OAuth |
| `/dashboard` | Stats, recent activity, analytics charts |
| `/find-jobs` | Search controls + paginated job list |
| `/find-jobs/[id]` | Job details, match score, company research |
| `/profile` | Profile form + resume management |

## Getting started

```bash
npm install
```

Copy `.env.local.example` to `.env.local` and fill in your keys:

```env
NEXT_PUBLIC_INSFORGE_URL=
NEXT_PUBLIC_INSFORGE_ANON_KEY=
BROWSERBASE_API_KEY=
BROWSERBASE_PROJECT_ID=
OPENAI_API_KEY=
ADZUNA_APP_ID=
ADZUNA_APP_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
