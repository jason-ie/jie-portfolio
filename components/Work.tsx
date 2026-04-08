"use client";

import { motion } from "framer-motion";

const projects = [
  { num: "01", name: "Order Execution System", stack: "C++ · FIX Protocol", tag: "Systems" },
  { num: "02", name: "StyleAI Fashion App", stack: "Python · Swift", tag: "ML / iOS" },
  { num: "03", name: "Distributed Ledger", stack: "Go · Raft", tag: "Distributed" },
  { num: "04", name: "HFT Alpha Generator", stack: "Python · NumPy", tag: "Quant" },
];

export default function Work() {
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
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "48px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 400,
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-sub)",
          }}
        >
          Selected Work
        </span>
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

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.065, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "52px 1fr 160px 100px",
        alignItems: "center",
        borderBottom: "1px solid var(--rule)",
        padding: "24px 0",
        position: "relative",
        cursor: "default",
      }}
      className="project-row"
    >
      {/* Left accent bar */}
      <div
        className="accent-bar"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "2px",
          background: "var(--accent)",
          transform: "scaleY(0)",
          transformOrigin: "bottom",
          transition: "transform 0.25s ease",
        }}
      />

      {/* Number */}
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontWeight: 300,
          fontSize: "11px",
          letterSpacing: "0.08em",
          color: "var(--text-sub)",
        }}
      >
        {project.num}
      </span>

      {/* Name */}
      <span
        className="project-name"
        style={{
          fontFamily: "var(--font-fraunces), serif",
          fontWeight: 600,
          fontSize: "clamp(18px, 2vw, 26px)",
          letterSpacing: "-0.02em",
          color: "var(--text)",
          fontVariationSettings: "'opsz' 36, 'SOFT' 10",
          transition: "color 0.2s ease",
        }}
      >
        {project.name}
      </span>

      {/* Stack */}
      <span
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 300,
          fontSize: "12px",
          color: "var(--text-dim)",
        }}
      >
        {project.stack}
      </span>

      {/* Tag */}
      <span
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 400,
          fontSize: "11px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--text-sub)",
          textAlign: "right",
        }}
      >
        {project.tag}
      </span>

      <style>{`
        .project-row:hover .accent-bar {
          transform: scaleY(1);
        }
        .project-row:hover .project-name {
          color: var(--accent);
        }
      `}</style>
    </motion.div>
  );
}
