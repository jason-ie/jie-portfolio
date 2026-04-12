# Scroll Animations & Work Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Hero exit with a ghost-text scale-to-fill zoom, and redesign the Work section into a 2×2 bento grid with Framer Motion `layoutId` card-zoom transitions.

**Architecture:** Two independent component rewrites. `Hero.tsx` swaps its scroll-driven transforms from `scale`/`rotateX` on the section to `scale`/`opacity` on the ghost text div and `opacity`/`y` on hero content. `Work.tsx` is a full rewrite replacing `ProjectRow` with `BentoCard` in a CSS grid, adding `selectedId` state and a `ProjectDetail` overlay powered by Framer `layoutId`.

**Tech Stack:** Next.js, React, TypeScript, Framer Motion (`useScroll`, `useTransform`, `motion`, `AnimatePresence`, `layoutId`)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `components/Hero.tsx` | Modify | Replace section `scale`/`rotateX` with ghost-text `scale`/`opacity` and content `opacity`/`y` |
| `components/Work.tsx` | Full rewrite | 2×2 bento grid, `BentoCard`, `ProjectDetail`, `layoutId` zoom transition |

---

## Task 1: Hero.tsx — Ghost Text Zoom Exit

**Files:**
- Modify: `components/Hero.tsx`

### Overview of changes
- Remove `scale` and `rotateX` from `motion.section` (and their `useTransform` calls)
- Add `scale` (1→14, scrollYProgress 0→0.85) and `opacity` (1→0, scrollYProgress 0.6→0.85) to the ghost `motion.div`
- Wrap the hero content `<div>` in `motion.div`, add `opacity` (1→0, scrollYProgress 0→0.35) and `y` (0→-24, scrollYProgress 0→0.35)
- Keep `perspective` wrapper, `200vh` height, and `ghostY` window parallax unchanged

- [ ] **Step 1: Add ghost text scroll transforms**

Open `components/Hero.tsx`. Replace the existing `useTransform` calls (lines 18–19) and add three new ones:

```tsx
// REMOVE these two lines:
// const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
// const rotateX = useTransform(scrollYProgress, [0, 1], [0, -6]);

// ADD these three:
const ghostScale = useTransform(scrollYProgress, [0, 0.85], [1, 14]);
const ghostOpacity = useTransform(scrollYProgress, [0.6, 0.85], [1, 0]);
const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
const contentY = useTransform(scrollYProgress, [0, 0.35], [0, -24]);
```

- [ ] **Step 2: Remove scale/rotateX from motion.section**

In `components/Hero.tsx`, find the `motion.section` style prop (around line 34–43). Remove `scale`, `rotateX`, and `transformOrigin` from its `style`:

```tsx
<motion.section
  style={{
    position: "relative",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  }}
>
```

- [ ] **Step 3: Apply ghost scroll transforms to the ghost motion.div**

Find the ghost `motion.div` (around line 45). It currently has `style={{ ..., y: ghostY }}`. Add `scale: ghostScale` and `opacity: ghostOpacity`:

```tsx
<motion.div
  style={{
    position: "absolute",
    top: 0,
    right: 0,
    y: ghostY,
    scale: ghostScale,
    opacity: ghostOpacity,
    transformOrigin: "center center",
    lineHeight: 0.85,
    textAlign: "right",
    userSelect: "none",
    pointerEvents: "none",
    zIndex: 0,
    maskImage:
      "radial-gradient(ellipse 80% 70% at 80% 50%, black 30%, transparent 80%), linear-gradient(to bottom, black 40%, transparent 100%)",
    WebkitMaskImage:
      "radial-gradient(ellipse 80% 70% at 80% 50%, black 30%, transparent 80%), linear-gradient(to bottom, black 40%, transparent 100%)",
    maskComposite: "intersect",
    WebkitMaskComposite: "source-in",
  }}
>
```

- [ ] **Step 4: Wrap hero content div in motion.div with scroll opacity/y**

Find the hero content `<div>` (around line 81, the one with `position: "relative", zIndex: 1, padding: "0 56px 56px"`). Change it from a plain `<div>` to a `motion.div` and add `opacity`/`y` transforms:

