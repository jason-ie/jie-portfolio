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
  const ghostScale = useTransform(scrollYProgress, [0, 0.85], [1, 14]);
  const ghostOpacity = useTransform(scrollYProgress, [0.6, 0.85], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.35], [0, -24]);

  return (
    <div ref={containerRef} style={{ height: "200vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          perspective: "1000px",
          overflow: "hidden",
        }}
      >
        <motion.section
          style={{
            position: "relative",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {/* JSON Ghost */}
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
          <motion.div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "0 56px 56px",
              opacity: contentOpacity,
              y: contentY,
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
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
