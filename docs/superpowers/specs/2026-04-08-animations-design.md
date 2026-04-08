# Animation System Design — Jason Ie Portfolio
**Date:** 2026-04-08
**Status:** Approved

---

## Overview

Two focused animation additions to the existing portfolio:

1. **Perspective push** — Hero section scales down and tilts back as the user scrolls away, giving a spatial depth effect at the Hero → Work boundary.
2. **Scramble on section labels** — "Selected Work", "Experience", and "Contact" labels scramble through random characters and resolve as each section enters the viewport.

No new UI elements. No nav changes. No page overlays. All animations are additive and scroll-driven.

---

## Dependencies

- **Add:** `use-scramble` — the hook behind most 21st.dev scramble components. Lightweight DOM character swapping, no canvas.
- **Existing:** `framer-motion` (already installed) for `useScroll`, `useTransform`, `useInView`.

---

## Feature 1 — Perspective Push (Hero exit)

### How it works

The Hero section is wrapped in a tall sticky container (`height: 200vh`). The inner Hero `div` uses `position: sticky; top: 0` so it stays fixed in view while the container scrolls. A `useScroll` hook tracks scroll progress through the container (`offset: ["start start", "end end"]`). `useTransform` maps that progress to:

- `scale`: `1 → 0.88`
- `rotateX`: `0deg → -6deg`

A `perspective` CSS value on the parent wrapper (e.g. `1000px`) gives the 3D depth. The Work section sits below in normal document flow and scrolls into view naturally.

### Scope

- Applied **only to the Hero**. Work, Experience, and Contact sections scroll normally.
- The JSON ghost parallax (`ghostY` via `useTransform(scrollY, ...)`) remains unchanged.

### Files changed

| File | Change |
|---|---|
| `components/Hero.tsx` | Wrap section in `200vh` sticky container; apply `motion.div` with `scale` + `rotateX` transforms linked to `useScroll` |

---

## Feature 2 — Section Label Scramble (scroll entry)

### How it works

Each section label (`Selected Work`, `Experience`, `Contact`) uses the `useScramble` hook from the `use-scramble` package, paired with a `useInView` ref from `framer-motion`.

When `inView` becomes `true`, `replay()` is called on the scramble instance — cycling through random alphanumeric characters before resolving to the target string. Fires once per page load (`once: true` on the `useInView` call).

### Scramble config

```ts
useScramble({
  text: "Selected Work",   // or "Experience" / "Contact"
  speed: 0.6,
  tick: 1,
  step: 1,
  scramble: 4,
  seed: 2,
  chance: 0.85,
  overdrive: false,
  overflow: false,
})
```

Character set: default alphanumeric (no symbols). Duration: ~800ms.

No changes to label font, size, color, position, or layout — purely the text content during entrance.

### Files changed

| File | Change |
|---|---|
| `components/Work.tsx` | Replace static label `<span>` with `useScramble` + `useInView` ref |
| `components/Experience.tsx` | Same pattern |
| `components/Contact.tsx` | Same pattern |

---

## What is NOT changing

- Nav links — static, no hover scramble
- Hero name ("Jason / Ie.") — no scramble
- Row-level stagger animations on project/experience rows — unchanged
- JSON ghost parallax — unchanged
- Color tokens, typography, layout — unchanged

---

## File Summary

```
components/Hero.tsx          — perspective push wrapper
components/Work.tsx          — scramble label
components/Experience.tsx    — scramble label
components/Contact.tsx       — scramble label
package.json                 — add use-scramble
```

No new files created.
