# Animation System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a perspective push exit animation to the Hero section and scroll-triggered text scramble to the three section labels (Selected Work, Experience, Contact).

**Architecture:** Feature 1 wraps the existing Hero in a `200vh` sticky container and applies `scale` + `rotateX` transforms via `framer-motion` `useScroll`/`useTransform`. Feature 2 adds `use-scramble` to each section label span, triggered once via `framer-motion` `useInView`. No new files are created.

**Tech Stack:** Next.js 15 / React 19, framer-motion 12, use-scramble (new)

---

## File Map

| File | Change |
|---|---|
| `package.json` | Add `use-scramble` dependency |
| `components/Hero.tsx` | Sticky container wrapper + scroll-driven scale/rotateX on `motion.section` |
| `components/Work.tsx` | `useScramble` + `useInView` on "Selected Work" label |
| `components/Experience.tsx` | `useScramble` + `useInView` on "Experience" label |
| `components/Contact.tsx` | `useScramble` + `useInView` on "Contact" label |

---

### Task 1: Install use-scramble

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

```bash
npm install use-scramble
```

Expected output: `added 1 package` (or similar). No TypeScript errors — `use-scramble` ships its own types.

- [ ] **Step 2: Verify install**

```bash
cat node_modules/use-scramble/package.json | grep '"main"\|"types"\|"version"'
```

Expected: version line present, confirming install succeeded.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add use-scramble dependency"
```

---

### Task 2: Perspective Push — Hero.tsx

**Files:**
- Modify: `components/Hero.tsx`

Current structure: a `<section>` with `height: 100vh`, `overflow: hidden`. A `useRef<HTMLElement>` is declared but only used to hold the section (it's not connected to any scroll hook — `ghostY` reads from bare `scrollY`).

New structure:
```
<div ref={containerRef}>          ← 200vh, triggers scroll tracking
  <div style={stickyShell}>       ← sticky top:0, height:100vh, perspective:1000px
    <motion.section style={...}>  ← scale + rotateX transforms
      {existing children}
    </motion.section>
  </div>
