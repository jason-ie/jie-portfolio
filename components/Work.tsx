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

  // Scroll lock when drawer open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedId]);

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
            fontSize: "12px",
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

      {/* Grid — always visible */}
      <div
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
      </div>

      {/* Backdrop + Side Drawer */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedId(null)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(10, 11, 15, 0.75)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                zIndex: 100,
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "48vw",
                minWidth: "380px",
                background: `linear-gradient(135deg, #151720, ${selectedProject.tint} 100%), #151720`,
                borderLeft: "1px solid rgba(232,226,244,0.07)",
                overflowY: "auto",
                zIndex: 101,
              }}
            >
              {/* Ghost glyph */}
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
                {selectedProject.glyph}
              </span>

              {/* Content fades in after drawer settles */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ padding: "32px", position: "relative", zIndex: 1 }}
              >
                {/* Back button */}
                <button
                  onClick={() => setSelectedId(null)}
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
                  {selectedProject.tag}
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
                  {selectedProject.name}
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
                  {selectedProject.stack}
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
                  {selectedProject.description}
                </p>

                {/* Links */}
                <div style={{ display: "flex", gap: "16px" }}>
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
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
                  {selectedProject.caseStudy && (
                    <a
                      href={selectedProject.caseStudy}
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
                      ↗ Case Study
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
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
          transform: scale(1.06) translateY(-4px) !important;
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
      className="bento-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
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
