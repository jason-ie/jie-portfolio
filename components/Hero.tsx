'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Window scroll — used for JSON ghost parallax (unchanged)
  const { scrollY } = useScroll();
  const ghostY = useTransform(scrollY, [0, 1000], [0, 60]);

  // Container scroll progress — drives ghost-text scale-to-fill exit
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  // Ghost zooms in from the very first scroll tick; opacity fades mid-zoom.
  const ghostScale = useTransform(scrollYProgress, [0, 0.75], [1, 14]);
  const ghostOpacity = useTransform(scrollYProgress, [0.45, 0.68], [1, 0]);
  // Content begins fading immediately so zoom + exit happen in parallel — no sticky delay.
  const contentOpacity = useTransform(scrollYProgress, [0.02, 0.42], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0.02, 0.42], [0, -32]);

  return (
    <div id="hero" ref={containerRef} style={{ height: '160vh' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          perspective: '1000px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg)',
        }}
      >
        <motion.section
          style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          {/* JSON Ghost */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              right: '4vw',
              y: ghostY,
              scale: ghostScale,
              opacity: ghostOpacity,
              transformOrigin: 'center center',
              lineHeight: 0.85,
              textAlign: 'right',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
              maskImage:
                'radial-gradient(ellipse 95% 80% at 75% 45%, black 40%, transparent 85%), linear-gradient(to bottom, black 50%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 95% 80% at 75% 45%, black 40%, transparent 85%), linear-gradient(to bottom, black 50%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          >
            {['JS', 'ON'].map((text) => (
              <div
                key={text}
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 900,
                  fontSize: 'min(54vw, 58vh)',
                  color: 'transparent',
                  WebkitTextStroke: '2px var(--ghost-stroke)',
                  display: 'block',
                }}
              >
                {text}
              </div>
            ))}
          </motion.div>

          {/* Portrait */}
          <motion.div
            style={{
              position: 'absolute',
              top: '16vh',
              left: '56px',
              height: '38vh',
              zIndex: 0,
              pointerEvents: 'none',
              opacity: contentOpacity,
              maskImage:
                'linear-gradient(to bottom, black 0%, black 55%, transparent 95%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, black 55%, transparent 95%)',
              animation:
                'portraitDrawIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both',
            }}
          >
            <img
              src="/portrait-2.png"
              alt=""
              style={{
                height: '100%',
                width: 'auto',
                display: 'block',
              }}
            />
          </motion.div>

          {/* Hero Content */}
          <motion.div
            style={{
              position: 'relative',
              zIndex: 2,
              padding: '0 56px 56px',
              opacity: contentOpacity,
              y: contentY,
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
                width: 'calc(38vh * 1.0096)',
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '1px',
                  background: 'var(--accent)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  whiteSpace: 'nowrap',
                }}
              >
                Software Engineer
              </span>
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  background: 'var(--accent)',
                }}
              />
            </div>

            {/* Name */}
            <div style={{ marginBottom: '32px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 800,
                  fontSize: 'clamp(72px, 10.5vw, 168px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.95,
                  color: 'var(--text)',
                  fontVariationSettings: "'opsz' 144, 'SOFT' 15",
                }}
              >
                Jason
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontWeight: 800,
                  fontSize: 'clamp(72px, 10.5vw, 168px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.95,
                  fontStyle: 'italic',
                  color: 'var(--accent)',
                  fontVariationSettings: "'opsz' 144, 'SOFT' 60",
                }}
              >
                Ie.
              </div>
            </div>

            {/* Thin Rule */}
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'var(--rule)',
                marginBottom: '20px',
              }}
            />

            {/* Footer Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontWeight: 300,
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  maxWidth: '320px',
                  lineHeight: 1.6,
                }}
              >
                CS + Finance, Math @ Northeastern University
                <br />
                Looking to further my career in tech
              </span>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontWeight: 300,
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-sub)',
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
