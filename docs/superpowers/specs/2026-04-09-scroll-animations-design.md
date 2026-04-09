# Scroll Animations & Work Section Redesign

**Date:** 2026-04-09
**Scope:** Hero exit animation, Work section layout, card-to-detail zoom transition

---

## Overview

Replace the current Hero exit (scale + rotateX perspective push) with a scroll-driven scale-to-fill zoom on the ghost "JS/ON" text. Redesign the Work section from a vertical list of rows into an equal 2×2 bento card grid. Add a Framer Motion `layoutId` zoom transition when a card is clicked, morphing it into a full project detail view.

Experience and Contact sections are out of scope — to be designed separately.

---

## 1. Hero Exit

### Current behavior
`Hero.tsx` uses a `200vh` sticky container. `scrollYProgress` drives `scale(1→0.88)` and `rotateX(0→-6deg)` on the section element.

### New behavior
Two scroll-driven transforms run in parallel as `scrollYProgress` goes `0→1`:

| Element | Transform | Range |
|---|---|---|
| Ghost "JS/ON" div | `scale(1 → 14)` | `scrollYProgress 0 → 0.85` |
| Ghost "JS/ON" div | `opacity(1 → 0)` | `scrollYProgress 0.6 → 0.85` |
| Hero content (name, desc) | `opacity(1 → 0)` | `scrollYProgress 0 → 0.35` |
| Hero content | `y(0px → -24px)` | `scrollYProgress 0 → 0.35` |

- Remove `scale` and `rotateX` from the section element entirely.
- The `perspective` wrapper and sticky container height (`200vh`) remain unchanged.
- The Work section sits underneath and becomes visible naturally as the ghost text fades out — no special reveal needed on the Work side.

### Files changed
- `components/Hero.tsx` — replace `scale`/`rotateX` transforms with ghost-text and hero-content transforms as above.

---

## 2. Work Section — Bento Grid

### Current behavior
`Work.tsx` renders 4 projects as `motion.div` rows in a vertical flex list with `whileInView` fade-up stagger.

### New layout
Equal 2×2 CSS grid. No featured/large card — all four cards are identical in size.

```
┌─────────────┬─────────────┐
│  01 · OES   │  02 · SAI   │
│             │             │
├─────────────┼─────────────┤
│  03 · DLX   │  04 · HFT   │
│             │             │
└─────────────┴─────────────┘
```

**Grid:**
- `display: grid`, `grid-template-columns: 1fr 1fr`
- `gap: 1px`, `background: rgba(232,226,244,0.05)` (creates thin hairline between cards)
- Card min-height: `280px`

**Card anatomy (each card):**
- Background: `#111318` with a subtle per-card gradient tint (unique hue per project, `~5% opacity`):
  - OES: blue tint `rgba(100,149,237,0.05)`
  - SAI: purple tint `rgba(200,130,200,0.05)`
  - DLX: green tint `rgba(100,200,150,0.05)`
  - HFT: amber tint `rgba(244,200,100,0.05)`
- **Top-left:** project number (`01`–`04`), 9px JetBrains Mono, `opacity: 0.18`
- **Bottom-left:** tag (8px uppercase Space Grotesk, accent color), name (Fraunces serif, `~17px`), stack (10px JetBrains Mono, dim)
- **Top-right:** arrow `↗`, hidden until hover
- **Background:** ghost glyph (`OES`/`SAI`/`DLX`/`HFT`), absolute bottom-right, 96px, `opacity: 0.04`, Courier New

**Hover states:**
- Card background lightens to `#141720`
- Ghost glyph: `scale(1.06) translateY(-4px)`, `opacity: 0.55`
- Card name color: `rgba(232,226,244,0.7)` → `#E8E2F4`
- Arrow: fades in, translates from `(-4px, 4px)` to `(0, 0)`

**Entry animation:** `whileInView` stagger-fade (same as current rows) — `y: 28→0`, `opacity: 0→1`, `delay: i * 0.065s`

**`layoutId`:** Each card `motion.div` gets `layoutId={\`card-${i}\`}`.

### Files changed
- `components/Work.tsx` — full rewrite. Remove `ProjectRow` component, add `BentoCard` component, add `selectedId` state, add `ProjectDetail` component.

---

## 3. Card Zoom / Detail Transition

### Mechanism
Framer Motion `layoutId` shared element transition.

**State:** `selectedId: string | null` in `Work` component. Initially `null`.

**Flow:**
1. User clicks a `BentoCard` → sets `selectedId` to `"card-{i}"`
2. `AnimatePresence` detects a `ProjectDetail` with matching `layoutId` should render
3. Framer morphs the card's position/size into the overlay automatically
4. Detail content fades in after `0.3s` delay
5. User clicks `← back` → sets `selectedId` to `null`
6. Framer reverses: overlay shrinks back to the card's original position/size

**Overlay (`ProjectDetail`):**
- `position: absolute, inset: 0` within the work section container — not a full-page modal
- The work section's outer `<section>` element needs `position: relative` for the overlay to be contained correctly
- Same background as the card (gradient tint carries over via `layoutId`)
- Ghost glyph stays visible in both states, providing visual continuity

**Component structure:**
```tsx
<section style={{ position: 'relative' }}>
  {/* section label */}
  <AnimatePresence>
    {!selectedId && (
      <div className="bento-grid">
        {projects.map((p, i) => <BentoCard key={p.id} ... />)}
      </div>
    )}
    {selectedId && (
      <ProjectDetail key={selectedId} project={...} onClose={() => setSelectedId(null)} />
    )}
  </AnimatePresence>
</section>
```
The grid unmounts when a detail is open so Framer can cleanly morph the single `layoutId` between states.

**Detail content layout:**
```
← back

[tag]
[Project Title — Fraunces, ~36px]
[stack — JetBrains Mono, dim]
────────────────────────────────
[description — 12px, line-height 1.7]

[↗ GitHub]  [Case Study]
```

**Animation tuning:**
- `layout` transition: `type: "spring", stiffness: 300, damping: 30`
- Detail content: `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, `transition={{ delay: 0.3 }}`
- Exit: same spring in reverse, no delay

### Project data shape
```ts
type Project = {
  id: string;       // "card-0" … "card-3"
  num: string;      // "01" … "04"
  glyph: string;    // "OES", "SAI", "DLX", "HFT"
  tag: string;
  name: string;
  stack: string;
  description: string;
  github?: string;
  caseStudy?: string;
  tint: string;     // CSS gradient string
};
```

### Files changed
- `components/Work.tsx` — add `selectedId` state, `BentoCard`, `ProjectDetail` components
- No new files needed; `ProjectDetail` lives in `Work.tsx` as a local component

---

## Out of scope
- Experience section animations
- Contact section animations
- Mobile/responsive behavior (follow-up)
- Actual project descriptions and links (placeholder text until content is ready)