```tsx
<motion.div
  style={{
    position: "relative",
    zIndex: 1,
    padding: "0 56px 56px",
    opacity: contentOpacity,
    y: contentY,
  }}
>
```

- [ ] **Step 5: Verify the file compiles**

Run: `cd /Users/jasonrayie/Desktop/projects/jie-portfolio && npx tsc --noEmit 2>&1 | head -40`

Expected: No errors (or only pre-existing errors unrelated to Hero.tsx)

- [ ] **Step 6: Commit**

```bash
cd /Users/jasonrayie/Desktop/projects/jie-portfolio
git add components/Hero.tsx
git commit -m "feat: replace perspective push with ghost-text scale-to-fill exit animation"
```

---

## Task 2: Work.tsx — Bento Grid + layoutId Card Zoom

**Files:**
- Modify: `components/Work.tsx` (full rewrite)

### Overview of changes
- Expand project data to full `Project` type with `id`, `glyph`, `description`, `tint`, `github`, `caseStudy`
- Replace `ProjectRow` component with `BentoCard`
- Add `selectedId: string | null` state to `Work`
- Render 2×2 CSS grid when `selectedId` is null, render `ProjectDetail` overlay when selected
- Wrap both in `AnimatePresence` so Framer can morph via `layoutId`

- [ ] **Step 1: Replace the file with the full rewrite**