</div>
```

- [ ] **Step 1: Rewrite Hero.tsx**

Replace the full file content with:

```tsx
"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Window scroll — used for JSON ghost parallax (unchanged)
  const { scrollY } = useScroll();
  const ghostY = useTransform(scrollY, [0, 1000], [0, 60]);

  // Container scroll progress — drives perspective push
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -6]);

  return (
    // Outer: tall container that the page scrolls through (200vh)
    <div ref={containerRef} style={{ height: "200vh" }}>
      {/* Middle: sticky shell that keeps hero pinned + provides 3D perspective */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          perspective: "1000px",
          overflow: "hidden",
        }}
      >
        {/* Inner: the hero card that scales + tilts back on scroll */}
        <motion.section
          style={{
            position: "relative",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            scale,
            rotateX,
            transformOrigin: "center top",
          }}
        >
          {/* JSON Ghost */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              y: ghostY,
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
            {["JS", "ON"].map((text) => (
              <div
                key={text}
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontWeight: 900,
                  fontSize: "52vw",
                  color: "transparent",
                  WebkitTextStroke: "1.5px var(--ghost-stroke)",
                  display: "block",
                }}
              >
                {text}
              </div>
            ))}
          </motion.div>

          {/* Hero Content */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "0 56px 56px",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "1px",
                  background: "var(--accent)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 400,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                Software Engineer
              </span>
            </div>

            {/* Name */}
            <div style={{ marginBottom: "32px" }}>
              <div
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontWeight: 800,
                  fontSize: "clamp(56px, 8vw, 120px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                  color: "var(--text)",
                  fontVariationSettings: "'opsz' 144, 'SOFT' 15",
                }}
              >
                Jason
              </div>
              <div
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontWeight: 800,
                  fontSize: "clamp(56px, 8vw, 120px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                  fontStyle: "italic",
                  color: "var(--accent)",
                  fontVariationSettings: "'opsz' 144, 'SOFT' 60",
                }}
              >
                Ie.
              </div>
            </div>

            {/* Thin Rule */}
            <div
              style={{
                width: "100%",
                height: "1px",
                background: "var(--rule)",
                marginBottom: "20px",
              }}
            />

            {/* Footer Row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 300,
                  fontSize: "13px",
                  color: "var(--text-dim)",
                  maxWidth: "320px",
                  lineHeight: 1.6,
                }}
              >
                Senior CS student — distributed systems,
                <br />
                ML infrastructure &amp; quantitative engineering.
              </span>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontWeight: 300,
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-sub)",
                  }}
                >
                  Scroll
                </span>
                <div className="scroll-cue" />
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the dev server compiles without errors**

```bash
npm run dev 2>&1 | head -20
```

Expected: `✓ Ready` or `▲ Next.js` startup. No TypeScript or module errors.

- [ ] **Step 3: Visual check**

Open `http://localhost:3000` in a browser. Scroll slowly past the Hero. You should see:
- The hero content scales from 1.0 → 0.88 and tilts back (rotateX 0 → -6deg) as you scroll through the first `100vh`
- The Work section appears below in normal flow
- The JSON ghost continues its subtle parallax

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: perspective push exit animation on Hero scroll"
```

---

### Task 3: Scramble label — Work.tsx

**Files:**
- Modify: `components/Work.tsx`

The "Selected Work" `<span>` (line 40) becomes a `useScramble`-controlled element. A `ref` on the parent label `<div>` triggers `replay()` via `useInView` when it enters the viewport.

- [ ] **Step 1: Update Work.tsx**

Replace the top of the file (imports + component function, up to the closing of `Work`'s return — not `ProjectRow`):

```tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useScramble } from "use-scramble";

const projects = [
  { num: "01", name: "Order Execution System", stack: "C++ · FIX Protocol", tag: "Systems" },
  { num: "02", name: "StyleAI Fashion App", stack: "Python · Swift", tag: "ML / iOS" },
  { num: "03", name: "Distributed Ledger", stack: "Go · Raft", tag: "Distributed" },
  { num: "04", name: "HFT Alpha Generator", stack: "Python · NumPy", tag: "Quant" },
];

export default function Work() {
  const labelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(labelRef, { once: true });

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

  return (
    <section
      id="work"
      style={{
        padding: "120px 56px",
        maxWidth: "100%",
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
            color: "var(--text-sub)",
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

      {/* Project List */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {projects.map((project, i) => (
          <ProjectRow key={project.num} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
```

Leave the `ProjectRow` function below unchanged.

- [ ] **Step 2: Verify compilation**

```bash
npm run dev 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Visual check**

Scroll to the Work section. "Selected Work" should scramble through random characters and resolve. Fires once per page load.

- [ ] **Step 4: Commit**

```bash
git add components/Work.tsx
git commit -m "feat: scroll-triggered scramble on Selected Work label"
```

---

### Task 4: Scramble label — Experience.tsx

**Files:**
- Modify: `components/Experience.tsx`

Same pattern as Task 3, applied to "Experience".

- [ ] **Step 1: Update Experience.tsx**

Replace the top of the file (imports + `Experience` component function, leaving `ExperienceRow` unchanged):

```tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useScramble } from "use-scramble";

const experiences = [
  {
    date: "Summer 2025",
    role: "Software Engineering Intern",
    company: "Placeholder",
    desc: "Distributed systems infrastructure and platform engineering.",
    tag: "SWE",
  },
  {
    date: "Summer 2024",
    role: "Software Engineering Intern",
    company: "Placeholder",
    desc: "Backend services and API development at scale.",
    tag: "SWE",
  },
  {
    date: "2023–Present",
    role: "Research Assistant",
    company: "University Lab",
    desc: "ML infrastructure, model training pipelines, and systems research.",
    tag: "Research",
  },
];

export default function Experience() {
  const labelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(labelRef, { once: true });

  const { ref: scrambleRef, replay } = useScramble({
    text: "Experience",
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

  return (
    <section
      id="experience"
      style={{
        padding: "0 56px 120px",
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
            color: "var(--text-sub)",
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

      {/* Experience List */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {experiences.map((exp, i) => (
          <ExperienceRow key={exp.date + exp.role} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}
```

Leave the `ExperienceRow` function below unchanged.

- [ ] **Step 2: Verify compilation**

```bash
npm run dev 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Visual check**

Scroll to Experience section. "Experience" scrambles in on entry.

- [ ] **Step 4: Commit**

```bash
git add components/Experience.tsx
git commit -m "feat: scroll-triggered scramble on Experience label"
```

---

### Task 5: Scramble label — Contact.tsx

**Files:**
- Modify: `components/Contact.tsx`

Same pattern, applied to "Contact".

- [ ] **Step 1: Update Contact.tsx**

Replace the imports block at the top and add the scramble logic to `Contact`. The section label `<span>` (line 30) becomes scramble-controlled. The rest of the component (heading, links, footer) is unchanged.

Full updated file:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useScramble } from "use-scramble";

const links = [
  { label: "Email", href: "mailto:jason@example.com" },
  { label: "GitHub", href: "https://github.com/jasonrayie" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jason-ie" },
  { label: "Resume", href: "/resume.pdf" },
];

export default function Contact() {
  const labelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(labelRef, { once: true });

  const { ref: scrambleRef, replay } = useScramble({
    text: "Contact",
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

  return (
    <section
      id="contact"
      style={{
        padding: "0 56px 80px",
      }}
    >
      {/* Section Label */}
      <div
        ref={labelRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "64px",
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
            color: "var(--text-sub)",
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

      {/* Large Heading */}
      <motion.div
        initial={{ y: 28, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ marginBottom: "64px" }}
      >
        <div
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontWeight: 700,
            fontSize: "clamp(48px, 7vw, 100px)",
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            fontVariationSettings: "'opsz' 96, 'SOFT' 20",
            color: "var(--text)",
          }}
        >
          Let&apos;s
        </div>
        <div
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontWeight: 700,
            fontSize: "clamp(48px, 7vw, 100px)",
            letterSpacing: "-0.02em",
            lineHeight: 0.95,
            fontStyle: "italic",
            fontVariationSettings: "'opsz' 96, 'SOFT' 60",
            color: "var(--accent)",
          }}
        >
          talk.
        </div>
      </motion.div>

      {/* Link Row */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          marginBottom: "64px",
        }}
      >
        {links.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            whileHover={{ color: "var(--accent)" }}
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.2s ease",
            }}
          >
            {link.label}
            <span style={{ fontSize: "11px" }}>↗</span>
          </motion.a>
        ))}
      </div>

      {/* Full-width rule */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: "var(--rule)",
          marginBottom: "24px",
        }}
      />

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 300,
            fontSize: "12px",
            color: "var(--text-sub)",
          }}
        >
          © 2026 Jason Ie
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: 300,
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: "var(--text-sub)",
          }}
        >
          Based in the US
        </span>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify compilation**

```bash
npm run dev 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Visual check**

Scroll to Contact section. "Contact" scrambles in on entry. All other Contact content (heading, links, footer) is unchanged.

- [ ] **Step 4: Final end-to-end check**

Open `http://localhost:3000`. Verify:
- [ ] Hero scales + tilts back as you scroll through the first 100vh
- [ ] "Selected Work" scrambles when Work section enters view
- [ ] "Experience" scrambles when Experience section enters view
- [ ] "Contact" scrambles when Contact section enters view
- [ ] JSON ghost parallax still moves subtly
- [ ] Project rows and experience rows still stagger in as before
- [ ] Nav, typography, colors, layout — all unchanged

- [ ] **Step 5: Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: scroll-triggered scramble on Contact label"
```
