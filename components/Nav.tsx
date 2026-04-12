"use client";

import { motion } from "framer-motion";

export default function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 56px",
        background: "linear-gradient(to bottom, var(--bg) 0%, transparent 100%)",
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 500,
          fontSize: "13px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
          pointerEvents: "auto",
        }}
      >
        Jason Ie
      </span>

      <div
        style={{
          display: "flex",
          gap: "40px",
          pointerEvents: "auto",
        }}
      >
        {["Work", "Experience", "Contact"].map((label) => (
          <motion.a
            key={label}
            href={`#${label.toLowerCase()}`}
            whileHover={{ color: "var(--accent)" }}
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              letterSpacing: "0.06em",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
          >
            {label}
          </motion.a>
        ))}
      </div>
    </nav>
  );
}