Write the complete new `components/Work.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useScramble } from "use-scramble";

type Project = {
  id: string;
  num: string;
  glyph: string;
  tag: string;
  name: string;
  stack: string;
  description: string;
  github?: string;
  caseStudy?: string;
  tint: string;
};

const projects: Project[] = [
  {
    id: "card-0",
    num: "01",
    glyph: "OES",
    tag: "Systems",
    name: "Order Execution System",
    stack: "C++ · FIX Protocol",
    description:
      "Low-latency order execution engine built on the FIX protocol. Handles order routing, position tracking, and real-time risk checks with sub-millisecond round-trip times.",
    tint: "rgba(100,149,237,0.05)",
  },
  {
    id: "card-1",
    num: "02",
    glyph: "SAI",
    tag: "ML / iOS",
    name: "StyleAI Fashion App",
    stack: "Python · Swift",
    description:
      "iOS app powered by a fine-tuned vision model that generates outfit recommendations from wardrobe photos. On-device inference with a CoreML export pipeline.",
    tint: "rgba(200,130,200,0.05)",
  },
  {
    id: "card-2",
    num: "03",
    glyph: "DLX",
    tag: "Distributed",
    name: "Distributed Ledger",
    stack: "Go · Raft",
    description:
      "Fault-tolerant key-value store with a Raft consensus layer. Supports linearizable reads, snapshotting, and dynamic cluster membership changes.",
    tint: "rgba(100,200,150,0.05)",
  },
  {
    id: "card-3",
    num: "04",
    glyph: "HFT",
    tag: "Quant",
    name: "HFT Alpha Generator",
    stack: "Python · NumPy",
    description:
      "Statistical arbitrage signal generator that identifies cross-asset mean-reversion opportunities. Backtested on tick data with realistic latency and slippage models.",
    tint: "rgba(244,200,100,0.05)",
  },
];

export default function Work() {
  const labelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(labelRef, { once: false });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { ref: scrambleRef, replay } = useScramble({
    text: "Selected Work",
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 2,
    chance: 0.85,
    overdrive: false,
    overflow: false,
  });

  useEffect(() => {
    if (inView) replay();
  }, [inView, replay]);

  const selectedProject = projects.find((p) => p.id === selectedId) ?? null;

  return (
    <section
      id="work"
      style={{
        padding: "120px 56px",
        maxWidth: "100%",
        position: "relative",
      }}
    >
      {/* Section Label */}
      <div
        ref={labelRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "48px",
        }}
      >
        <span
          ref={scrambleRef}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 400,
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        />
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "var(--rule)",
          }}
        />
      </div>

      {/* Grid / Detail */}
      <AnimatePresence mode="wait">
        {!selectedId ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              background: "rgba(232,226,244,0.05)",
            }}
          >
            {projects.map((project, i) => (
              <BentoCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelectedId(project.id)}
              />
            ))}
          </motion.div>
        ) : (
          selectedProject && (
            <ProjectDetail
              key={selectedId}
              project={selectedProject}
              onClose={() => setSelectedId(null)}
            />
          )
        )}
      </AnimatePresence>

      <style>{`
        .bento-card {
          transition: background 0.2s ease;
        }
        .bento-card:hover {
          background: #141720 !important;
        }
        .bento-card:hover .bento-ghost {
          opacity: 0.55 !important;
          transform: scale(1.06) translateY(-4px);
        }
        .bento-card:hover .bento-name {
          color: #E8E2F4 !important;
        }
        .bento-card:hover .bento-arrow {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }
        .bento-ghost {
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .bento-arrow {
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .bento-name {
          color: rgba(232,226,244,0.7);
          transition: color 0.2s ease;
        }
      `}</style>
    </section>
  );
}

function BentoCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      layoutId={project.id}
      className="bento-card"
      onClick={onClick}
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.065, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: `linear-gradient(135deg, #111318, ${project.tint} 100%), #111318`,
        backgroundColor: "#111318",
        minHeight: "280px",
        padding: "24px",
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* Top-left: project number */}
      <span
        style={{
          position: "absolute",
          top: "20px",
          left: "24px",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "9px",
          letterSpacing: "0.1em",
          opacity: 0.18,
          color: "var(--text)",
        }}
      >
        {project.num}
      </span>

      {/* Top-right: arrow */}
      <span
        className="bento-arrow"
        style={{
          position: "absolute",
          top: "20px",
          right: "24px",
          fontSize: "14px",
          color: "var(--text)",
        }}
      >
        ↗
      </span>

      {/* Background ghost glyph */}
      <span
        className="bento-ghost"
        style={{
          position: "absolute",
          bottom: "16px",
          right: "20px",
          fontFamily: "Courier New, monospace",
          fontSize: "96px",
          fontWeight: 700,
          color: "var(--text)",
          opacity: 0.04,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {project.glyph}
      </span>

      {/* Bottom-left: tag, name, stack */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          left: "24px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "8px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "6px",
          }}
        >
          {project.tag}
        </div>
        <div
          className="bento-name"
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontWeight: 600,
            fontSize: "17px",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            marginBottom: "6px",
          }}
        >
          {project.name}
        </div>
        <div
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "10px",
            color: "var(--text-dim)",
            opacity: 0.6,
          }}
        >
          {project.stack}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      layoutId={project.id}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(135deg, #111318, ${project.tint} 100%), #111318`,
        backgroundColor: "#111318",
        padding: "32px",
        overflow: "hidden",
      }}
    >
      {/* Ghost glyph — visual continuity */}
      <span
        style={{
          position: "absolute",
          bottom: "24px",
          right: "32px",
          fontFamily: "Courier New, monospace",
          fontSize: "96px",
          fontWeight: 700,
          color: "var(--text)",
          opacity: 0.04,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {project.glyph}
      </span>

      {/* Detail content fades in after layout morph */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Back button */}
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-dim)",
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "12px",
            letterSpacing: "0.08em",
            padding: 0,
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          ← back
        </button>

        {/* Tag */}
        <div
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "8px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "10px",
          }}
        >
          {project.tag}
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontWeight: 700,
            fontSize: "36px",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--text)",
            marginBottom: "8px",
          }}
        >
          {project.name}
        </div>

        {/* Stack */}
        <div
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "11px",
            color: "var(--text-dim)",
            opacity: 0.6,
            marginBottom: "20px",
          }}
        >
          {project.stack}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "var(--rule)",
            marginBottom: "20px",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "12px",
            lineHeight: 1.7,
            color: "var(--text-dim)",
            maxWidth: "480px",
            marginBottom: "28px",
          }}
        >
          {project.description}
        </p>

        {/* Links */}
        <div style={{ display: "flex", gap: "16px" }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: "var(--accent)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ↗ GitHub
            </a>
          )}
          {project.caseStudy && (
            <a
              href={project.caseStudy}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: "var(--text-dim)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Case Study
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /Users/jasonrayie/Desktop/projects/jie-portfolio && npx tsc --noEmit 2>&1 | head -40`

Expected: No errors related to `Work.tsx` or `Hero.tsx`

- [ ] **Step 3: Commit**

```bash
cd /Users/jasonrayie/Desktop/projects/jie-portfolio
git add components/Work.tsx
git commit -m "feat: redesign Work section as 2x2 bento grid with layoutId card zoom transition"
```

---

## Self-Review

### Spec coverage check

| Spec requirement | Covered by |
|---|---|
| Ghost "JS/ON" `scale(1→14)` at `scrollYProgress 0→0.85` | Task 1, Step 1 (`ghostScale`) |
| Ghost `opacity(1→0)` at `scrollYProgress 0.6→0.85` | Task 1, Step 1 (`ghostOpacity`) |
| Hero content `opacity(1→0)` at `scrollYProgress 0→0.35` | Task 1, Step 1 (`contentOpacity`) |
| Hero content `y(0→-24px)` at `scrollYProgress 0→0.35` | Task 1, Step 1 (`contentY`) |
| Remove `scale`/`rotateX` from section | Task 1, Step 2 |
| Keep `perspective` wrapper + `200vh` height | Not changed — existing code preserved |
| 2×2 CSS grid, `gap: 1px`, hairline background | Task 2, Step 1 (grid wrapper) |
| Card `min-height: 280px`, `#111318` + per-card gradient tint | Task 2, Step 1 (`BentoCard`) |
| Project number top-left, 9px JetBrains Mono, `opacity: 0.18` | Task 2, Step 1 |
| Tag 8px Space Grotesk uppercase accent, name Fraunces ~17px, stack JetBrains Mono dim | Task 2, Step 1 |
| Arrow top-right, hidden until hover | Task 2, Step 1 (CSS class `bento-arrow`) |
| Ghost glyph 96px, `opacity: 0.04`, absolute bottom-right | Task 2, Step 1 |
| Hover: background `#141720`, ghost `scale(1.06) translateY(-4px) opacity 0.55`, name full color, arrow fade in | Task 2, Step 1 (CSS `.bento-card:hover`) |
| `whileInView` stagger `y: 28→0, opacity: 0→1, delay i*0.065s` | Task 2, Step 1 (`BentoCard` initial/whileInView) |
| `layoutId="card-{i}"` on each card | Task 2, Step 1 (`layoutId={project.id}`) |
| `selectedId` state, `AnimatePresence`, grid unmounts on open | Task 2, Step 1 |
| `ProjectDetail` absolute inset-0 within work section | Task 2, Step 1 |
| `position: relative` on work `<section>` | Task 2, Step 1 |
| Ghost glyph visible in detail for continuity | Task 2, Step 1 (`ProjectDetail`) |
| Detail content: ← back, tag, title 36px, stack, divider, description 12px/1.7, links | Task 2, Step 1 |
| Spring `stiffness: 300, damping: 30` | Task 2, Step 1 (`ProjectDetail` transition) |
| Detail content `delay: 0.3` fade-in | Task 2, Step 1 (`motion.div initial/animate`) |
| `Project` type shape | Task 2, Step 1 (TypeScript `type Project`) |

### Placeholder scan
No TBDs or incomplete steps. All code is complete and self-contained.

### Type consistency
- `project.id` used as `layoutId` in both `BentoCard` and `ProjectDetail` — consistent
- `Project` type defined once, used in both components — consistent
- `selectedProject` lookup via `projects.find(p => p.id === selectedId)` — matches `id: "card-0"…"card-3"` pattern
- `contentOpacity`, `contentY`, `ghostScale`, `ghostOpacity` defined in Task 1 Step 1, applied in Steps 3 and 4 — consistent
