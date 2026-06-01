# Aetheris Student Learning Dashboard

A premium, production-ready, ultra-modern LMS metrics dashboard meticulously structured using the Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Supabase. The visual layout and design language draw inspiration from elite developer utilities and SaaS platforms like Vercel, Linear, Stripe Dashboard, and Raycast.

---

## 🌟 Project Overview

**Aetheris** delivers a futuristic terminal-inspired workspace for advanced engineering and design students. Featuring interactive Bento compositions, dynamic visual streak indicators, GitHub-style consistency charts, and performance-tuned micro-interactions, the dashboard is engineered for responsiveness, accessibility, and speed.

---

## 🏗️ Architecture Decisions

### Clean Separation of Concerns
We have adopted a strict directory separation pattern to organize the codebase. Every module is highly modularized with no hidden inter-dependencies:
*   **`app/`**: Next.js App Router folders containing layout, global theme bindings, and view files.
*   **`components/`**: Divided into layout shells (`components/layout/`), reusable primitive widgets (`components/ui/`), and high-fidelity Bento dashboard pieces (`components/dashboard/`).
*   **`lib/`**: Contains pure library hooks, connection utilities, and data queries.
*   **`types/`**: Centrally typed type definitions, leaving components clean of inline declarations.

### Server vs Client Components
To maximize performance and SEO, we implement hybrid React architectures:
*   **Server Components (`app/page.tsx`)**: Queries Supabase courses directly on the server. Data fetching happens near the database to reduce client bundle sizes and latency.
*   **Client Components (`components/dashboard/DashboardShell.tsx`, `Sidebar.tsx`, etc.)**: Manages interactive dashboard tabs, state, and complex Framer Motion hover states which need client-side event bindings.

---

## 💾 Supabase Integration & Connection Resilience

The application connects to a Supabase PostgreSQL backend via public tables.

### 1. Database Schema
To initialize the backend, execute the queries in `schema.sql` inside the Supabase SQL Editor:
```sql
-- Create courses table
CREATE TABLE public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### 2. Zero-Config Connection Fallback
To ensure a frictionless initial setup experience, the database client (`lib/supabase/client.ts`) includes transparent connection fallbacks. If the `env` keys are not defined, the server component will gracefully return seed arrays and log a reminder. This guarantees that `npm run dev` works instantly on download without any pre-requisites!

---

## 🎬 Animation Strategy & Performance Rules

Next.js App Router platforms can suffer from Cumulative Layout Shift (CLS) if animations are not configured carefully. We adhere to rigid performance constraints:

> [!IMPORTANT]
> **Strict Animation Constraints Enforced:**
> *   **Transform & Opacity Only:** All animations are bound strictly to `transform` and `opacity`. Never animate `width`, `height`, `margin`, `padding`, or absolute placement keys.
> *   **GPU Acceleration:** Accelerated layers are forced using `will-change-transform`, `will-change-opacity`, and `transform-gpu` to ensure constant 60 FPS transitions.
> *   **Non-Reflowing Progress Bars:** To animate the progress indicator from `0 -> value` without reflows (which would occur by animating `width`), we render a full-width element and animate its horizontal transform scale (`scaleX`) from an `originX: 0` anchor!

---

## 📂 Folder Structure

```
d:/FD Task/
├── app/
│   ├── error.tsx               # Graceful error recovery with retry trigger
│   ├── globals.css             # Ambient glowing background, custom scrollbars
│   ├── layout.tsx              # Google font loaders and base HTML shell
│   ├── loading.tsx             # Zero-CLS bento skeleton pulse shimmers
│   └── page.tsx                # Server Component fetching course metrics
├── components/
│   ├── dashboard/
│   │   ├── ActivityTile.tsx    # GitHub-style adaptive heatmap tooltips
│   │   ├── BentoGrid.tsx      # Main layout composition grids
│   │   ├── CourseTile.tsx     # Progress spring animation, scale elevations
│   │   ├── DashboardShell.tsx  # Interactive shell rendering page tabs
│   │   └── HeroTile.tsx       # Welcome gradient particles, streak metrics
│   └── layout/
│       └── Sidebar.tsx        # Responsive navigation (Desktop, Tablet, Mobile bottom nav)
├── lib/
│   ├── supabase/
│   │   └── client.ts           # Resilient server-side DB querying client
│   └── utils.ts                # Class merger helper (cn)
├── types/
│   └── index.ts                # Strong TypeScript interfaces
├── .env.example                # Sample environment configurations
├── schema.sql                  # Seed database schema setup
├── tailwind.config.ts          # Accent color definitions, glows, mesh keyframes
├── next.config.ts              # Optimizations and compiler settings
└── tsconfig.json               # Path alias and strict options config
```

---

## 🔧 Environment Setup

Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🚀 Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

### 3. Build & Compile Production Target
```bash
npm run build
```

---

## ☁️ Deployment to Vercel

1. Push your repository code to GitHub, GitLab, or Bitbucket.
2. Log in to the [Vercel Dashboard](https://vercel.com) and click **Add New Project**.
3. Select your repository.
4. Expand **Environment Variables** and add the Supabase keys:
    *   `NEXT_PUBLIC_SUPABASE_URL`
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**. Vercel will automatically build, compile, and host your server-side App Router dashboard!

---

## 🖼️ Screenshots Section
*(Add screenshots demonstrating responsive layouts across Mobile bottom bars, Tablet icons, and Desktop Bento grids)*

---

## 🛡️ Challenges & Solutions

| Challenge | Solution |
| :--- | :--- |
| **Cumulative Layout Shift (CLS) on loading** | We recreated the exact dimensions of the grid cells inside `app/loading.tsx` using shimmer pulses. When Next.js loads the page, the skeleton seamlessly gets swapped for final content with absolutely zero shifts! |
| **Animating width for progress bar causes layout recalculation** | Enforced a high-performance visual trick: set the progress bar to `w-full` and animate its `scaleX` from `0` to its target percentage using a Framer Motion spring from the left origin. |
| **First-run app crash before DB keys are supplied** | Built an elegant server-side fallback layer in `client.ts` that safely returns robust seeded mock data and prints console warnings, so the site loads beautifully without throwing exceptions immediately. |
