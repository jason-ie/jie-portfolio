# Portfolio Design Spec — Jason Ie
**Date:** 2026-04-07  
**Status:** Approved

---

## Overview

Single-page personal portfolio for Jason Ie, a senior CS student focused on distributed systems, ML infrastructure, and quantitative engineering. The aesthetic is strictly dark, minimalist, and editorial — with a subtle CS easter egg (JSON ghost text) as the only creative flourish. No trading-theme copy anywhere in content; visual chrome only.

---

## Stack

- **Framework:** Next.js (App Router)
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS + CSS custom properties for theme tokens
- **Fonts:** Google Fonts (next/font)
  - `Fraunces` — variable serif, display/headings (`opsz`, `wght`, `SOFT` axes)
  - `Space Grotesk` — body, labels, nav
  - `JetBrains Mono` — dates, mono data labels
- **Deployment:** Vercel

---

## Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#111318` | Page background — warm dark with faint blue tint |
| `--bg-surface` | `#151720` | Slightly lifted surface (cards if needed) |
| `--text` | `#E8E2F4` | Primary text — warm lavender-white |
| `--text-dim` | `rgba(232,226,244,0.38)` | Secondary text, descriptors |
| `--text-sub` | `rgba(232,226,244,0.18)` | Tertiary — dates, labels, nav |
| `--accent` | `#8B9CF4` | Indigo periwinkle — all interactive/accent elements |
| `--accent-border` | `rgba(139,156,244,0.22)` | Accent-tinted borders |
| `--rule` | `rgba(232,226,244,0.07)` | Horizontal dividers |
| `--ghost-stroke` | `rgba(232,226,244,0.10)` | JSON ghost text outline |
| `--green` | `#22C55E` | Reserved — positive/gain micro-accents (future) |
| `--red` | `#EF4444` | Reserved — negative/loss micro-accents (future) |

---

## Typography

| Role | Font | Weight | Settings |
|---|---|---|---|
| Hero name | Fraunces | 800 | `opsz` 144, `SOFT` 15, `letter-spacing` -0.03em |
| Hero name italic ("Ie.") | Fraunces italic | 800 | `opsz` 144, `SOFT` 60, color: `--accent` |
| Project names | Fraunces | 600 | `opsz` 36, `SOFT` 10, `letter-spacing` -0.02em |
| Contact heading | Fraunces | 700 | `opsz` 96, `SOFT` 20 |
| Contact heading italic | Fraunces italic | 700 | `opsz` 96, `SOFT` 60 |
| Experience role | Fraunces | 600 | `opsz` 24, `SOFT` 5 |
| Body / nav / labels | Space Grotesk | 300–500 | standard |
| Dates / mono labels | JetBrains Mono | 300 | `letter-spacing` 0.08em |

---

## Layout — Single Page Sections

### 1. Nav (fixed)
- Logo left: `Jason Ie` — Space Grotesk 500, uppercase, `--text-sub`
- Links right: `Work`, `Experience`, `Contact` — smooth scroll anchors
- Background: gradient fade from `--bg` to transparent (top 80px)
- Hover: links transition to `--accent`

### 2. Hero (100vh)
- Content anchored to bottom-left (`justify-content: flex-end`, `padding: 0 56px 56px`)
- **JSON ghost:** `Fraunces` 900, `font-size: 52vw`, stacked two rows (`JS` / `ON`), right-aligned, bleeds off right edge. `-webkit-text-stroke: 1.5px var(--ghost-stroke)`. Masked with radial + linear gradient so name stays legible. Parallaxes at `scrollY × 0.06` via Framer Motion `useScroll` + `useTransform`.
- **Eyebrow:** `Software Engineer` — Space Grotesk, `--accent`, 11px, 0.18em tracking, with 28px accent-colored rule to the left
- **Name:** `Jason` line 1, `Ie.` italic line 2 in `--accent`
- **Thin horizontal rule** full-width `--rule`
- **Footer row:** descriptor text left + scroll cue right (animated scanner line)

### 3. Work (`#work`)
- Section label: `Selected Work` — 10px, 0.2em tracking, uppercase, `--text-sub`, with extending rule
- **Project list:** flex column, each row is a CSS grid: `52px | 1fr | 120px | 80px`
  - Columns: number | name (Fraunces) | stack | tag
  - `border-bottom: 1px solid var(--rule)` between rows
  - Hover: left 2px `--accent` bar scales up (scaleY 0→1 from bottom), name color transitions to `--accent`
  - **Framer Motion:** each row animates in with `y: 28 → 0`, `opacity: 0 → 1`, staggered 65ms, triggered by `whileInView`

### 4. Experience (`#experience`)
- Same section label pattern
- **Experience list:** flex column, each row CSS grid: `120px | 1fr | auto`
  - Columns: date (JetBrains Mono) | role + company + desc | badge pill
  - Badge: `--accent` border + color, 100px border-radius
  - `border-bottom: 1px solid var(--rule)`
  - **Framer Motion:** same staggered `whileInView` entrance as work rows

### 5. Contact (`#contact`)
- Section label: `Contact`
- Large Fraunces heading: `Let's` + italic `talk.` in `--accent`
- Link row: `Email`, `GitHub`, `LinkedIn`, `Resume` — uppercase, `↗` arrow, hover to `--accent`
- Full-width `--rule` divider
- Footer: `© 2026 Jason Ie` left, `Based in the US` (JetBrains Mono) right

---

## Animations (Framer Motion)

| Element | Animation | Trigger |
|---|---|---|
| JSON ghost | `y` parallax via `useScroll` + `useTransform` (`scrollY × 0.06`) | passive scroll |
| Project rows | `y: 28→0`, `opacity: 0→1`, spring easing, stagger 65ms | `whileInView`, `once: true` |
| Experience rows | same as project rows | `whileInView`, `once: true` |
| Contact heading | `y: 28→0`, `opacity: 0→1` | `whileInView`, `once: true` |
| Nav links hover | color transition via Framer `whileHover` | hover |
| Project row hover | left bar `scaleY` via CSS transition | hover |
| Scroll line scanner | CSS `@keyframes` loop on `::after` pseudo | continuous |

No page transitions, no loading screens, no scroll-hijacking. All animations are additive and non-blocking.

---

## Content (Placeholders — user to fill)

### Projects (4 rows)
| # | Name | Stack | Tag |
|---|---|---|---|
| 01 | Order Execution System | C++ · FIX Protocol | Systems |
| 02 | StyleAI Fashion App | Python · Swift | ML / iOS |
| 03 | Distributed Ledger | Go · Raft | Distributed |
| 04 | HFT Alpha Generator | Python · NumPy | Quant |

### Experience (3 rows)
| Date | Role | Company | Tag |
|---|---|---|---|
| Summer 2025 | Software Engineering Intern | Placeholder | SWE |
| Summer 2024 | Software Engineering Intern | Placeholder | SWE |
| 2023–Present | Research Assistant | University Lab | Research |

---

## File Structure

```
jie-portfolio/
├── app/
│   ├── layout.tsx        # font imports, metadata, global CSS
│   ├── page.tsx          # single page, all sections
│   └── globals.css       # CSS custom properties, resets
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx          # JSON ghost + hero content
│   ├── Work.tsx          # project list
│   ├── Experience.tsx    # experience list
│   └── Contact.tsx
└── public/
```

---

## Out of Scope (deferred)

- Project detail views / expand-on-click behavior (decide layout first)
- Green/red trading micro-accents (reserved in tokens, not yet wired to content)
- Dark/light mode toggle (dark only)
- Blog or writing section
