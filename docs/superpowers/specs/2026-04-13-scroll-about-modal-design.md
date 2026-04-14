# Portfolio — Scroll Fix, About Section & Work Modal Design

**Date:** 2026-04-13  
**Status:** Approved

---

## Overview

Three coordinated changes to the portfolio:

1. **Hero scroll fix** — eliminate the bleed-through where the Work section was visible beneath the still-active Hero sticky panel
2. **About section** — new section inserted between Hero and Work with bio, stack, and interests
3. **Work side drawer** — replace the in-place `ProjectDetail` layout morph with a side drawer that slides in over the grid

---

## 1. Hero Scroll Fix

**Problem:** The Hero component uses a `200vh` scroll container with a sticky panel. The Work section renders immediately below, and because the sticky panel has no opaque background, Work bleeds through before the Hero scroll range ends.

**Fix:**
- Add `backgroundColor: "var(--bg)"` (i.e. `#111318`) to the sticky panel's style so it is fully opaque
- Tighten the exit animation thresholds so the ghost text and hero content fully clear the screen well before the scroll range ends — leaving a clean dark buffer zone at the tail end of Hero's `200vh`
- Specifically: ghost opacity should reach `0` by `scrollYProgress: 0.80` (currently 0.85), content opacity should reach `0` by `scrollYProgress: 0.30` (currently 0.35)

**Files:** `components/Hero.tsx`

---

## 2. About Section

**Component:** `components/About.tsx` (new file)  
**Page order:** Hero → **About** → Work → Experience → Contact (`app/page.tsx`)

### Layout

Sticky scroll section, `height: 150vh`. Content is centered vertically in the viewport via `position: sticky; top: 0; height: 100vh`.

Two-column grid (`1fr 1fr`, gap `~80px`):
- **Left column:** eyebrow label, headline, horizontal rule, bio paragraph
- **Right column:** Stack grid, Interests pills

### Headline

```
Making computers go fast
so I don't have to think slow.
```

- Font: Fraunces, italic, weight 700, `clamp(32px, 4vw, 56px)`
- `fast` rendered in `var(--green)` (`#22C55E`)
- `slow` rendered in `var(--red)` (`#EF4444`)
- Rest of text in `var(--text)` (`#E8E2F4`)

### Bio paragraph

> I'm a senior CS student obsessed with the parts of the stack where performance decisions actually matter — distributed systems, ML infrastructure, and quantitative engineering. When I'm not tuning latency, I'm probably overengineering something for fun.

Font: Space Grotesk, weight 300, `13px`, color `var(--text-dim)`, line-height `1.75`.

### Section label

Matches all other sections: `useScramble` on "About" text + full-width rule line.  
**Unique entrance:** The rule's width animates from `0%` to `100%` via a `motion.div` `scaleX` or `width` tween triggered by `useInView` — not used in any other section.

### Stack grid

2×3 pill grid (same style as bento card stack text):
- `C++ / Systems`, `Go / Distributed`, `Python / ML`, `Swift / iOS`, `Raft / Consensus`, `FIX / HFT`
- Each pill: `1px solid rgba(232,226,244,0.08)`, `border-radius: 2px`, JetBrains Mono `10px`, `color: var(--text-dim)`
- Left accent dot: `3px` circle, `var(--accent)` at 60% opacity

### Interests

Pill tags in a flex-wrap row below the stack grid:
- Placeholder: Formula 1, Chess, Markets, Coffee, Basketball, Anime *(content to be updated)*
- Style: `border-radius: 100px`, `1px solid rgba(232,226,244,0.07)`, Space Grotesk `11px`, `color: var(--text-dim)`

### Ghost number

`02` positioned `top: 0; right: 56px`, Courier New, `~120px`, `opacity: 0.025` — same ghost treatment as bento cards.

### Entrance animation

- Section label rule: `scaleX` from `0` to `1` via `motion.div`, `transformOrigin: "left"`, `duration: 0.8`, `ease: [0.25, 0.1, 0.25, 1]`, triggered by `useInView`
- Left column (eyebrow + headline + rule + bio): `y: 24 → 0`, `opacity: 0 → 1`, `duration: 0.6`
- Right column (stack + interests): same, `delay: 0.1`

---

## 3. Work Side Drawer

**Problem:** Clicking a bento card currently replaces the entire Work section content with a `ProjectDetail` view using `position: absolute` and Framer Motion `layoutId`. The morph fills only the section area, not enough of the screen, and Experience below is still visible.

**Solution:** Side drawer overlay.

### Behaviour

- Clicking a bento card sets `selectedId` (existing state)
- The bento grid remains rendered and visible at all times
- A semi-transparent backdrop (`rgba(10, 11, 15, 0.75)`, `backdropFilter: blur(4px)`) fades in over the grid
- The drawer slides in from the right

### Drawer dimensions

- `position: fixed; top: 0; right: 0; bottom: 0`
- `width: 48vw`, `min-width: 380px`
- Background: `linear-gradient(135deg, #151720, {project.tint} 100%), #151720`
- `border-left: 1px solid rgba(232,226,244,0.07)`
- `overflow-y: auto`

### Drawer animation

```
initial: { x: "100%" }
animate: { x: 0 }
exit:    { x: "100%" }
transition: { type: "spring", stiffness: 320, damping: 32 }
```

Wrapped in `AnimatePresence`.

### Drawer content

Identical structure to current `ProjectDetail`:
- Back button (`← back`) — closes drawer
- Tag (accent, uppercase, small)
- Title (Fraunces, 36px, weight 700)
- Stack (JetBrains Mono, dim)
- Horizontal rule
- Description paragraph
- GitHub / Case Study links

Content fades in after drawer settles: `initial: { opacity: 0 }`, `animate: { opacity: 1 }`, `transition: { delay: 0.2 }`.

### Backdrop

```
initial: { opacity: 0 }
animate: { opacity: 1 }
exit:    { opacity: 0 }
transition: { duration: 0.2 }
```

Clicking the backdrop closes the drawer (calls `onClose`).

### layoutId

Remove `layoutId` from `BentoCard` and `ProjectDetail` — the drawer replaces the morph entirely. Cards retain their `whileInView` entrance animation.

### Scroll lock

When the drawer is open, add `overflow: hidden` to `document.body` via `useEffect` to prevent background scroll.

---

## File Summary

| File | Change |
|---|---|
| `components/Hero.tsx` | Add opaque bg to sticky panel; tighten exit thresholds |
| `components/About.tsx` | New file — full About section |
| `components/Work.tsx` | Replace `ProjectDetail` layout morph with fixed side drawer |
| `app/page.tsx` | Add `<About />` between `<Hero />` and `<Work />` |

---

## Out of Scope

- Nav, Experience, Contact — no changes
- Mobile responsiveness — not addressed in this iteration
- Actual interest/bio content — placeholder, to be updated by user
