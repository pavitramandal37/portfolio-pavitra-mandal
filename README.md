# Pavitra Mandal — Portfolio

Personal portfolio site for **Pavitra Mandal** — AI & Data Platform Engineer based in Tokyo. Built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, **MDX**, and **Framer Motion**. Deployed as a static export to **Netlify**.

---

## Features

- Modern dual-theme design (auto-switching cream/dark based on IST clock)
- Static export — no server runtime, fast cold loads
- Responsive, mobile-first layout
- SEO-ready: Open Graph, Twitter Cards, sitemap, robots.txt
- MDX-friendly content authoring
- EmailJS-powered contact form with per-subject templates and a per-email daily rate limit
- Google Analytics 4 wired up via `next/script`

## Tech stack

- **Framework:** Next.js 16 (App Router, static export)
- **UI:** React 19, Tailwind CSS 4
- **Content:** MDX (`@next/mdx`, `gray-matter`, `reading-time`)
- **Motion:** Framer Motion
- **Email:** EmailJS (`@emailjs/browser`)
- **Deployment:** Netlify
- **Language:** TypeScript

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/pavitramandal37/portfolio-pavitra-mandal.git
cd portfolio-pavitra-mandal
npm install
cp .env.example .env.local       # fill in your EmailJS keys
npm run dev                      # http://localhost:3000
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server on `http://localhost:3000` |
| `npm run build` | Build a static export to `out/` |
| `npm run start` | Start a production server (only useful if you remove `output: 'export'`) |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
├── app/                 # Next.js App Router pages
│   ├── contact/         # Contact form (EmailJS)
│   ├── experience/      # Experience & certifications
│   ├── hobby/           # Hobbies & side interests
│   ├── projects/        # Projects listing & detail pages
│   ├── blog/            # MDX blog
│   └── layout.tsx       # Root layout (theme, fonts, GA)
├── components/
│   ├── layout/          # Navigation, Footer
│   └── ui/              # Reusable UI (Button, PageHero, SectionHeader, ...)
├── content/blog/        # MDX blog posts
├── data/                # site-config, projects, experience, page images
└── lib/                 # Helpers (blog utilities, etc.)
public/
├── images/              # Static images
├── resume/              # Resume PDF
└── videos/              # Demo videos
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values. **All variables are prefixed `NEXT_PUBLIC_` because the contact form runs entirely in the browser — do not put any genuine secrets here**; everything in this file gets bundled into the static output.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID (your connected mailbox) |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_JOB` | Template used when subject = "Job Opportunity" |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_GENERAL` | Template used when subject = "General Inquiry" |

## Contact form

The form in [src/app/contact/page.tsx](src/app/contact/page.tsx) sends mail through EmailJS. It exposes **two subject types**:

- **Job Opportunity** — collects company, role, employment type, and an optional "send resume" flag in addition to name/email/message.
- **General Inquiry** — catch-all for project pitches, freelance briefs, questions, or just a hello.

Each subject routes to its own EmailJS template via the `TEMPLATE_IDS` map. EmailJS free plans cap you at 2 templates, which is why the dropdown is limited to two.

### Anti-abuse

The form enforces a **client-side daily limit of 5 messages per email address** (24-hour rolling window, tracked in `localStorage`). This is a deterrent, not a hard wall — a determined sender can bypass it by clearing storage or switching browsers. For real protection, set **Allowed Origins** in your EmailJS dashboard so the public key only works from your domain.

## Content management

### Adding a project

1. Open `src/data/projects.ts`.
2. Append a project object to the `projects` array (see existing entries for the schema).
3. Drop thumbnails/screenshots into `/public/images/projects/`.

### Adding a blog post

1. Create a new `.mdx` file in `src/content/blog/` with frontmatter:

    ```mdx
    ---
    title: "Your Blog Post Title"
    excerpt: "A brief summary"
    date: "2026-01-01"
    tags: ["Tag1", "Tag2"]
    coverImage: "/images/blog/cover.jpg"
    published: true
    ---

    # Your Content Here
    ```

2. Drop the cover image into `/public/images/blog/`.
3. Set `published: true` when ready.

### Updating personal info

- **Site config:** `src/data/site-config.ts` — name, tagline, URL, social links.
- **Experience:** `src/data/` files used by `src/app/experience/`.
- **Profile photo:** `/public/images/profile/`.

## Theming

The site auto-switches between a `cream` daytime theme and a `dark` night theme based on **Asia/Kolkata** (IST) clock time — 06:00–17:59 IST is cream, 18:00–05:59 IST is dark. Users can override via the theme toggle; the choice persists in `localStorage['theme-override']`. The decision runs as an inline script in [src/app/layout.tsx](src/app/layout.tsx) before React hydrates, to avoid a flash of the wrong theme.

## Analytics

Google Analytics 4 is wired up in [src/app/layout.tsx](src/app/layout.tsx) with a hardcoded tracking ID (`G-1MSNYKQ1DC`). Replace it if you fork this project.

## Deployment

The site is configured for static export to Netlify:

- [next.config.ts](next.config.ts) sets `output: 'export'` and `images.unoptimized: true`.
- [netlify.toml](netlify.toml) handles build, redirects, caching, and security headers.

### Option 1: Netlify dashboard

1. Push to GitHub.
2. In Netlify: **Add new site → Import an existing project**.
3. Connect the repo. Build settings are auto-detected from `netlify.toml`.
4. Add the EmailJS env vars under **Site settings → Environment variables**.
5. Deploy.

### Option 2: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Browser support

Latest evergreen Chrome, Firefox, Safari, Edge.

## Contact

- **LinkedIn:** [pavitra-mandal](https://www.linkedin.com/in/pavitra-mandal-b0b0571a0/)
- **GitHub:** [pavitramandal37](https://github.com/pavitramandal37)
- **Instagram:** [pavitra.hito](https://www.instagram.com/pavitra.hito/)

---

Built with Next.js · Deployed on Netlify.
